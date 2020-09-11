
document.addEventListener("DOMContentLoaded", () => {
  if(notes === null || notes === "undefined"){
    return
  }else if(notes.length >= 0){
    filter("last_edited");
  }
});

note_filter.addEventListener("change", () => {
  let filter_mode = note_filter.value;
  filter(filter_mode);
});

search_input.addEventListener("input", (e) => {
  let filter_mode = note_filter.value;
  filter(filter_mode);
});

function filter(mode) {
  sorted_Note(mode);
  if (notes === null || notes === "undefined") {
    return;
  } else {
    let filteredNotes = notes.filter((item) => {
      let title = item.title.toLowerCase();
      let filter = search_input.value.toLowerCase();
      return title.includes(filter);
    });
    if (notes === null || notes.length === 0 || notes === "undefined") {
      feedback.classList.remove("hide");
      console.log("Success enter the zone");
    } else {
      feedback.classList.add("hide");
      filteredNotes.forEach((item) => {
        const p = create_note(item);
        note_list.appendChild(p);
      });
    }
  }

}

function sorted_Note(mode) {
  note_list.innerHTML = "";
  if (notes === null || notes === "undefined") {
    return;
  } else {
    if (mode === "last_edited") {
      console.log("edited");
      return notes.sort((a, b) => {
        console.log(a.last_edited, b.last_edited);
        return b.last_edited - a.last_edited;
      });
    } else if (mode === "order-create") {
      console.log("order");
      return notes.sort((a, b) => {
        return a.last_edited - b.last_edited;
      });
    } else if (mode === "alphabet") {
      console.log("alphabet");
      return notes.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;

        //the same as a.title.toLowerCase() === b.title.toLowerCase() ? 0 : a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1;
      });
    }
  }
  console.log(notes);
}

function create_note(item) {
  let a_tag = document.createElement("a");
  let p_title = document.createElement("p");
  let p_timestamp = document.createElement("p");

  p_title.classList.add("item-title");
  p_title.innerHTML = `${item.title}`;
  a_tag.appendChild(p_title);

  p_timestamp.classList.add("item-timestamp");
  a_tag.appendChild(p_timestamp);

  a_tag.classList.add("note-item", "my-3");
  a_tag.setAttribute("href", `../edit.html#${item.uniqueID}`);

  setInterval(() => {
    time(item, p_timestamp, true);
  }, 1000);
  return a_tag;
}
