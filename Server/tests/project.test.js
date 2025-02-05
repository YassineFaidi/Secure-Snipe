const request = require('supertest');
const app = require('../server'); // Make sure you export your app from server.js

jest.setTimeout(10000); // Set the timeout to 10 seconds (10000 ms)

describe('GET /projects', () => {
    it('should return an array of projects', async () => {
        const response = await request(app).get('/projects');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(4);
        expect(response.body[0]).toEqual({
            tokenName: 'Murad Mercenary',
            liquidity: 5.66,
            contractAddress: 'DdnKuLQHm2JLZPsoX4ff6YYenUrxqSDJZkiVR6Zdpump',
            dexScreenerLink: 'https://dexscreener.com/solana/hqdpubxnkysdl3viwflcnq41vvtqzhfu3gt4dpcmnv3x',
            firstTradeTimestamp: 1738795203000,
        });
    });
});
