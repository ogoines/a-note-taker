const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db");
const PORT = process.env.PORT || 3001;

let app = express();

//middleware 
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Notes html and it's "url"
app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.route("/api/notes")
    // Grab the notes list updates for every new note and deleted note
    .get(function (req, res) {
        res.json(database);
    })

    // Add a new note to the json db file.
    .post(function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
        let newNote = req.body;

        // This allows the test note to be the original note.
        let highestId = 99;
        // This loops through the array and finds the highest ID.
        for (let i = 0; i < database.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                // highestId will always be the highest numbered id in the notesArray.
                highestId = individualNote.id;
            }
        }
        // This assigns an ID to the newNote. 
        newNote.id = highestId + 1;
        console.log(newNote)
        // We push it to db.json.
        database.push(newNote)

        // Write the db.json file again.
        fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
        // Gives back the response, which is the user's new note. 
        res.json(newNote);
    });
    app.get("/api/notes/:id", function (req, res) {
        let jsonFilePath = path.join(__dirname, "/db/db.json");
      // request to delete note by id.
      for (let i = 0; i < database.length; i++) {
  
          if (database[i].id == req.params.id) {
              // Splice takes i position, and then deletes the 1 note.
              res.json(database[i])
              break;
          }
      }
    })
     

// Delete a note based on an ID not in an array,
   app.delete("/api/notes/:id", function (req, res) {
      let jsonFilePath = path.join(__dirname, "/db/db.json");
    // request to delete note by id.
    for (let i = 0; i < database.length; i++) {

        if (database[i].id == req.params.id) {
            // Splice takes i position, and then deletes the 1 note.
            database.splice(i, 1);
            break;
        }
    }
    // Write the db.json file again.
    fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        } else {
            console.log("Your note was deleted!");
        }
    });
    res.json(database);
});

//prepares server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

