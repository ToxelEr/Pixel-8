let t = 0
let n = 255/32

boot(32,32);

function update() {

  cls();

  requestAnimationFrame(update);

  t += 1

  for (let x = 0; x < 32; x++) {
    for (let y = 0; y < 32; y++) {
      r = x*n
      g = y*n
      b = x+y
      pset(x,y,palette[rgbi(r,g,b,palette)])
    }
  }
}

update();
