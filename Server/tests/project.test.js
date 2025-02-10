const request = require('supertest');
const app = require('../server'); // Make sure you export your app from server.js

jest.setTimeout(10000); // Set the timeout to 10 seconds (10000 ms)

describe('GET /projects', () => {
    it('should return an array of projects', async () => {
        const response = await request(app).get('/projects');

        expect(response.status).toBe(200);
    });
});
