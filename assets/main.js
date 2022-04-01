let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const ROW = 18;
const COL = 10;
const SQ = 40 ;
const COLOR = "BLACK"
let score = 0;
let level = 0;
// let time = 1000;
// tạo bảng
function drawSquare(x,y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "#ccc";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}


let board = [];
for (let r = 0; r < ROW ; r++){
    board[r] = [];
    for (let c= 0; c < COL ; c++){
        board[r][c] = COLOR;
    }
}
// console.log(board);
function drawBoard(){
    for(let r = 0; r < ROW; r++){
        for(c = 0; c < COL ; c++){
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();  
// kết thúc tạo bảng

// hiển thị khối 
class Piece {
    constructor(tetromino, color){
        this.tetromino = tetromino;
        this.color = color;

        this.tetrominoN = 0; //chỉ số góc quay đầu tiên
        this.activeTetromino = this.tetromino[this.tetrominoN];

        this.x = 3;
        this.y = -2;
    }

    fill(color){                                    
        for (let r = 0; r < this.activeTetromino.length; r++){
            for (let c = 0; c < this.activeTetromino.length; c++){
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }
    // vẽ màu
    draw(){
        this.fill(this.color)
    }
    unDraw(){
        this.fill(COLOR)
    }
    moveDown(){
        if(!this.collision(0, 1, this.activeTetromino)){                
            this.unDraw();
            this.y++;
            this.draw();
        }else {
            this.lock();
            p = randomPiece();
        }
    }
    moveLeft(){
        if(!this.collision(-1, 0, this.activeTetromino)){
            this.unDraw();
            this.x--;
            this.draw();
        }
    }
    moveRight(){
        if(!this.collision(1, 0, this.activeTetromino)){
            this.unDraw();
            this.x++;
            this.draw();
        }
    }
    // lock(){
    //     for(let r = 0; r < this.activeTetromino.length; r++){
    //         for(let c = 0; c < this.activeTetromino.length; c++){
    //             if(!this.activeTetromino[r][c]){
    //                 continue
    //             }
    //             if(this.y + r < 0){
    //                 alert("game over");
    //                    gameOver = true;
    //                 break;
    //             }
    //             board[this.y + r][this.x + c] = this.color;
    //         }
    //     }
    // }
    lock(){
        for(let r = 0; r < this.activeTetromino.length; r++){
            for(let c = 0; c < this.activeTetromino.length; c++){
                if(!this.activeTetromino[r][c]){
                    continue
                }
                if(this.y + r < 0){
                    alert("game over");
                    gameOver = true;
                    break;
                }
                board[this.y + r][this.x + c] = this.color;
            }
        }
        console.log(board[this.y + r][this.x + c] = this.color)
        //xử lý ăn điểm
        
        for (let r = 0; r < ROW ; r++){
            let isFull = true;
            for (let c = 0; c < COL; c++){
                isFull = isFull && (board[r][c] != COLOR)
            }
            if(isFull){
                for (let y = r; y > 1 ; y--){
                    for (let c = 0; c < COL; c++){
                        board[y][c] = board[y-1][c];
                    }
            }
            for (let c = 0; c < COL; c++){
                board[0][c] = COLOR;
            }
            score += 10;     
        }
        // level uppp
        if (score > 0){  
            level = 1;
            drop(500, true);
        }
        if (score > 40){ 
            level = 2;
            drop(100, true);

        }
        document.getElementById("level").innerText = level;
    }
    drawBoard();
    document.getElementById("score").innerText = score;
        
    
    }

    // phuong thuc xoay hình
    rotate(){
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let move = 0;

        // if(this.collision(0 ,0 , nextPattern)){
        //     if(this.x > COL / 2){
        //         move = -1;
        //     }else {
        //         move = 1;
        //     }
        // }
        if (!this.collision(0, 0 ,nextPattern)){
            this.unDraw();
            this.x += move;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }
    // phuong thuc va chạm
    collision(x ,y ,piece){
        for(let r = 0; r < piece.length; r++){
            for(let c = 0; c < piece.length; c++){
                if(!piece[r][c]){
                continue;
                }
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                if(newX < 0 || newX  >= COL || newY >= ROW){
                    return true;
                }
                if(newY < 0){
                    continue;
                }
                if(board[newY][newX] != COLOR ){
                    return true;
                }
            }
        }
        return false;
    }
}       
const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

// code random hình đầu tiên 
function randomPiece(){
    let r = Math.floor(Math.random() * PIECES.length);
    return new Piece(PIECES[r][0], PIECES[r][1]);
}
let p = randomPiece();
console.log(p);

// lắng nghe sự kiện bấm mũi tên
document.addEventListener("keydown", function(e){
    if(e.keyCode == 37){
        p.moveLeft();
    }else if(e.keyCode == 39){
        p.moveRight();
    }else if(e.keyCode == 38){
        p.rotate();
    }else if(e.keyCode == 40){
        p.moveDown();
    }else if(e.keyCode == 32){ //start game
        drop();
        
    }else if(e.keyCode == 27){
        clearInterval(interval);
        alert('Nhấn space để tiếp tục')
    }
})
function start(){
    drop();
}


// hiển thị rơi
let gameOver = false;
let interval;

function drop(time = 1000, clear = false) {
    if(clear) {
        clearInterval(interval);
    }    
    interval = setInterval(function(){
        if (!gameOver){        
            p.moveDown();
        }    
    }, time)
}


window.addEventListener('keydown', (evt) => {
    console.log(evt);
})