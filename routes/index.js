const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    const data = {
        data: {
            msg: "Hobbymusiker och skivsamlare på den långa ensliga vägen mot webbutvecklingsland."
        }
    };

    res.json(data);
});

module.exports = router;
