const create_note = document.getElementById("create-note");
const note_list = document.getElementById("note-list");
const note_filter = document.getElementById("note-filter");
const search = document.getElementById("search-input");
let note = get_saved_note();

document.addEventListener("DOMContentLoaded",()=>{
  render_Note("last-edited")
})

create_note.addEventListener("click", () => {
  let new_note = {
    uniqueID: unique_ID(get_saved_note()),
    title: "",
    desc: "",
    last_edited: last_edited(),
  };

  note.push(new_note);
  console.log(localStorage.getItem("note2"), note);
  save_note(note);

  location.assign(`../edit.html#${new_note.uniqueID}`);
});

note_filter.addEventListener("change", () => {
  let filter_mode = note_filter.value;
  render_Note(filter_mode);
});

search.addEventListener("input",()=>{
  let filter_mode = note_filter.value;
  render_Note(filter_mode)
})

function render_Note(mode) {
  sort(mode);
  debugger;
  let filtering_Note = note.filter((item) => {
    let title = item.title.toLowerCase();
    let filter = search.value.toLowerCase();
    return title.includes(filter);
  });

  if (note === null || note.length === 0) {
    console.log("nothing to show");
  } else {
    filtering_Note.forEach((item) => {
      let p = creating_note(item);
      note_list.appendChild(p);
    });
  }
}

function sort(mode) {
  note_list.innerHTML = "";
  if (mode === "last-edited") {
    console.log("last-edited")
    return note.sort((a, b) => {
      console.log(a.last_edited, b.last_edited);
      return b.last_edited - a.last_edited;
    });
  } else if (mode === "order-create") {
    console.log("order-create")
    return note.sort((a, b) => {
      return a.last_edited - b.last_edited;
    });
  }else if(mode === "alphabet"){
    return note.sort((a,b)=>{
      if(a.title.toLowerCase() > b.title.toLowerCase()){
        debugger;
        return 1;
      }
      if(b.title.toLowerCase() > a.title.toLowerCase()){
        debugger;
        return -1
      }
      debugger;
      return 0;
    })
  }
}

function unique_ID(storage) {
  let new_id = Math.floor(Math.random() * 10001);
  console.log(new_id);
  if (storage === null || storage === "undefined") {
    console.log("the localstorage hasnt existed");
    return new_id;
  } else {
    //this method
    // for(let i =0;i<local_storage_note.length;i++){
    //   console.log(local_storage_note[i])
    //   if(local_storage_note[i].uniqueID === new_id){
    //     console.log("id has already exist")
    //     return unique_ID();
    //   }
    // }
    //or this method
    storage.forEach((item) => {
      if (item.uniqueID === new_id) {
        console.log("id has already exist");
        return unique_ID(get_saved_note());
      }
    });
    return new_id;
  }
}