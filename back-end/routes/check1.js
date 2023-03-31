const router = require("express").Router();
// const Mustache = require("mustache")
router.get('/rajiv', async (req, res) => {
    console.log('working')
    res.send('hello2')
  });
  router.post('/rajiv', async (req, res) => {
    console.log('working')
    res.send('post')
  });
  router.get('/sam', async (req, res) => {
    console.log('working')
    res.send('hello5')
  });

module.exports = router;