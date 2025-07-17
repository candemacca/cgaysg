let mic;
let imgBlanco, imgNegro, imgAzul, imgRojo, imgAmarillo, imgNegro2, imgAmarillo2, imgRojo2, imgAzul2;
let imgFondo;

let t = 0; //variable de tiempo para la vibración lenta

function preload(){
  imgFondo = loadImage("data/imgfondo3.jpg");
  
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
  createCanvas(windowWidth/2, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  mic.amp(1); 
  userStartAudio(); 
  fft = new p5.FFT();
  fft.setInput(mic);
}

let vibrar = false;
let vibrarLento = false;
let sonidoActivoFrames = 0;

let colorNegro = [0, 0, 0];

let colorRojo = [173, 5, 0];

let colorAmarillo = [240, 174, 0];

let colorAzul = [19, 49, 154];

let offsetNegro = 0;
let offsetColor = 0;
let velNegro = 0;
let velColor = 0;

function draw() {
  background(90);
  image(imgFondo, 0, 0, width, height);
  ellipseMode(CORNER);

  let micLevel = mic.getLevel();

  let spectrum = fft.analyze();
  let graves = fft.getEnergy("bass");
  let agudos = fft.getEnergy("treble");


if (micLevel > 0.06) { //umbral para colores saturados
  colorNegro = [250,250,250];
  colorRojo = [252,111,74];
  colorAmarillo = [254,243,103];
  colorAzul = [104,205,253];
} else if (micLevel > 0.03) { //umbral para colores apagados
  colorNegro = [0,0,0];
  colorRojo = [54,7,2];
  colorAmarillo = [117,91,0];
  colorAzul = [1,18,61];} 
  else {
  //colores normales (originales)
  colorNegro = [0, 0, 0];
  colorRojo = [173, 5, 0];
  colorAmarillo = [240, 174, 0];
  colorAzul = [19, 49, 154];
}

  if (agudos > 1) { //umbral para agudos
    velColor = 3;
  } else {
    velColor = 0;
  }
  if (graves > 110) { //umbral para graves
    velNegro = -3;
  } else {
    velNegro = 0;
  }

  t += 0.02; //incrementa el tiempo para la vibración lenta

  //vibración individual para cada imagen
  let vibNegroX, vibNegroY, vibAmarilloX, vibAmarilloY, vibRojoX, vibRojoY, vibAzulX, vibAzulY;
  

  if (vibrarLento) {
    //vibración lenta y amplia 
    vibNegroX = sin(t) * 50;
    vibNegroY = cos(t) * 50;
    vibAmarilloX = sin(t+1) * 50;
    vibAmarilloY = cos(t+1) * 50;
    vibRojoX = sin(t+2) * 50;
    vibRojoY = cos(t+2) * 50;
    vibAzulX = sin(t+3) * 50;
    vibAzulY = cos(t+3) * 50;
  
  } else if (vibrar) {
    //vibración rápida y pequeña
    vibNegroX = random(-3,3);
    vibNegroY = random(-3,3);
    
    vibAmarilloX = random(-3,3);
    vibAmarilloY = random(-3,3);
    vibRojoX = random(-3,3);
    vibRojoY = random(-3,3);
    vibAzulX = random(-3,3);
    vibAzulY = random(-3,3);
    
    
  } else {
    //sin vibración
    vibNegroX = vibNegroY  = vibAmarilloX = vibAmarilloY = vibRojoX = vibRojoY = vibAzulX = vibAzulY  = 0;
    
    
   
  }

  

 
  //posicion de las manchas con sus colores originales
tint(colorNegro);
image(imgNegro, 200 + vibNegroX + offsetNegro, 25 + vibNegroY, width, height);
image(imgNegro2, -100 + vibNegroX + offsetNegro, -150 + vibNegroY, width, height);
noTint();

tint(colorRojo);
image(imgRojo, 0 + vibRojoX + offsetColor, -100 + vibRojoY, width/2, height/2);
image(imgRojo2, 70 + vibRojoX + offsetColor, 400 + vibRojoY, width/2, height/2); 
noTint();

tint(colorAmarillo);
image(imgAmarillo, -100 + vibAmarilloX + offsetColor, 0 + vibAmarilloY, 350, height); 
image(imgAmarillo2, 300 + vibAmarilloX + offsetColor, 0 + vibAmarilloY, 350, height);
noTint();

tint(colorAzul);
image(imgAzul, -100 + vibAzulX + offsetColor, 400 + vibAzulY, width/2, height/2);
image(imgAzul2, 400 + vibAzulX + offsetColor, -180 + vibAzulY, width/2, height/2);
noTint(); 

  offsetNegro += velNegro;
  offsetColor += velColor;

  //reinicia posiciones si se salen del canvas
  if (offsetNegro < -width) {
    offsetNegro = 0;
  }
  if (offsetColor > width) {
    offsetColor = 0;
  }

//control de vibración según duración del sonido
if (micLevel > 0.06) {
  sonidoActivoFrames++;
  if (sonidoActivoFrames > 20) { 
    vibrarLento = true;
    vibrar = false;
  } else {
    vibrar = true;
    vibrarLento = false;
  }
} else {
  vibrar = false;
  vibrarLento = false;
  sonidoActivoFrames = 0;
}
}






