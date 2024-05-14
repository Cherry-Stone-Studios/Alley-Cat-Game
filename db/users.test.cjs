const { createUser } = require("./users.cjs");
const { prismaMock } = require("../singleton.cjs");

test("Should create a new user", async () => {
  const user = {
    userId: 1,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "1995-12-17T03:24:00",
  };

  prismaMock.user.create.mockReturnValue(user);

  const userResult = await createUser(user);

  expect(userResult).toEqual({
    userId: 1,
    name: "Anusha Delightful",
    username: "nooshydelightful",
    email: "nooshydelightful@charmelions.com",
    password: "charming",
    date_of_birth: "1995-12-17T03:24:00",
  });
});
