const util = require("util");
const fs = require("fs");

const uniqueId = require("uuid").v1;
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
    read() {
       return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
       return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    addNote(note) {
      const { title, text } = note
      if (!title || !text) {
        throw new Error("Please enter a title and text")
      }
      const newNote ={title, text, id: uniqueId()}
      return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(currentNotes => this.write(currentNotes))
        .then(() => this.newNote)
    }
    getNotes() {
      return this.read()
        .then(notes => {
             return JSON.parse(notes) || [];
        })
    }

}

module.exports = new Note();