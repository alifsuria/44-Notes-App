const get_saved_note = () => {
  const noteJSON = localStorage.getItem("note2");
  try {
    //   if(noteJSON){return JSON.parse(noteJSON)}
    //   else{return []}
    return noteJSON ? JSON.parse(noteJSON) : [];
  } catch (e) {
    return [];
  }
};

function last_edited(){
  return new Date().getTime()
}

const save_note = (note) => {
  localStorage.setItem("note2", JSON.stringify(note));
};

function creating_note(item) {
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

  setInterval(()=>{
    time(item,p_timestamp);
  },1000)

  return a_tag;
}

function time(item,timestamp){
  let now = new Date().getTime();
  let total = now - item.last_edited;

  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  let hours = Math.floor(total % (1000 * 60 * 60 * 24)/(1000 * 60 * 60));
  let minutes = Math.floor(total % (1000 * 60 * 60)/(1000 * 60));
  let seconds = Math.floor(total % (1000 * 60)/ 1000)
  // console.log(days,hours,minutes,seconds);

  return timestamp.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
}



const remove_note=(id)=> {
  const target = getNote.findIndex((item) => {
    return item.uniqueID === id;
  });

  if(target > -1){
    getNote.splice(target,1);
  }
}
