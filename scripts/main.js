// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let spacebar = false;
let down = false;
let canJump = 0;
let canJump2 = 0;


let level = 1;
let x = 20;
let y = 500;
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
const platformLevel = [[0, canvas.height-platformHeight, canvas.width, 400, 457, 100, 0, 500, 100], [0, canvas.height-platformHeight, canvas.width, 400, 300, 100, 100, 500, 100]];
const wall = [[100, 100, 100, 100], [250, 400, 50, 100, 500, 300, 50, 300]];




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
        ctx.fillStyle = "#BBBBBB";
        ctx.fill();
        ctx.closePath();
    }
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
        dx=dx/-2;
    }
    if (x+playerWidth>=canvas.width && dx>0){
        x=canvas.width-playerWidth;
        dx=dx/-2;
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
            dx=dx/-2;
            x=wall[level][i]-playerWidth;
        }
        if ((wall[level][i]+wall[level][i+2]>=x && wall[level][i]+wall[level][i+2]-maxSpeedX<=x) && (y+playerHeight>wall[level][i+1]+maxSpeed && y<wall[level][i+1]+wall[level][i+3]-jumpVelocity) && dx<=0){
            dx=dx/-2;
            x=wall[level][i]+wall[level][i+2];
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    drawWall();
    platformCollision();
    wallCollision();
    playerMovement();
    canJump = 0;
    screenCollision();
    drawPlayer();
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


