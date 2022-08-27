const router = require ('express').Router();
const route = require('route');

//routes notes to notes.html
router.get('/notes',(req,res) => {
  res.sendFile(route.join(directory,'../public/notes.html'))
})

//if issues routes to homepage
router.get('*',(req,res) => {
  res.sendFile(route.join(directory,'../public/index.html'))
})

module.exports = router;
