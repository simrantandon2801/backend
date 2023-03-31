const router = require("express").Router();
const Mustache = require("mustache")
router.get('/certificate', async (req, res) => {
    console.log('working')
    res.send('hello')
  });
  


module.exports = router;