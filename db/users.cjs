/* eslint-disable no-useless-catch */
const prisma = require("../client.cjs");
const bcrypt = require("bcrypt");

// const Filter = require("bad-words"),
//   filter = new Filter({ placeHolder: "x" });
// import fs from "fs";
// import path from "path";
// let badwords = fs.readFileSync(path.resolve(__dirname, "swears.txt"), "utf8");
// filter.addWords(badwords.split("\n"));

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
    const lowercaseUsername = username.toLowerCase();

    if (name.length > 50) {
      throw Error(`We don't have enough room for your name!`);
    } else if (username.length > 25) {
      throw Error(`Your username is too long!`);
    }
    // else if (filter.isProfane(lowercaseUsername) === true) {
    //   throw Error(`Your username is too naughty!`);
    // }
    else if (email.length > 75) {
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
const adminUpdatesUser = async (
  name,
  username,
  email,
  password,
  date_of_birth,
  is_admin,
  nyan_unlocked
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        is_admin: true,
      },
      data: {
        name,
        username,
        email,
        password,
        date_of_birth,
        is_admin,
        nyan_unlocked,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

const userUpdatesUser = async (id, name, username, email, password) => {
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
