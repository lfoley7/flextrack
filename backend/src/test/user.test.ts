import { initTestApp } from '../utils.js';
import { Server } from 'http';
import { SuperTest } from 'supertest';

let app: Server;

beforeAll(async () => {
  // we use different ports to allow parallel testing
  app = await initTestApp(30001);
});

afterAll(async () => {
  // we close only the fastify app - it will close the database connection via onClose hook automatically
  app.close();
});

test('list all articles', async () => {
  // mimic the http request via `app.inject()`
  const res = await app.({
    method: 'get',
    url: '/article',
  });

  // assert it was successful response
  expect(res.statusCode).toBe(200);

  // with expected shape
  expect(res.json()).toMatchObject({
    items: [],
    total: 0,
  });
});