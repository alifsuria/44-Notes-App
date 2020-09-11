//for differentiate between the note is new note type or for edit type
if (isNaN(note_ID) || notes === null) {
  console.log("NaN in the link address");
} else {
  input_title.value = filteringNote(notes, true).title;
  note_text_input.value = filteringNote(notes, true).desc;
  edit_timestamp.innerHTML = setInterval(() => {
    time(filteringNote(notes, true), edit_timestamp,false);
  }, 1000);
}

create_item.addEventListener("click", (event) => {
  // event.preventDefault();
  let title_value = input_title.value;
  let note_text_value = note_text_input.value;

  if (title_value === "" || note_text_value === "") {
    let unnamed = {
      uniqueID: uniqueId(),
      title: "Unnamed Note",
      desc: "",
      last_edited: last_created(),
    };
    location.assign(`./edit.html#${unnamed.uniqueID}`)
    getLocalStorage(unnamed);
  } else {
    //set the note with the newly extract
    debugger;
    console.log(notes);
    if(notes.length <= 0 || notes === "undefined"){
      let note = {
        uniqueID: uniqueId(),
        title: title_value,
        desc: note_text_value,
        last_edited: last_created(),
      };
      location.assign(`./edit.html#${note.uniqueID}`)
      getLocalStorage(note);

    }else{
      if (localStorage.getItem("note").length > 0 ||filteringNote(notes, true).uniqueID === note_ID) {
        localStorage.setItem(
          "note",
          JSON.stringify(filteringNote(notes, false))
        );
      }

      let note = {
        uniqueID: uniqueId(),
        title: title_value,
        desc: note_text_value,
        last_edited: last_created(),
      };
      location.assign(`./edit.html#${note.uniqueID}`)
      getLocalStorage(note);
    }
  }
});

remove_note_btn.addEventListener("click", () => {
  console.log(filteringNote(notes, true));
  console.log(filteringNote(notes, false));
  localStorage.setItem("note", JSON.stringify(filteringNote(notes, false)));
  // debugger;
  location.assign("../index.html");
});

console.log(localStorage);
