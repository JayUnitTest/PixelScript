let gridWidth = document.querySelector("width-value");
let gridLength = document.querySelector("height-value");



function createCanvas(){
    let table = document.getElementById("canvas-container");

    for(let i =0; i <gridWidth; i++ ) {
        let myRow = document.createElement("tr");
        myRow.id = "row" + i ;

        table.appendChild(myRow);
        let rowW = document.getElementById("row" + i);

        for (let j = 0; j < gridLength; i++){
            let myCell = document.createElement("td");
            rowW.appendChild(myCell);
        }
    }
}