/*  Recursive Backtracking Maze Generator
    Code by Armel Dzian (2018)
*/

//cell matrix in which the maze will be crated
function makeTable(cols,rows,size){
    let table = [];
    for (let i = 0; i<rows;i++){
        let line=[];
        for (let j = 0; j<cols;j++){

            //every element of the matrix is a cell class object from cell.js
            line.push(new Cell(j,i,size));
        }
        table.push(line);
    }
    return table;
}

// depending on their relevant position, removes walls between the current cell and the one selected as next
function removeWalls(current,choosen){

    // compare relative x position
    if(current.x-choosen.x < 0){
        current.walls.right = false;
        choosen.walls.left = false;
    }else if(current.x-choosen.x > 0){
        current.walls.left = false;
        choosen.walls.right = false;
    }

    // compare relative y postion
    if(current.y-choosen.y < 0){
        current.walls.bottom = false;
        choosen.walls.top = false;
    }else if(current.y-choosen.y > 0){
        current.walls.top = false;
        choosen.walls.bottom = false;
    }
}

// main function run by the index.html on body load
function init(){
    let canvas = document.getElementById("myCanvas"); //reference to html canvas
    let ctx = canvas.getContext("2d"); //reference to html canvas context, used for the visualisation
    let cellSize = 30; //default cell size, determinates the number and size of cells in the matrix (TWEAK)
    let cols = Math.floor(canvas.width/cellSize); //determinates the number of columns
    let rows = Math.floor(canvas.height/cellSize); //determinates the number of rows
    let table = makeTable(cols,rows,cellSize); // the matrix
    let currentCell = table[0][0];
    let stack = []; // stack is used to store the visited cells in order to ba able to come back in the backtrack phase

    /* DEBUGING 
    console.log(canvas.width);
    console.log(canvas.height);
    console.table(table);
    */

    // main loop repeated by the setInterval function
    function loop(){

        ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

        currentCell.visited = true;
        
        // display all cells in the matrix
        for (let i = 0; i<table.length;i++){
            for (let j = 0; j<table[i].length;j++){
                table[i][j].show();
            }
        }

        // highlight with a different color the current cell
        currentCell.highlight();

        if(currentCell.checkNeighbours(table).length != 0){
            // if there are neighbours to the current cell that havent been visited
            // put the current cell to the stack:
            stack.push(currentCell);
            // choose randomly the next cell to be visited:
            let choosenCell = currentCell.checkNeighbours(table)[Math.floor(Math.random()*currentCell.checkNeighbours(table).length)];
            // remove the walls between current and choosen cell:
            removeWalls(currentCell,choosenCell);
            // set the choosen cell as the current:
            currentCell = choosenCell;

        }else if (stack.length > 0){
            //else if there is no unvisited neighbour cell and the stack is not empty
            //set the last visited cell from the stack as the current cell:
            currentCell = stack.pop();
        }
    }
    // repate the loop() funtion every 200 ms (TWEAK)
    setInterval(loop,150);
}