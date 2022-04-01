const routes = require('../routes/api.js');
const got = require('got');
const { app, server } = require('../index.js') 
const supertest = require('supertest')
const request = supertest(app)

jest.setTimeout(9000);

afterAll(done => {
    server.close();
    done();
});

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
