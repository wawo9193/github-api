const router = require('express').Router();
const request = require('request');

router.get('/pulls', async (req, res) => {
    const options = {
        method: 'GET',
        // sample: ?owner=google&?repo=googletest
        url: `http://api.github.com/repos/${req.query.owner}/${req.query.repo}/pulls`,
        headers: {
            'user-agent': 'node.js'
        },
        qs: {
            per_page: 3
        }
    };
      
    await request(options, function (error, _, body) {
        if (error) {
            res.sendStatus(error);
            //throw new Error(error);
        } 

        const obj = JSON.parse(body);
        let ret = [];
        obj.forEach(e => {
            ret.push({ 'id':e.id, 'number':e.number, 'title':e.title });
        });

        res.json(ret);
    });
});

module.exports = router;
