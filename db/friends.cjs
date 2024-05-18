/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");

// Create/POST

const addFriend = async (id, friendid) => {
  try {
    const newFriend = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        friends: {
          connect: {
            id: friendid,
          },
        },
      },
    });

    return newFriend;
  } catch (err) {
    throw err;
  }
};

// Read/GET

const getOutgoingFriends = async () => {
  try {
    const friends = await prisma.user.findMany({
      where: {
        friends: {
          select: {
            username: true,
            scores: true,
          },
        },
      },
      include: {
        friends: true,
      },
    });
    return friends;
  } catch (err) {
    throw err;
  }
};

// Delete

const removeFriend = async (id) => {
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        friends: {
          disconnect: true,
        },
      },
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addFriend,
  getOutgoingFriends,
  removeFriend,
};
