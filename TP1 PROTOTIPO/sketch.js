let mic;
let imgNegro, imgAzul, imgRojo, imgAmarillo;
let imgFondo;
let imgScale = 1;
let colorFilter = false;
let currentTint;
let targetTint;

// Posiciones iniciales
let negroX = 0, negroY = 0;
let azulX = 0, azulY = 0;
let amarilloX = 0, amarilloY = 0;

function preload(){
  imgFondo = loadImage("data/texturapapel.jpg");
  imgNegro = loadImage("data/negro.png");
  imgAzul = loadImage("data/azul.png");
  imgAmarillo = loadImage("data/amarillo.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentTint = color(255, 255, 255);
  targetTint = color(255, 255, 255);
  negroX = 0; negroY = 0;
  azulX = 0; azulY = 0;
  amarilloX = 0; amarilloY = 0;
}

function draw() {
  background(90);
  image(imgFondo, 0, 0, width, height);

  // Escalado
  if (keyIsDown(32)) {
    imgScale += 0.01;
    if (imgScale > 2) imgScale = 2;
  } else {
    imgScale = 1;
  }

  // Movimiento imagen negra con flechas
  if (keyIsDown(LEFT_ARROW)) negroX -= 5;
  if (keyIsDown(RIGHT_ARROW)) negroX += 5;
  if (keyIsDown(UP_ARROW)) negroY -= 5;
  if (keyIsDown(DOWN_ARROW)) negroY += 5;

  // Movimiento azul y amarillo con WASD
  if (keyIsDown(65)) { azulX -= 5; amarilloX -= 5; } // A
  if (keyIsDown(68)) { azulX += 5; amarilloX += 5; } // D
  if (keyIsDown(87)) { azulY -= 5; amarilloY -= 5; } // W
  if (keyIsDown(83)) { azulY += 5; amarilloY += 5; } // S

  // Color suave
  currentTint = lerpColor(currentTint, targetTint, 0.05);
  tint(currentTint);

  image(imgNegro, negroX, negroY, width * imgScale, height * imgScale);
  image(imgAzul, azulX, azulY, width * imgScale, height * imgScale);
  image(imgAmarillo, amarilloX, amarilloY, width * imgScale, height * imgScale);

  noTint();
}

function keyPressed() {
  if (key === ' ') {
    colorFilter = !colorFilter;
    if (colorFilter) {
      targetTint = color(255, 100, 100);
    } else {
      targetTint = color(255, 255, 255);
    }
  }
}
