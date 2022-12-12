const listGroup = document.getElementById("allNotes");
const targetTitle = document.getElementById("targetTitle");
const targetText = document.getElementById("targetText");

const buttons = document.getElementById("buttons");
const addNote = document.getElementById("add-note");
const saveNote = document.getElementById("save-note");
const deleteNote = document.getElementById("delete-note");

// Fetch to get all notes
async function getAllNotes() {
  localStorage.removeItem("id");
  let allNotes = await fetch("/api/notes/")
    .then((res) => res.json())
    .then((data) => data);
  console.log(allNotes);
  // Use map method for each note
  allNotes.map((note) => {
    // Add event listener to the button

    let li = document.createElement("li");

    li.innerHTML = `
    <span>${note.title}</span>
    <span onclick="delTargetNote()" id="delete-note"><i class="fas fa-trash"></i></span>
    `;

    li.addEventListener("click", () => {
      targetTitle.defaultValue = note.title;
      targetText.defaultValue = note.text;

      localStorage.setItem("id", note.note_id);
    });

    listGroup.append(li);
  });
}

function editTargetNote() {
  const noteId = localStorage.getItem("id");
  const title = targetTitle.value;
  const text = targetText.value;

  console.log(title, text);
  const updNote = {
    title: title,
    text: text,
  };

  if (noteId)
    fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updNote),
    }).then(() => {
      window.location.reload();
    });
  else {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updNote),
    }).then(() => {
      window.location.reload();
    });
  }
}

function delTargetNote() {
  const noteId = localStorage.getItem("id");
  fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    window.location.reload();
  });
}

function addNewNote() {
  targetText.value = "";
  targetTitle.value = "";
  localStorage.removeItem("id");
}

addNote.addEventListener("click", addNewNote);
saveNote.addEventListener("click", editTargetNote);

getAllNotes();
