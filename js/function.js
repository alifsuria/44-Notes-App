const note_list = document.getElementById("note-list");
const note_items = document.querySelectorAll(".note-item");
const feedback = document.querySelector(".feedback");
const create_item = document.getElementById("create-item");
const input_title = document.querySelector("#input-title");
const note_text_input = document.querySelector("#note-text-input");
const remove_note_btn = document.getElementById("remove-note");
const edit_timestamp = document.getElementById("edit-timestamp");
const note_filter = document.getElementById("note-filter");
const search_input = document.getElementById("search-input");

//get the existing info from the page using uniqueID
let JSONOBJ = JSON.parse(localStorage.getItem("note")); //get the all the note in obj
let note_ID = parseInt(location.hash.substr(1)); //get the number from the link address

function uniqueId() {
  let id = Math.floor(Math.random() * 1001);
  let note_storage = JSON.parse(localStorage.getItem("note"));
  // console.log(id, note_storage);
  if (note_storage === null || note_storage === "undefined") {
    console.log("the localStorage iS not existed yet");
    return id;
  } else {
    for (let i = 0; i < note_storage.length; i++) {
      //duplicate Prevention
      // console.log("first log  " + note_storage[i].uniqueID);
      if (note_storage[i].uniqueID === id) {
        // console.log("same Id existed");
        return uniqueId();
      }
      // console.log(
      //   "second Log after pass the duplicate prevention" + "ID not Existed Yet"
      // );
    }
    return id;
  }
}

function getLocalStorage(item) {
  let note = localStorage.getItem("note"); //getItem 'note' in local storage
  if (note === null || note === "undefined") {
    //if note doesnt existed
    note = []; //make note into an array
  } else {
    note = JSON.parse(localStorage.getItem("note")); //if existed - the 'note' is in JSON type data and this command will change it into JS object
  }
  note.push(item); //push the item object into note array
  localStorage.setItem("note", JSON.stringify(note)); //this will setItem  in local storage using the JSON type data
}

function filteringNote(JSON, bool) {
  //filtering all note and only get note when id is the same with the address
  if (bool === true) {
    let target_note = JSON.filter((item) => {
      return item.uniqueID === note_ID;
    });
    console.log(target_note);
    return target_note[0];

    // filtering note and only get the note that didnt same the unique id address
  } else {
    let new_one = JSON.filter((item) => {
      return item.uniqueID !== note_ID;
    });
    console.log(new_one);
    return new_one;
  }
}

function time(item,timestamp,bool){
  let now = new Date().getTime();
  let total = now - item.last_edited;

  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  let hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor(total % (1000*60)/1000);
  // console.log(total, days, hours, minutes, seconds);
  // debugger;
if(bool === true){
  if (days > 0) {
    return (timestamp.innerHTML = `Last edited ${days} days ago`);
  } else if (hours > 0) {
    return (timestamp.innerHTML = `Last edited ${hours} hours ago`);
  } else if (minutes > 3) {
    return (timestamp.innerHTML = `Last edited ${minutes} minutes ago`);
  } else {
    return (timestamp.innerHTML = `Last edited few moments ago`);
  }
}else if(bool === false){
  return (timestamp.innerHTML = `Last edited ${days} days,${hours} hours,${minutes} minutes,${seconds} seconds`)
}
}

function last_created() {
  let last_edited = new Date().getTime();
  return last_edited;
}