// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let spacebar = false;
let down = false;
let canJump = 1;


let x = 20;
let y = 500;
let playerWidth = 20;
let playerHeight = 20;
let dy = -6;
let dx = 0;
let jump = 1;
let jumpStart = 0.02;
let jumpSlow = 0.001
let maxSpeed = 4;
let maxSpeedX = 4;
let speed = .1;
let friction = .05;
let g = 0.1;
let touch = 0;
let platformHeight = 10;
const platform = [0, canvas.height-platformHeight, canvas.width, 400, 500, 100, 0, 400, 100];
let numPlatform = 3;



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
    if (spacebar == true && canJump > 0 && jump > 0){
        dy = -5;
        canJump -= 1;
        //dy -= jump;
        //jump -= jumpSlow;
    }
    if ((-1*friction <= dx && dx <= friction) && rightPressed == false && leftPressed == false){
        dx = 0;
    }
}

function drawPlatform(){
    for (let i = 0; i < numPlatform*3; i+=3){
        ctx.beginPath();
        ctx.rect(platform[i], platform[i+1], platform[i+2], 10);
        ctx.fillStyle = "#3BAC2D";
        ctx.fill();
        ctx.closePath();
    }
}

function platformCollision(){
    for (let i = 0; i <= numPlatform*3; i+=3){
        if ((platform[i]-playerWidth<=x && platform[i]+platform[i+2]>=x) && (y+playerHeight>=platform[i+1] && y+playerHeight<=platform[i+1]+platformHeight) && dy>=0){
            dy=0;
            y=platform[i+1]-playerHeight;
            canJump = 1;
        }

    }
}

function screenCollision(){
    if (x<=0 && dx<0){
        x=0;
        dx=dx/-2
    }
    if (x+playerWidth>=canvas.width && dx>0){
        x=canvas.width-playerWidth;
        dx=dx/-2
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    platformCollision();
    playerMovement();
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


