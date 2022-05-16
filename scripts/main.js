// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = 20;
let y = 40;
let playerWidth = 20;
let playerHeight = 20;
let dy = 0;
let maxSpeed = 3;
let g = 0.05;
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
        if ((platform[i]-playerWidth<=x && platform[i]+platform[i+2]>=x) && (y+playerHeight>=platform[i+1] && y+playerHeight<=platform[i+1]+platformHeight)){
            dy=0;
        }

    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatform();
    drawPlayer();
    platformCollision();
    y+=dy;
    if (dy <= maxSpeed){
        dy+=g;
    }
    
    
}
setInterval(draw, 10);


