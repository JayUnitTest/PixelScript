const container = document.querySelector(".container");
let createGrid = document.getElementById("create-button")
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let color = document.getElementById("color-picker");
let paint = document.getElementById("paint-btn");
const resetBtn = document.getElementById("clear-button");
let heightValue = document.getElementById("height-value");
let widthValue = document.getElementById("width-value");

let events = {
  mouse: {
  down: "mousedown",
  move: "mousemove",
  up: "mouseup",
}, 
touch: {
  down: "touchstart",
  move: "touchmove",
  up: "touchend",
  },
};

let deviceType =""; 

let draw = false; 
let erase = false; 

const isTouchDevice = () => {
  try{
    document.createEvent("TouchEvent")
    deviceType ="touch";
    return true; 
  }

  catch(e) {
    deviceType = "mouse"; 
    return false; 
  }
};

isTouchDevice(); 



//grid 
createGrid.addEventListener("click", () =>{
  container.innerHTML = "";
  let count = 0; 
  for(let i = 0; i<gridHeight.value; i++){
    count += 2;
    //create rows 
    let div = document.createElement("div");
    div.classList.add("gridRow");
    //create cols 
    for( let c = 0; c< gridWidth.value; c++){
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridColumn");
      //touch 
      col.setAttribute("id", `gridColumn${count}`);

      col.addEventListener(events[deviceType].down, () =>{
        draw = true;
        if (erase){
          col.style.backgroundColor ="transparent";
        } else{
          col.style.backgroundColor = color.value;
        }
      });

      col.addEventListener(events[deviceType].move, () =>{
          let elementId = document.elementFromPoint(
            !isTouchDevice() ? e.clientX : e.touches[0].
            clientX,
            !isTouchDevice() ? e.clientY : e.touches[0].
            clientY
          ).id;
          checker(elementId); 
      });

      col.addEventListener(events[deviceType].up, () =>{
        draw = false; 
      });

      div.appendChild(col);
    }
    container.appendChild(div);
  }
});

function checker (elementId) {
  let gridColumn = document.querySelectorAll(".gridColumn");
  gridColumn.forEach(element => {
    if (elementId == element.id){
      if(draw  && !erase){
        element.style.backgroundColor = color.value;
      }
      else if(draw && erase){
        element.style.backgroundColor = "transparent";
      }
    }
  });
}