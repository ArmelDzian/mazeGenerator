
class Cell{
    constructor(x,y,size){
        this.walls = {top: true,right:true,bottom:true,left:true};
        this.visited = false;
        this.x = x;
        this.y =  y;
        this.size = size;
    }

    highlight(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let xCord = this.x*this.size;
        let yCord = this.y*this.size;
        ctx.fillStyle = "#dcf271";
        ctx.fillRect(xCord,yCord,this.size,this.size);
    }

    show(){
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let xCord = this.x*this.size;
        let yCord = this.y*this.size;
        
        if(this.visited){
            ctx.fillStyle = "#808080";
        }else{
            ctx.fillStyle = "#000000";
        }

        ctx.fillRect(xCord,yCord,this.size,this.size);

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