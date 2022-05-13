// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = 20;
let y = 40;
let dy = 2;

function drawPlayer(){
    ctx.beginPath();
    ctx.rect(x, y, 20, 20);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    y+=dy;
}
setInterval(draw, 10);


