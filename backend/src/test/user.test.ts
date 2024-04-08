import { initTestApp } from '../utils.js';
import { Server } from 'http';
import request from "supertest";

let app: Server;


beforeAll(async () => {
  app = await initTestApp(3000);
});

afterAll(async () => {
  await app.close()
});

describe("POST /api/user/signup", () => {
  it("should signup new user ", async () => {
    const res = await request(app).post(
      "/api/user/signup"
    ).send({
      "username": "test",
      "email": "test@gmail.com",
      "password": "1234"
  });
    expect(res.statusCode).toBe(200);
  });
});