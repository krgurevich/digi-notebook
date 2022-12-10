// Create Note
router.post("/", (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
        status: "active",
    };
    if (!newNote.title || !newNote.text) {
        return res
            .status(400)
            .json({ Msg: "Please include title and description" });
    }
});

// I am not sure about this
db.push(newNote);
res.json(db);

// Update Note
router.put("/:id", (req, res) => {
    const found = db.some((db = db.id === parseInt(req.params.id)));

    if (found) {
        const updNote = req.body;
        db.forEach((db) => {
            if (db.id === parseInt(req.params.id)) {
                db.title === updMember.title ? updMember.title : db.title;
                db.text === updMember.text ? updMember.text : db.text;

                res.json({ Msg: "Note updated", db: title });
            }
        });
    } else {
        res.status(400).json({ Msg: `No note with the id of ${req.params.id}` });
    }
});

//  Delete Note
router.delete("/:id", (req, res) => {
    const found = db.some((db) => db.id === parseInt(req.params.id));

    if (found) {
        res.json({
            Msg: "Note Deleted",
            db: db.filter((db = db.id !== parseInt(req.params.id))),
        });
    } else {
        res.status(400).json({ Msg: `No note with the id of ${req.params.id}` });
    }
});