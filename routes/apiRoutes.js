const router = require('express').Router();
const storage = require('../db/storage');

//requests notes that already exist
router.get('/notes', (req, res) => {
    storage.getNotes()
    .then(notes => {
      res.json(notes)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

//posts note tp json
router.post('/notes', (req,res) => {
    storage.addNote(req.body)
     .then(note => {
       res.json(note)
      })
      .catch(err => {
          res.status(500).json(err)
      })
})

module.exports = router;