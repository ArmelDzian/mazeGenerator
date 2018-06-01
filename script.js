


function makeTable(cols,rows,size){
    let table = [];
    for (let i = 0; i<rows;i++){
        let line=[];
        for (let j = 0; j<cols;j++){
            line.push(new Cell(j,i,size));
        }
        table.push(line);
    }
    return table;
}

function removeWalls(current,choosen){
    if(current.x-choosen.x < 0){
        current.walls.right = false;
        choosen.walls.left = false;
    }else if(current.x-choosen.x > 0){
        current.walls.left = false;
        choosen.walls.right = false;
    }

    if(current.y-choosen.y < 0){
        current.walls.bottom = false;
        choosen.walls.top = false;
    }else if(current.y-choosen.y > 0){
        current.walls.top = false;
        choosen.walls.bottom = false;
    }
}

function init(){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let cellSize = 40;
    let cols = Math.floor(canvas.width/cellSize);
    let rows = Math.floor(canvas.height/cellSize);
    let table = makeTable(cols,rows,cellSize);
    let currentCell = table[0][0];
    let stack = [];
    console.log(canvas.width);
    console.log(canvas.height);
    console.table(table);

    function loop(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // refresh
        currentCell.visited = true;
        
        for (let i = 0; i<table.length;i++){
            for (let j = 0; j<table[i].length;j++){
                table[i][j].show();
            }
        }
        currentCell.highlight();
        if(currentCell.checkNeighbours(table).length != 0){
            stack.push(currentCell);
            let choosenCell = currentCell.checkNeighbours(table)[Math.floor(Math.random()*currentCell.checkNeighbours(table).length)];
            removeWalls(currentCell,choosenCell);
            currentCell = choosenCell;
        }else if (stack.length > 0){
            currentCell = stack.pop();
        }
        console.log(stack.length);
    }
    setInterval(loop,200);
}