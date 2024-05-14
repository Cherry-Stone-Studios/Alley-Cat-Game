/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");
const bcrypt = require("bcrypt");

// Create/POST

const createUser = async ({ firstAndLastName, email, username, password }) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const newUser = await prisma.user.create({
      data: { firstAndLastName, email, username, password: hashedPassword },
    });

    return newUser;
  } catch (err) {
    console.log("Error creating user", err);
    throw err;
  }
};

// Read/GET

const getAllUsers = async () => {
  try {
    const rows = await prisma.user.findMany();

    return rows;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    console.log("Error getting user", err);
    throw err;
  }
};

const getUserById = async (userId) => {
  try {
    const userById = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    return userById.user;
  } catch (err) {
    throw err;
  }
};

// Update/PATCH
const adminUpdatesUser = async (username, isAdmin) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        isAdmin: true,
      },
      data: {
        username,
        isAdmin,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const userUpdatesUser = async (username, password, userId) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        userId,
      },
      data: {
        username,
        password: hashedPassword,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteUser = async (req, id) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });
  } catch (err) {
    console.log("Oops! Try that again.", err);
    throw err;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  adminUpdatesUser,
  userUpdatesUser,
  deleteUser,
};
