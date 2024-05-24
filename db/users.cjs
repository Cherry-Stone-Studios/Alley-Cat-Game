/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");
const bcrypt = require("bcrypt");
const { doesContainBadWords } = require("deep-profanity-filter");
const { wordFilter } = require("../moderation/filter.cjs");
const { deletedUserUpdatedScores } = require("./scores.cjs");
const { deleteAllFriends } = require("./friends.cjs");

const getAge = (date_of_birth) => {
  let today = new Date();
  let birthDate = new Date(date_of_birth);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getDOB = (date_of_birth) => {
  let dob = new Date(date_of_birth);
  let dobISO = dob.toISOString();
  return dobISO;
};

// Create/POST
const createUser = async ({
  name,
  username,
  email,
  password,
  date_of_birth,
}) => {
  try {
    const age = getAge(date_of_birth);
    const badWord = doesContainBadWords(username, wordFilter);

    if (name.length > 50) {
      throw Error(`We don't have enough room for your name!`);
    } else if (username.length > 25) {
      throw Error(`Your username is too long!`);
    } else if (badWord === true) {
      throw Error(`Your username is too naughty!`);
    } else if (email.length > 75) {
      throw Error(`Your email is too long!`);
    } else if (password.length > 250) {
      throw Error(`Your password is too long!`);
    } else if (age < 13) {
      throw Error(
        `Thanks for your interest in registering! Please ask your guardian to help you register an account.`
      );
    } else {
      const plainTextPassword = password;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
      const dob = getDOB(date_of_birth);

      const newUser = await prisma.user.create({
        data: {
          name,
          username,
          email,
          password: hashedPassword,
          date_of_birth: dob,
        },
      });
      return newUser;
    }
  } catch (err) {
    throw err;
  }
};

const createAdmin = async ({
  name,
  username,
  email,
  password,
  date_of_birth,
}) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    const dob = getDOB(date_of_birth);

    const newAdmin = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        date_of_birth: dob,
        is_admin: true,
        nyan_unlocked: true,
      },
    });
    return newAdmin;
  } catch (err) {
    throw err;
  }
};

// Read/GET

const getAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userById;
  } catch (err) {
    throw err;
  }
};

// Update/PATCH
const adminUpdatesUser = async ({
  id,
  name,
  username,
  email,
  password,
  date_of_birth,
  is_admin,
  nyan_unlocked,
}) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    const dob = getDOB(date_of_birth);

    const adminUpdatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        date_of_birth: dob,
        is_admin,
        nyan_unlocked,
      },
    });
    return adminUpdatedUser;
  } catch (err) {
    throw err;
  }
};

const userUpdatesUser = async ({ id, name, username, email, password }) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteUser = async (id) => {
  try {
    // translate the user ID into a username
    const user = await getUserById(id);
    let username = user.username;
    // transform the user scores into guest scores
    const transmutatedScores = await deletedUserUpdatedScores(username);
    // delete all the person's friends
    await deleteAllFriends(id);

    // delete the user's account
    await prisma.user.delete({
      where: {
        id,
      },
    });
    // return the transmutated scores back to the DB as guest scores
    return transmutatedScores;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createAdmin,
  createUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  adminUpdatesUser,
  userUpdatesUser,
  deleteUser,
};
