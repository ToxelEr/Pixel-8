//Pixel-8.js

//All Rights Reserved 2022 Toxel

//palette
var colors_pico8 = [
   'rgb(0,0,0)',
   'rgb(29,43,83)',
   'rgb(126,37,83)',
   'rgb(0,135,81)',
   'rgb(171,82,54)',
   'rgb(95,87,79)',
   'rgb(194,195,199)',
   'rgb(255,241,232)',
   'rgb(255,0,77)',
   'rgb(255,163,0)',
   'rgb(255,236,39)',
   'rgb(0,228,54)',
   'rgb(41,173,255)',
   'rgb(131,118,156)',
   'rgb(255,119,168)',
   'rgb(255,204,170)'
];

//canvas
var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');

function boot(screenX,screenY) {
  ctx.canvas.width = screenX || 64;
  ctx.canvas.height = screenY || 64;
}

//console logs
/*(function () {
    var old = console.log;
    var logger = document.getElementById('console');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
         logger.style.color = colors[19];
    }
})();*/

function rgb(r,g,b) {
  return {x:r ,y:g ,z:b};
}

let palette=[];

var colors = [
  'rgb(219,145,145)',//1
  'rgb(255,227,227)',//1
  'rgb(171,134,255)',//1
  'rgb(255,179,228)',//1
  'rgb(255,150,150)',//1
  'rgb(255,163,125)',//1
  'rgb(255,255,117)',//1
  'rgb(171,255,104)',//1
  'rgb(0,194,255)',//1
  'rgb(254,255,255)',//1
  'rgb(91,91,118)',//1
  'rgb(187,103,122)',//2
  'rgb(255,202,184)',//2
  'rgb(137,107,214)',//2
  'rgb(255,144,202)',//2
  'rgb(255,72,101)',//2
  'rgb(255,108,80)',//2
  'rgb(255,205,0)',//2
  'rgb(62,186,73)',//2
  'rgb(0,140,255)',//2
  'rgb(221,224,240)',//2
  'rgb(60,60,80)',//2
  'rgb(144,79,90)',//3
  'rgb(245,171,160)',//3
  'rgb(102,81,158)',//3
  'rgb(230,108,167)',//3
  'rgb(187,52,77)',//3
  'rgb(200,77,61)',//3
  'rgb(233,163,0)',//3
  'rgb(0,134,74)',//3
  'rgb(0,106,212)',//3
  'rgb(135,139,160)',//3
  'rgb(26,26,37)'//3
];

//sort
for (let x = 0; x < 11; x++) {
  for (let y = 0; y < 3; y++) {
    var i = y*11 + x;
    palette[x*3+y] = colors[i];
  }
}

function sprite(cart) {
  img = new Image();
  img.src = 'carts/' + cart + '/sprite.png';
  document.body.appendChild(img);
  img.style.display = 'none';
  img.classList.add('sprite');
}

function spr(x,y,i,j) {
  img = document.querySelector('.sprite');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img,i,j,8,8,x,y,8,8);
}

function sspr(x,y,w,h,x1,y1,w1,h1) {
  img = document.querySelector('.sprite');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(img,x1,y1,w1,h1,x,y,w,h);
}

//rotate x,y by z
function rotate(x1,y1,x,y,angle) {
  a = angle
  var radians = (Math.PI / 180) * a;
  cos = Math.cos(radians);
  sin = Math.sin(radians);
  nx = (cos * (x - x1)) + (sin * (y - y1)) + x1;
  ny = (cos * (y - y1)) - (sin * (x - x1)) + y1;
  return [nx, ny];
}

//random numbers
function rnd(x) {
  return Math.random() * (x || 1);
}

//math floor
function flr(x) {
   return Math.floor(x);
}

//radians to degrees
function deg(x) {
   return x/(180/Math.PI);
}

//clear screen
function cls(x) {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   canvas.style.background = x;
}

//calculate distance between 2 point in 3d space 
//distance({x:1,y:2,z:3},{x:3,y:2,z:1});
function distance(v1, v2) {
    var a = v2.x - v1.x;
    var b = v2.y - v1.y;
    var c = v2.z - v1.z;

    return Math.hypot(a,b,c);
}

//RGB to index
function rgbi(r,g,b,list) {
  let id = 0;
  let min = Infinity;
  for (let i = 0; i < list.length; i++) {
    col = eval(list[i]);
    a = distance({x:r,y:g,z:b},col);
    if (a < min) {
      id = i;
      min = a;
    }
  }
  return id;
}

//RGB to color
function rgbc(r,g,b) {
  return 'rgb('+r+','+g+','+b+')';
}

//Draw Pixel
function pset(x,y,c) {
   x = Math.round(x);
   y = Math.round(y);
   ctx.beginPath();
   ctx.fillStyle = c;
   ctx.fillRect(x,y,1,1);
   ctx.fill();
}

//Get Pixel Color
function pget(y,x) {
   x = Math.round(x);
   y = Math.round(y);
   var data = ctx.getImageData(x,y, 1, 1).data;
   data[0] = data[0];
   data[1] = data[1];
   data[2] = data[2];
   return 'rgb(' + data[0] + ',' + data[1] + ',' + data[2] + ')';
}

//Draw Circle
function circfill(x,y,s,c) {
   x = Math.round(x);
   y = Math.round(y);
   s = Math.round(s);
   ctx.beginPath();
   ctx.arc(x,y,s,0,Math.round(2*Math.PI));
   ctx.fillStyle = c;
   ctx.fill();
}

//Draw Line
function line(x,y,x1,y1,c,w) {
   x = Math.round(x);
   y = Math.round(y);
   x1 = Math.round(x1);
   y1 = Math.round(y1);
   ctx.beginPath();
   ctx.moveTo(x,y);
   ctx.lineTo(x1,y1);
   ctx.strokeStyle = c;
   ctx.lineWidth = w + 1;
   ctx.stroke();
}

//Draw Rectangle
function rectfill(x,y,sx,sy,c) {
   x = Math.round(x)-sx/2;
   y = Math.round(y)-sy/2;
   sx = Math.round(sx);
   sy = Math.round(sy);
   ctx.beginPath();
   ctx.fillStyle = c;
   ctx.fillRect(x,y,sx,sy);
   ctx.fill();
}

//Draw Triangle
function trifill(x,y,x1,y1,x2,y2,c){
   x = Math.round(x);
   y = Math.round(y);
   x1 = Math.round(x1);
   y1 = Math.round(y1);
   x2 = Math.round(x2);
   y2 = Math.round(y2);
   ctx.beginPath();
   ctx.fillStyle = c;
   ctx.moveTo(x,y);
   ctx.lineTo(x1,y1);
   ctx.lineTo(x2,y2);
   ctx.fill();
}
