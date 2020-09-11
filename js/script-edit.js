const input_title = document.getElementById("input-title");
const input_text = document.getElementById("note-text-input");
const timestamp = document.getElementById("edit-timestamp");
const remove_note_btn = document.getElementById("remove-note");

let getNote = get_saved_note();
let noteID = parseInt(location.hash.substr(1));
//if localstorage didnt exist ..find() didnt run and skip;
let note = getNote.find((item)=>{
  console.log(item)
  return item.uniqueID === noteID;
})
console.log(noteID)
console.log(getNote,note)

input_title.value = note.title;
input_text.value = note.desc;
timestamp.innerHTML = setInterval(()=>{time(note,timestamp)},1000)

input_title.addEventListener("input",()=>{
  //this save the value according to trace id;if the id is 0;input title = title property of the id;
  note.title = input_title.value;
  save_note(getNote);
  get_saved_note();
  console.log(getNote,note)
})

input_text.addEventListener("input",()=>{
  note.desc = input_text.value;
  save_note(getNote);
  get_saved_note();
  console.log(getNote,note)
})

remove_note_btn.addEventListener("click",()=>{
  // let filter = getNote.filter((item)=>{
  //   console.log(item);
  //   return item.uniqueID !== noteID
  // })
  remove_note(noteID);
  save_note(getNote);
  location.assign("../index.html");
  // console.log(filter);
})






