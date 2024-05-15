// const request = require('supertest')
// const express = require('express');
// const app = express()
	
// describe('Registered User'), async () => {
// 	let user1;
// 	test("testing with missing callback")

// 	describe('POST /api/user/register', () => {
// 		it("should register a new user", async () => {
// 			const res = (await request(app).post('/api/user/register')).send({
// 				userId: 1,
// 				name: "Anusha Delightful",
// 				username: "nooshydelightful",
// 				email: "nooshydelightful@charmelions.com",
// 				password: "charming",
// 				date_of_birth: "1995-12-17T00:00:00",
// 			});
// 			expect(res.statusCode).toBe(201);
// 			expect(res.body.userId).toBe(1)
// 			expect(res.body.name).toBe("Anusha Delightful");
// 			expect(res.body.username).toBe("nooshydelightful");
// 			expect(res.body.email).toBe("nooshydelightful@charmelions.com");
// 			expect(res.body.password).toBe("charming");
// 			expect(res.body.date_of_birth).toBe("1995-12-17T00:00:00");
// 			user1 = req.body;
// 		})
// 	})
// };
 

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