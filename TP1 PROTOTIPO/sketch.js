let mic;
let imgBlanco, imgNegro, imgAzul, imgRojo, imgAmarillo, imgNegro2, imgAmarillo2, imgRojo2, imgAzul2;
let imgFondo;

let t = 0; // Variable de tiempo para la vibración lenta

function preload(){
  imgFondo = loadImage("data/imgfondo3.jpg");

  imgBlanco= loadImage("data/blanco02.png");
  
  imgAmarillo = loadImage("data/amarillo01.png");
  imgNegro= loadImage("data/negro01.png");
  imgAzul = loadImage("data/azul01.png");
  imgRojo = loadImage("data/rojo01.png");
  imgAmarillo2 = loadImage("data/amarillo02.png");
  imgNegro2= loadImage("data/negro02.png");
  imgAzul2 = loadImage("data/azul02.png");
  imgRojo2 = loadImage("data/rojo02.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
}

let vibrar = false;
let vibrarLento = false;
let colorVibrante = false;
let colorOscuro = false;

let offsetNegro = 0;
let offsetNegro1 = 0;
let offsetNegro2 = 0;
let offsetOtros = 0;
let velNegro = 0;
let velNegro1 = 0;
let velNegro2 = 0;
let velOtros = 0;

function draw() {
  background(90);
  image(imgFondo, 0, 0, width, height);
  ellipseMode(CORNER);

  let micLevel = mic.getLevel();
  fill(255);
  ellipse(1,1, micLevel*1000);

  t += 0.02; // Incrementa el tiempo para la vibración lenta

  // Vibración individual para cada imagen
  let vibNegroX, vibNegroY, vibNegro2X, vibNegro2Y;
  let vibAmarilloX, vibAmarilloY, vibRojoX, vibRojoY;
  let vibAzulX, vibAzulY, vibAmarillo2X, vibAmarillo2Y;
  let vibRojo2X, vibRojo2Y, vibAzul2X, vibAzul2Y;

  if (vibrarLento) {
    // Vibración lenta y amplia usando sin/cos
    vibNegroX = sin(t) * 30;
    vibNegroY = cos(t) * 30;
    vibNegro2X = sin(t+1) * 30;
    vibNegro2Y = cos(t+1) * 30;
    vibAmarilloX = sin(t+2) * 30;
    vibAmarilloY = cos(t+2) * 30;
    vibRojoX = sin(t+3) * 30;
    vibRojoY = cos(t+3) * 30;
    vibAzulX = sin(t+4) * 30;
    vibAzulY = cos(t+4) * 30;
    vibAmarillo2X = sin(t+5) * 30;
    vibAmarillo2Y = cos(t+5) * 30;
    vibRojo2X = sin(t+6) * 30;
    vibRojo2Y = cos(t+6) * 30;
    vibAzul2X = sin(t+7) * 30;
    vibAzul2Y = cos(t+7) * 30;
  } else if (vibrar) {
    // Vibración rápida y pequeña
    vibNegroX = random(-3,3);
    vibNegroY = random(-3,3);
    vibNegro2X = random(-3,3);
    vibNegro2Y = random(-3,3);
    vibAmarilloX = random(-3,3);
    vibAmarilloY = random(-3,3);
    vibRojoX = random(-3,3);
    vibRojoY = random(-3,3);
    vibAzulX = random(-3,3);
    vibAzulY = random(-3,3);
    vibAmarillo2X = random(-3,3);
    vibAmarillo2Y = random(-3,3);
    vibRojo2X = random(-3,3);
    vibRojo2Y = random(-3,3);
    vibAzul2X = random(-3,3);
    vibAzul2Y = random(-3,3);
  } else {
    // Sin vibración
    vibNegroX = vibNegroY = vibNegro2X = vibNegro2Y = 0;
    vibAmarilloX = vibAmarilloY = vibRojoX = vibRojoY = 0;
    vibAzulX = vibAzulY = vibAmarillo2X = vibAmarillo2Y = 0;
    vibRojo2X = vibRojo2Y = vibAzul2X = vibAzul2Y = 0;
  }

  // Antes de cada image(), pon el tint adecuado
  if (colorVibrante) {
    tint(255, 255, 0, 255); // Amarillo brillante (puedes variar)
  } else if (colorOscuro) {
    tint(50, 50, 50, 180); // Oscuro y apagado
  } else {
    noTint();
  }
  image(imgNegro, 320 + vibNegroX + offsetNegro1, 25 + vibNegroY, width, height);

  if (colorVibrante) {
    tint(0, 255, 255, 255); // Cian brillante
  } else if (colorOscuro) {
    tint(50, 50, 80, 180);
  } else {
    noTint();
  }
  image(imgNegro2, -200 + vibNegro2X + offsetNegro2, -150 + vibNegro2Y, width, height);

  if (colorVibrante) {
    tint(255, 0, 255, 255); // Magenta brillante
  } else if (colorOscuro) {
    tint(80, 50, 50, 180);
  } else {
    noTint();
  }
  image(imgAmarillo, -100 + vibAmarilloX + offsetOtros, 0 + vibAmarilloY, 350, height); 

  if (colorVibrante) {
    tint(0, 255, 0, 255); // Verde brillante
  } else if (colorOscuro) {
    tint(50, 80, 50, 180);
  } else {
    noTint();
  }
  image(imgRojo, 0 + vibRojoX + offsetOtros, -100 + vibRojoY, width/2, height/2);

  if (colorVibrante) {
    tint(0, 0, 255, 255); // Azul brillante
  } else if (colorOscuro) {
    tint(50, 50, 80, 180);
  } else {
    noTint();
  }
  image(imgAzul, -100 + vibAzulX + offsetOtros, 400 + vibAzulY, width/2, height/2);

  if (colorVibrante) {
    tint(255, 165, 0, 255); // Naranja brillante
  } else if (colorOscuro) {
    tint(80, 50, 20, 180);
  } else {
    noTint();
  }
  image(imgAmarillo2, 600 + vibAmarillo2X + offsetOtros, 0 + vibAmarillo2Y, 350, height); 

  if (colorVibrante) {
    tint(75, 0, 130, 255); // Índigo brillante
  } else if (colorOscuro) {
    tint(20, 20, 50, 180);
  } else {
    noTint();
  }
  image(imgRojo2, 70 + vibRojo2X + offsetOtros, 350 + vibRojo2Y, width/2, height/2);

  if (colorVibrante) {
    tint(238, 130, 238, 255); // Violeta brillante
  } else if (colorOscuro) {
    tint(50, 20, 50, 180);
  } else {
    noTint();
  }
  image(imgAzul2, 500 + vibAzul2X + offsetOtros, -100 + vibAzul2Y, width/2, height/2);

  noTint(); // Al final, para no afectar otros dibujos

  offsetNegro1 += velNegro1;
  offsetNegro2 += velNegro2;

  offsetNegro1 = (offsetNegro1 + width + imgNegro.width) % (width + imgNegro.width);
  offsetNegro2 = (offsetNegro2 + width + imgNegro2.width) % (width + imgNegro2.width);
  offsetOtros += velOtros;

  // Luego aplica el módulo para que vuelvan a entrar por el otro lado:
  offsetOtros = (offsetOtros + width + 350) % (width + 350); // 350 es el ancho de imgAmarillo, por ejemplo
}

// Activa/desactiva vibración con la tecla "v"
function keyPressed() {
  if (key === 'v' || key === 'V') {
    vibrar = !vibrar;
    vibrarLento = false;
  }
  if (key === 'l' || key === 'L') {
    vibrarLento = !vibrarLento;
    vibrar = false;
  }
  if (key === 'c' || key === 'C') { // Colores vibrantes
    colorVibrante = true;
    colorOscuro = false;
  }
  if (key === 'o' || key === 'O') { // Colores oscuros
    colorOscuro = true;
    colorVibrante = false;
  }
  if (key === 'n' || key === 'N') { // Normal
    colorVibrante = false;
    colorOscuro = false;
  }
  if (key === 'a' || key === 'A') {
    velNegro1 = -3;
    velNegro2 = -3;
  }
  if (key === 'd' || key === 'D') {
    velOtros = 3; // velocidad hacia la derecha
  }
}

function keyReleased() {
  if (key === 'a' || key === 'A') {
    velNegro1 = 0;
    velNegro2 = 0;
  }
  if (key === 'd' || key === 'D') {
    velOtros = 0;
  }
}




