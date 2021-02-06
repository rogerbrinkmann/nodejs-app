const express = require('express');
let router = express.Router()
router.use(express.urlencoded({
    extended: false
}))

router
    .route('/editor')
    .post((req, res) => {
        const text = req.body.textarea;
        console.log(text)
        res.send(text);
    })



module.exports = router;
