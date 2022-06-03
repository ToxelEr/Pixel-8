let t = 0

boot(128,128);

function update() {

  cls();

  requestAnimationFrame(update);

  t += 1
  
  circfill(t%148,t%148,20,palette[1])

}

update();
