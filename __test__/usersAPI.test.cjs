const request = require("supertest");
const { server } = require("../server.cjs");

describe("GET /api/users/", () => {
  it("respond with json", async () => {
    const response = await request(server).get("/api/users/").expect(200);
  });
});

describe("GET /api/user/:id", () => {
  it("should return one user", async () => {
    const res = await request(server).get(`/users/:id`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});

// describe("GET /users/:username", () => {
//   it("respond with json", async () => {
//     const response = await request(server)
//       .get("/api/users/:username")
//       .expect(200);
//   });
// });

// MEDIUM.COM
// ./src/tests/e2e.test.js
// const request = require('supertest');
// const router = require('./users.cjs');

// describe('User Component', () => {
//   let user1;

//   describe('POST /api/user/register', () => {
// 		it('should add one user', async () => {
// 			const res = await request(router).post('/users').send({
// 				email: 'user1@example.com',
// 				password: '123456',
// 			});
// 			expect(res.statusCode).toBe(201);
// 			expect(res.body).toHaveProperty('id');
// 			expect(res.body.email).toBe('user1@example.com');
// 			user1 = res.body;
// 		})});
//   });

// describe('GET /api/user', () => {
//   it('should return all users', async () => {
//     const res = await request(app).get('/users');
//     expect(res.statusCode).toBe(200);
//     expect(res.body.length).toBe(1);
//   });
// });

// describe('POST /user/login', () => {
//   it('should login', async () => {
//     const beforeLoginDate = new Date();
//     const res = await request(app).post('/users/login').send({
//       email: 'user1@example.com',
//       password: '123456',
//     });
//     expect(res.statusCode).toBe(200);
//     expect(new Date(res.body.lastLogin).getTime()).toBeGreaterThanOrEqual(beforeLoginDate.getTime());
//   });

// it('should not login', async () => {
//   const res = await request(app).post('/users/login').send({
//     email: 'user1@example.com',
//     password: '1234',
//   });
//   expect(res.statusCode).toBe(500);
// });
// });

//   describe('GET /api/user/:id', () => {
//     it('should return one user', async () => {
//       const res = await request(app).get(`/users/${user1.id}`);
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('id');
//     });
//   });
// });
