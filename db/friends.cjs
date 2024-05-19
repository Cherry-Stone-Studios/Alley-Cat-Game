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
    throw err;
  }
};

// Read/GET

const getOutgoingFriends = async ({ id, friendid }) => {
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
    console.log("MY FRIENDS ARE ALL GONE", removedFriend);
    return removedFriend;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addFriend,
  getOutgoingFriends,
  removeFriend,
};