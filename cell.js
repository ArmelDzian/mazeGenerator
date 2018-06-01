/*  Recursive Backtracking Maze Generator
    Code by Armel Dzian (2018)
*/

class Cell{

    constructor(x,y,size){
        this.walls = {top: true,right:true,bottom:true,left:true}; // true if given cell wall should be displayed
        this.visited = false; // true after a caell will be visited
        this.x = x; // x cordonate = j matrix index
        this.y =  y; // y cordonate = i matrix index
        this.size = size; // size of the cell (default defined in script.js)
    }

    // hightlight a cell with a different color
    highlight(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let xCord = this.x*this.size;
        let yCord = this.y*this.size;
        ctx.fillStyle = "#dcf271";
        ctx.fillRect(xCord,yCord,this.size,this.size);
    }

    // display a cell
    show(){

        let canvas = document.getElementById("myCanvas"); //reference to html canvas
        let ctx = canvas.getContext("2d"); //reference to html canvas context, used for the visualisation
        let xCord = this.x*this.size; // x cordonate in canvas units (pixels??)
        let yCord = this.y*this.size; // y cordonate in canvas units (pixels??)
        
        // color in the cell
        if(this.visited){
            ctx.fillStyle = "#808080";
        }else{
            ctx.fillStyle = "#000000";
        }
        ctx.fillRect(xCord,yCord,this.size,this.size);

        // draw each wall if it should be displayed using a single path
        ctx.strokeStyle = "#e6e6e6";
        ctx.beginPath();

        ctx.moveTo(xCord,yCord);
        if(this.walls.top){
            ctx.lineTo(xCord + this.size, yCord);
        }

        ctx.moveTo(xCord + this.size, yCord);
        if(this.walls.right){
            ctx.lineTo(xCord + this.size, yCord + this.size);
        }
        
        ctx.moveTo(xCord + this.size, yCord + this.size);
        if(this.walls.bottom){
            ctx.lineTo(xCord, yCord + this.size);
        }

        ctx.moveTo(xCord, yCord + this.size);
        if(this.walls.left){
            ctx.lineTo(xCord, yCord);
        }
        ctx.stroke();
    }

    // check wether there is an unvisited neighbour - return a list of them
    checkNeighbours(table){
        let neighbours = [];
        
        if(table[this.y] && table[this.y][this.x-1] && !table[this.y][this.x-1].visited){
            neighbours.push(table[this.y][this.x-1]);
        }
        if(table[this.y-1]  && table[this.y-1][this.x]  && !table[this.y-1][this.x].visited){
            neighbours.push(table[this.y-1][this.x]);
        }
        if(table[this.y] && table[this.y][this.x+1] && !table[this.y][this.x+1].visited){
           neighbours.push(table[this.y][this.x+1]);

        }
        if(table[this.y+1] && table[this.y+1][this.x] && !table[this.y+1][this.x].visited){
            neighbours.push(table[this.y+1][this.x]);
        }
        
        return neighbours;
    
    }
}