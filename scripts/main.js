// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let spacebar = false;
let down = false;
let canJump = 0;
let canJump2 = 0;


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
const platformLevel = [[400, 457, 100, 0, 500, 100], [], [500, 490, 100, 500, 380, 100], [500, 500, 150, 50, 400, 150, 500, 300, 150, 50, 200, 150,], []];
const wall = [[0, canvas.height-platformHeight, canvas.width, 10, 350, 100, 100, 100, 0, 400, 50, 200], [], [0, 300, 500, 200, 600, 300, 100, 200], [550, 200, 50, 10, 540, 150, 10, 60, 600, 150, 10, 60], []];
const next = [650, 550, 550, 550, 50, 250, 570, 170];
const coordinate = [350, 550, 100, 400, 50, 550, 20, 550, 100, 100];
let x = coordinate[2*level];
let y = coordinate[2*level+1];
let nextSize = 10;




function drawPlayer(){
    ctx.beginPath();
    ctx.rect(x, y, playerWidth, playerHeight);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
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
    ctx.fillText("Score: " + score, 8, 20)
}

function drawLevel(){//updates score
    ctx.font = "16px Arial"
    ctx.fillStyle = "#FFFFFF"
    ctx.fillText("Level: " + level, canvas.width/2-30, 20)
}

function drawNext(){
    ctx.beginPath();
    ctx.rect(next[level*2], next[level*2+1], nextSize, nextSize);
    ctx.fillStyle = "#20D9C3";
    ctx.fill();
    ctx.closePath();
}

function platformCollision(){
    for (let i = 0; i <= platformLevel[level].length; i+=3){
        if ((platformLevel[level][i]-playerWidth<=x && platformLevel[level][i]+platformLevel[level][i+2]>=x) && (y+playerHeight>=platformLevel[level][i+1] && y+playerHeight<=platformLevel[level][i+1]+maxSpeed) && dy>=0){
            dy=0;
            y=platformLevel[level][i+1]-playerHeight;
            if (spacebar == false){
              canJump2 = 1;
            }
            canJump = 1;
        }

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
        x = coordinate[2*level];
        y = coordinate[2*level+1];
        dx=0;
        dy=0;
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerMovement();
    platformCollision();
    wallCollision();
    screenCollision();
    nextCollision();

    drawPlatform();
    drawWall();
    drawNext();
    drawPlayer();
    drawScore();
    drawLevel();
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
}




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);


