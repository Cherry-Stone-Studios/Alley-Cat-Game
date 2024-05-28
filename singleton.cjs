/* global jest, beforeEach */
const { default: createPrismaMock } = require("prisma-mock");
const { mockClear, mockDeep } = require("jest-mock-extended");
const { Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");

jest.mock("./client.cjs", () => mockDeep());

const prismaMock = require("./client.cjs");

const plainTextPassword = "prismaprincess";
const saltRounds = 10;
const hashedPassword = bcrypt.hashSync(plainTextPassword, saltRounds);

beforeEach(() => {
  mockClear(prismaMock);
  createPrismaMock(
    {
      user: [
        {
          id: 11,
          name: "Anusha Delightful",
          username: "nooshydelightful",
          email: "nooshydelightful@charmelions.com",
          password: hashedPassword,
          date_of_birth: "2000-01-01T00:00:00.000Z",
        },
        {
          id: 12,
          name: "Nakayla Amazing",
          username: "nakaylisamazing",
          email: "nakaylamazing@cherrystonestudios.com",
          password: hashedPassword,
          date_of_birth: "2000-01-01T00:00:00.000Z",
        },
        {
          id: 13,
          name: "Valentino S. Cool",
          username: "valentinocoolcat",
          email: "valentinocoolcat@cherrystonestudios.com",
          password: hashedPassword,
          date_of_birth: "2000-01-01T00:00:00.000Z",
        },
        {
          id: 14,
          name: "Chris Rocks",
          username: "kimmybones",
          email: "kimmybones@cherrystonestudios.com",
          password: hashedPassword,
          date_of_birth: "2000-01-01T00:00:00.000Z",
        },
        {
          id: 15,
          name: "Hannah Wins",
          username: "hannah",
          email: "hannah@cherrystonestudios.com",
          password: hashedPassword,
          date_of_birth: "2000-01-01T00:00:00.000Z",
          is_admin: true,
        },
      ],
      scores: [
        {
          id: 11,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nooshydelightful",
          guestname: "",
        },
        {
          id: 12,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nakaylisamazing",
          guestname: "",
        },
        {
          id: 13,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "valentinocoolcat",
          guestname: "",
        },
        {
          id: 14,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "kimmybones",
          guestname: "",
        },
        {
          id: 15,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "hannah",
          guestname: "",
        },
        {
          id: 16,
          value: 1000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "",
          guestname: "justlikedavid",
        },
        {
          id: 17,
          value: 2000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nakaylisamazing",
          guestname: "",
        },
        {
          id: 18,
          value: 3000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nakaylisamazing",
          guestname: "",
        },
        {
          id: 19,
          value: 2000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nooshydelightful",
          guestname: "",
        },
        {
          id: 20,
          value: 3000,
          created_on: "2000-01-01T00:00:00.000Z",
          name: "nooshydelightful",
          guestname: "",
        },
      ],
    },
    Prisma.dmmf.datamodel,
    prismaMock
  );
});

module.exports = { prismaMock };
