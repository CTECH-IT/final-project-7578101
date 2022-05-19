// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let spacebar = false;
let down = false;
let downPressed = false;
let canJump = 0;
let canJump2 = 0;
let fall = 0;
let m = 0;
let n = 0;
let deaths = 0;

let score = 0;
let level = 1;
let playerWidth = 20;
let playerHeight = 20;
let dy = 0;
let dx = 0;
let jump = 1;
let jumpStart = 0.02;
let jumpSlow = 0.001
let jumpVelocity = 5;
let maxSpeed = 6;
let maxSpeedX = 4;
let speed = .1;
let friction = .05;
let g = 0.1;
let touch = 0;
let platformHeight = 10;
const platformLevel = [[400, 457, 100, 300, 500, 100], [], [500, 490, 100, 500, 380, 100], [], [500, 500, 150, 50, 400, 150, 500, 300, 150, 50, 200, 150,], [50, 120, 50, 50, 380, 50, 50, 270, 50, 600, 195, 50, 600, 345, 50, 50, 520, 50], [], []];
const wall = [[0, 590, 700, 10, 350, 100, 100, 100, 400, 400, 50, 110], [], [0, 300, 500, 200, 600, 300, 100, 200], [0, 450, 150, 150, 550, 450, 150, 150], [550, 200, 50, 10, 540, 150, 10, 60, 600, 150, 10, 60], [100, 80, 600, 50, 0, 80, 50, 275, 650, 80, 50, 520, 50, 155, 550, 50, 100, 230, 550, 50, 50, 305, 550, 50, 100, 380, 550, 150, 50, 555, 550, 45, 0, 380, 50, 275], [250, 500, 25, 20, 440, 400, 20, 20, 250, 300, 15, 20, 450, 200, 10, 20], []];
const next = [650, 550, 550, 550, 50, 250, 50, 400, 570, 170, 620, 580, 350, 120];
const coordinate = [350, 550, 100, 400, 50, 550, 600, 400, 20, 550, 650, 50, 350, 550];
let x = coordinate[2*level];
let y = coordinate[2*level+1];
let kill = [[100, 500, 40, 40], [], [], [150, 470, 400, 130], [], [m-10, 213, 10, 10, m-10, 363, 10, 10, 700-m, 288, 10, 10, 700-m, 138, 10, 10, 700-m, 538, 10, 10], [240, 180, 10, 340, 460, 180, 10, 340], []];
var coin = [[300, 450], [350, 530], [650, 250], [350, 300, 310, 310, 390, 310], [650, 100], [10, 368], [490, 200], []];
let nextSize = 10;
let touchPlatform = 0;
let coinRadius = 9;
var coin2 = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
for (let i = 0; i < coin.length; i+=1){
    Object.assign(coin2[i], coin[i]);
}
let score2 = 0;
let dm = 6;



function reset(){
  x = coordinate[2*level];
  y = coordinate[2*level+1];
  dx=0;
  dy=0;
  m=0;
  n=0;
  coin[level]=[];
  Object.assign(coin[level], coin2[level]);
  score=score2;
}

function drawPlayer(){
    ctx.beginPath();
    ctx.rect(x, y, playerWidth, playerHeight);
    ctx.fillStyle = "#2A2CAB";
    ctx.fill();
    ctx.closePath();
}

function drawCoin(){
  for (let i = 0; i < coin[level].length; i+=2){
    ctx.beginPath();
    ctx.arc(coin[level][i], coin[level][i+1], coinRadius, 0, 2*Math.PI)
    ctx.fillStyle = "#FFFB00";
    ctx.fill();
    ctx.closePath();
    ctx.font = "16px Arial"
    ctx.fillStyle = "#FE9A00"
    ctx.fillText("$", coin[level][i]-4, coin[level][i+1]+6)
  }
}

function playerMovement(){
    if (rightPressed == true && maxSpeedX >= dx){
        dx += speed;
    }
    if (rightPressed == false && 0 < dx){
        dx -= friction;
    }
    if (leftPressed == true && maxSpeedX*-1 <= dx){
        dx -= speed;
    }
    if (leftPressed == false && 0 > dx){
        dx += friction;
    }
    if (spacebar == true && canJump > 0 && jump > 0 && canJump2 == 1){
        dy = -1*jumpVelocity;
        canJump2 = 0;
        
        //dy -= jump;
        //jump -= jumpSlow;
    }
    if ((-1*friction <= dx && dx <= friction) && rightPressed == false && leftPressed == false){
        dx = 0;
    }
    canJump = 0;
}

function objectMovement(){
    m+=dm;
    n+=dm;
    if (m>=1650){
        m=0;
    }
    if (n>=2100){
        n=0;
    }
    kill[5][0] = m-10;
    kill[5][4] = n-10;
    kill[5][8] = 700-m;
    kill[5][12] = 700-m;
    kill[5][16] = 700-m;
}

function drawPlatform(){
    for (let i = 0; i < platformLevel[level].length; i+=3){
        ctx.beginPath();
        ctx.rect(platformLevel[level][i], platformLevel[level][i+1], platformLevel[level][i+2], 10);
        ctx.fillStyle = "#3BAC2D";
        ctx.fill();
        ctx.closePath();
    }
}

function drawWall(){
    for (let i = 0; i < wall[level].length; i+=4){
        ctx.beginPath();
        ctx.rect(wall[level][i], wall[level][i+1], wall[level][i+2], wall[level][i+3]);
        ctx.fillStyle = "#595959";
        ctx.fill();
        ctx.closePath();
    }
}

function drawScore(){//updates score
    ctx.font = "16px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Coins: " + score, 8, 20)
}

function drawLevel(){//updates score
    if (level != 7){
        ctx.font = "16px Arial"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("Level: " + level, canvas.width-70, 20)
    }
}
function win(){
    if (level==7){
        ctx.font = "50px Arial"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("YOU WIN!", 230, 330)
    }
  if (level==1){
        ctx.font = "20px Arial"
        ctx.fillStyle = "#FFFFFF"
        ctx.fillText("space = jump", 230, 200);
        ctx.fillText("right/left arrow = move", 230, 225);
        ctx.fillText("down arrow = fall through platform", 230, 250);
        ctx.fillText("coin =", 280, 536);
    }
}

function drawDeath(){//updates score
    ctx.font = "16px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Deaths: " + deaths, canvas.width/2-38, 20)
}

function drawNext(){
    ctx.beginPath();
    ctx.rect(next[level*2], next[level*2+1], nextSize, nextSize);
    ctx.fillStyle = "#20D9C3";
    ctx.fill();
    ctx.closePath();
}

function drawTest(){//updates score
    ctx.font = "16px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText(coin2, canvas.width/2-30, 50)
}

function drawKill(){
    for (let i = 0; i < kill[level].length; i+=4){
        ctx.beginPath();
        ctx.rect(kill[level][i], kill[level][i+1], kill[level][i+2], kill[level][i+3]);
        ctx.fillStyle = "#8C110A";
        ctx.fill();
        ctx.closePath();
    }
}

function killCollision(){
    for (let i = 0; i < kill[level].length; i+=4){
        if ((x+playerWidth>=kill[level][i] && x<=kill[level][i]+kill[level][i+2]) && (y<=kill[level][i+1]+kill[level][i+3] && y+playerHeight>=kill[level][i+1])){
            reset();
            deaths += 1;
        }
    }
}

function platformCollision(){
    touchPlatform = 0;
    for (let i = 0; i <= platformLevel[level].length; i+=3){
        if ((platformLevel[level][i]-playerWidth<=x && platformLevel[level][i]+platformLevel[level][i+2]>=x) && (y+playerHeight>=platformLevel[level][i+1] && y+playerHeight<=platformLevel[level][i+1]+maxSpeed) && dy>=0){
            if (fall == 0 && downPressed == false){
                dy=0;
                y=platformLevel[level][i+1]-playerHeight;
                if (spacebar == false){
                canJump2 = 1;
                }
                canJump = 1;
            }
            touchPlatform = 1;
        }
    }
    if (downPressed == true){
        fall = 1;
      }
    if (touchPlatform == 0 && downPressed == false){
        fall=0;
    }
}

function screenCollision(){
    if (x<=0 && dx<0){
        x=0;
        dx=dx/-3;
    }
    if (x+playerWidth>=canvas.width && dx>0){
        x=canvas.width-playerWidth;
        dx=dx/-3;
    }
    if (y+playerHeight>=canvas.height && dy>=0){
        y=canvas.height-playerHeight;
        dy=0;
        if (spacebar == false){
            canJump2 = 1;
          }
          canJump = 1;
    }
}


function wallCollision(){
    for (let i = 0; i <= wall[level].length; i+=4){
        if ((wall[level][i]-playerWidth<=x && wall[level][i]+wall[level][i+2]>=x) && (y+playerHeight>=wall[level][i+1] && y+playerHeight<=wall[level][i+1]+maxSpeed) && dy>=0){
            dy=0;
            y=wall[level][i+1]-playerHeight;
            if (spacebar == false){
              canJump2 = 1;
            }
            canJump = 1;
        }
        if ((wall[level][i]-playerWidth<=x && wall[level][i]+wall[level][i+2]>=x) && (y<=wall[level][i+1]+wall[level][i+3] && y>=wall[level][i+1]+wall[level][i+3]-jumpVelocity) && dy<=0){
            dy=dy/-2;
            y=wall[level][i+1]+wall[level][i+3];
            
        }
        if ((wall[level][i]-playerWidth<=x && wall[level][i]+maxSpeedX>=x+playerWidth) && (y+playerHeight>wall[level][i+1]+maxSpeed && y<wall[level][i+1]+wall[level][i+3]-jumpVelocity) && dx>=0){
            dx=dx/-3;
            x=wall[level][i]-playerWidth;
        }
        if ((wall[level][i]+wall[level][i+2]>=x && wall[level][i]+wall[level][i+2]-maxSpeedX<=x) && (y+playerHeight>wall[level][i+1]+maxSpeed && y<wall[level][i+1]+wall[level][i+3]-jumpVelocity) && dx<=0){
            dx=dx/-3;
            x=wall[level][i]+wall[level][i+2];
        }
    }
}


function nextCollision(){
    if ((x+playerWidth>=next[2*level] && x<=next[2*level]+nextSize) && (y<=next[2*level+1]+nextSize && y+playerHeight>=next[2*level+1])){
        level+=1;
        score2=score;
        reset();
    }
}

function coinCollision(){
  for (let i = 0; i < coin[level].length; i+=2){
    if ((x+playerWidth>=coin[level][i]-coinRadius && x<=coin[level][i]+coinRadius) && (y+playerHeight>=coin[level][i+1]-coinRadius && y<=coin[level][i+1]+coinRadius)){
      coin[level][i]=-100;
      score+=1;
      console.log(coin2[level]);
    }
  }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerMovement();
    platformCollision();
    wallCollision();
    screenCollision();
    coinCollision();
    killCollision();
    nextCollision();
    objectMovement()

    drawPlatform();
    drawWall();
    drawCoin();
    drawKill();
    drawNext();
    win();
    drawPlayer();
    drawScore();
    drawLevel();
    drawDeath();
    //drawTest();
    y+=dy;
    x+=dx;
    if (dy <= maxSpeed){
        dy+=g;
    }
    
}




function keyDownHandler(e) {//detects when keys are pushed down
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key=="ArrowUp" || e.code == "Space") {
        spacebar = true;
    }
    if(e.key=="t") {
        down = true;
    }
    if(e.key=="Down" || e.key == "ArrowDown") {
        downPressed = true;
    }

}

function keyUpHandler(e) {//detects when keys stop being pushed
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key=="ArrowUp" || e.code == "Space") {
        spacebar = false;
    }
    if(e.key=="t") {
        down = false;
    }
    if(e.key=="Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);


