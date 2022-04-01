/** Express router providing pull request related routes
 * @module /api
 * @requires express - Framework
 * @requires got - Http request module that allows async/await
 */
const router = require('express').Router();
const got = require('got');

/**
 * Route serving list of pull requests.
 * @name get/pulls
 * @param1 owner - Repo owner.
 * @param2 repo - Repo name.
 * @ret ret - Array of PR info.
 */
router.get('/pulls', async (req, res) => {

    let ret = []; // return object array
    let buildObj = {}; // build response obj

    // GET - pull request options
    const url = `http://api.github.com/repos/${req.query.owner}/${req.query.repo}/pulls`;
    const options = {
        headers: {
            'user-agent': 'node.js'
        },
        responseType: 'json'
    };

    // optional params to limit results for testing (rate limit) purposes
    const qs = new URLSearchParams();
    if (req.query.per_page) qs.append('per_page', req.query.per_page);
    if (req.query.page_number) qs.append('page_number', req.query.page_number);
    if (qs.toString().length !== 0) options['searchParams'] = qs;
    console.log(options)
    // retrieve list of pull requests
    await got.get(url, options)
        .then(async (pullRes) => {
            // build pull request portion of return object
            const obj = pullRes.body;
            await obj.forEach(e => {
                buildObj[e.number] = { 'id':e.id, 'number':e.number, 'title':e.title, 'author':e.user.login };
            });
        })
        .catch(err => {
            console.error(`PR request error: ${err.message}`)
            throw new Error('PR request error')
        });

    // Iterate all pull numbers and request to get number of commits
    for (const pull_number in buildObj) {
        // GET - list commits for each PR options
        const url = `http://api.github.com/repos/${req.query.owner}/${req.query.repo}/pulls/${pull_number}/commits`;
        const options = {
            headers: {
                'user-agent': 'node.js'
            },
            responseType: 'json'
        };
        
        await got.get(url, options)
            .then((commitRes) => {
                // build pull request portion of return object
                const obj = commitRes.body;
                const fnlObj = Object.assign({}, buildObj[pull_number], { 'commit_count':obj.length  });
                ret.push(fnlObj);
            })
            .catch(err => {
                console.error(`Commit request error: ${err.message}`)
                throw new Error('Commit request error')
            });
    }

    res.json(ret);
});

module.exports = router;
