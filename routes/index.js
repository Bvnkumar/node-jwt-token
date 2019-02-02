var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("in the index")
  res.render('index', {
    title: 'Express'
  });
});
//This is the route to get a token
router.get('/token', function (req, res) {
  var token = jwt.sign({
    user_id: "1234"
  }, "hello", {
    expiresIn: '10m'
  });
  res.send(token);
});
//Here we are validating the token
router.post('/verify', function (req, res) {
  var token = req.body.token;
  console.log("token ", token);
  jwt.verify(token, "hello", function (err, decoded) {
    if (err) {
      console.log("err ", err);

      res.send(err);
    } else {
      res.send(decoded)
    }
  })
})
module.exports = router;
