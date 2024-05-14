/* global jest, beforeEach */
const { mockDeep, mockClear } = require("jest-mock-extended");

jest.mock("./client.cjs", () => mockDeep());

const prisma = require("./client.cjs");
const prismaMock = prisma;

beforeEach(() => {
  mockClear(prismaMock);
});

module.exports = { prismaMock };
