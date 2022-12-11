// CRUD create (.post) read (.get) update (.put) delete (.delete)

const router = require("express").Router();
const {
  readAndAppend,
  readFromFile,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");
const dbRoute = "./db/db.json";

// GET Route for retrieving all notes
router.get("/", (req, res) =>
  readFromFile(dbRoute).then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
router.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, dbRoute);

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

router.put("/:id", async (req, res) => {
  const notes = await readFromFile(dbRoute).then((data) => JSON.parse(data));
  console.log(notes);
  const found = notes.find((note) => note.note_id === req.params.id);

  if (found) {
    const updNote = req.body;
    console.log(updNote);
    const updNotes = notes.map((note) => {
      if (note.note_id === req.params.id)
        return {
          ...note,
          title: note.title !== updNote.title ? updNote.title : note.title,
          text: note.text !== updNote.text ? updNote.text : note.text,
        };
      return note;
    });
    writeToFile(dbRoute, updNotes);

    res.json({ Msg: "Note updated", updNote: updNote.title });
  } else {
    res.status(400).json({ Msg: `No note with the id of ${req.params.id}` });
  }
});

router.delete("/:id", async (req, res) => {
  const notes = await readFromFile(dbRoute).then((data) => JSON.parse(data));
  console.log(notes);
  const found = notes.find((note) => note.note_id === req.params.id);

  if (found) {
    const updNotes = notes.filter((note) => note.note_id !== req.params.id);
    console.log(updNotes);
    writeToFile(dbRoute, updNotes);

    res.json({ Msg: "Note deleted" });
  } else {
    res.status(400).json({ Msg: `No note with the id of ${req.params.id}` });
  }
});

module.exports = router;
