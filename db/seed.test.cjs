const { createUser } = require("./users.cjs");
const { prismaMock } = require("../singleton.cjs");

test("should create a new admin", async () => {
	const admin1 = {
		name : "Hannah",
		username: "Serendipity",
		email: "hannah@hannah.com",
		password: "Serendipity",
		date_of_birth: "1995-12-17T00:00:00",
		is_admin: true,
	};

	prismaMock.user.create.mockReturnValue(admin1);

	const adminResult1 = await createUser(admin1);

	expect(adminResult1).toEqual({
    name : "Hannah",
		username: "Serendipity",
		email: "hannah@hannah.com",
		password: "Serendipity",
		date_of_birth: "1995-12-17T00:00:00",
		is_admin: true,
  });
});

test("should create a new user", async () => {
	const user1 = {
		name : "Valentino",
			username: "HiImPaul",
			email: "valentino@valentino.com",
			password: "HiImPaul",
			date_of_birth: "1999-02-14T0300:00:00"
	};

	prismaMock.user.create.mockReturnValue(user1);

	const userResult1 = await createUser(user1);

	expect(userResult1).toEqual({
		name : "Valentino",
		username: "HiImPaul",
		email: "valentino@valentino.com",
		password: "HiImPaul",
		date_of_birth: "1999-02-14T00:00:00"
  });
});

