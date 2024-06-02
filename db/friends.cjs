/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");

// Create/POST

const addFriend = async ({ id, friendid }) => {
  try {
    const userWithFriends = await prisma.user.update({
      where: {
        id,
      },
      data: {
        friends: {
          create: {
            friendsOf: {
              connect: {
                id: friendid,
              },
            },
          },
        },
      },
      include: {
        friends: true,
      },
    });
    return userWithFriends;
  } catch (err) {
    console.log("AN ERROR HAS OCCURRED WHILE WORKING THE FRIENDS DB", err);
  }
};

// Read/GET

const getUsersFriends = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        friends: {
          include: {
            friendsOf: {
              select: {
                username: true,
                scores: { select: { value: true } },
              },
            },
          },
        },
      },
    });
    return user;
  } catch (err) {
    console.log("AN ERROR HAS OCCURRED WHILE WORKING THE FRIENDS DB", err);
  }
};

// Delete one friend

const removeFriend = async (id, friendid) => {
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        friends: {
          deleteMany: {
            friendsOfId: friendid,
          },
        },
      },
    });

    const newfriends = await getUsersFriends(id);

    return newfriends;
  } catch (err) {
    console.log("AN ERROR HAS OCCURRED WHILE WORKING THE FRIENDS DB", err);
  }
};

// Delete All Friends

const deleteAllFriends = async ({ id }) => {
  try {
    const removedFriends = await prisma.friends.deleteMany({
      where: {
        id,
      },
    });
    return removedFriends;
  } catch (err) {
    console.log("AN ERROR HAS OCCURRED WHILE WORKING THE FRIENDS DB", err);
  }
};

module.exports = {
  addFriend,
  getUsersFriends,
  removeFriend,
  deleteAllFriends,
};
