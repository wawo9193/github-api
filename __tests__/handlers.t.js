/** Express router providing pull request related routes
 * @requires app - Express app object
 * @requires server - Listening server instance
 * @requires supertest - SuperAgent Http tester
 */
const { app, server } = require('../index.js') 
const supertest = require('supertest')
const request = supertest(app)

jest.setTimeout(9000);

/**
 * Process to run after testing suite is complete
 * @name afterAll
 * @param1 done - method to close jest instance after async/await
 */
afterAll(done => {
    server.close();
    done();
});

/**
 * Test suite for pull request for assertion
 */
describe('Test route', function () {
    test('responds to /pulls', async () => {
        const res = await request.get('/api/pulls?owner=google&repo=googletest&page_number=1&per_page=1');
        const resBody = res._body[0];

        expect(resBody).toHaveProperty('id');
        expect(resBody).toHaveProperty('number');
        expect(resBody).toHaveProperty('title');
        expect(resBody).toHaveProperty('author');
        expect(resBody).toHaveProperty('commit_count');
    });
});
