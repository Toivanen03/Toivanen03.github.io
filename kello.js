const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let pohja = canvas.height / 2;
ctx.translate(pohja, pohja);
pohja = pohja * 0.90;

setInterval(drawClock, 1000);

function drawClock() {
  ctx.arc(0, 0, pohja, 0 , 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
  drawFace(ctx, pohja);
  drawNumbers(ctx, pohja);
  drawTime(ctx, pohja);
}

function drawFace(ctx, pohja) {
  const grad = ctx.createRadialGradient(0, 0 ,pohja * 0.95, 0, 0, pohja * 1.05);
  grad.addColorStop(0, 'gray');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, 'black');

  ctx.beginPath();
  ctx.arc(0, 0, pohja, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.strokeStyle = grad;
  ctx.lineWidth = pohja*0.1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, pohja * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drawNumbers(ctx, pohja) {
  ctx.font = pohja * 0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(let num = 1; num < 13; num++){
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -pohja * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, pohja * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, pohja) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour = hour%12;
  hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
  drawHand(ctx, hour, pohja*0.5, pohja*0.09);
  //minute
  minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
  drawHand(ctx, minute, pohja*0.7, pohja*0.05);
  // second
  second = (second*Math.PI/30);
  drawHand(ctx, second, pohja*0.9, pohja*0.02);
}

function drawHand(ctx, pos, length, width) {  
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.rotate(-pos);
}