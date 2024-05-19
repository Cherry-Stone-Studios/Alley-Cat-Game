/* global jest, beforeEach */
const { default: createPrismaMock } = require("prisma-mock");
const { mockClear, mockDeep } = require("jest-mock-extended");
const { Prisma } = require("@prisma/client");

jest.mock("./client.cjs", () => mockDeep());

const prismaMock = require("./client.cjs");

beforeEach(() => {
  mockClear(prismaMock);
  createPrismaMock({}, Prisma.dmmf.datamodel, prismaMock);
});

module.exports = { prismaMock };
