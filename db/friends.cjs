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
    console.log("THIS IS ADD FRIEND", userWithFriends);
    return userWithFriends;
  } catch (err) {
    throw err;
  }
};

// Read/GET

const getUsersFriends = async ({ id }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
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
    console.log("THIS IS USERS FRIENDS INFO", user);

    return user;
  } catch (err) {
    throw err;
  }
};

// Delete

const removeFriend = async ({ id, friendid }) => {
  try {
    const removedFriend = await prisma.user.update({
      where: {
        id,
      },
      data: {
        friends: {
          disconnect: {
            friendsOf: {
              disconnect: {
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
    console.log("THIS IS REMOVED FRIEND", removedFriend);
    return removedFriend;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addFriend,
  getUsersFriends,
  removeFriend,
};
