let myP5 = function(p) {
  p.setup = function() {
    let canvas1 = p.createCanvas(200, 200, p.WEBGL);
    canvas1.position(0,350)
    p.createEasyCam();
  }
  p.draw = function() {
    
    p.fill([255, 255, 0])
    p.lights();
    p.stroke(0)
    p.strokeWeight(0)
    p.translate(-10, -2, 0)
    p.sphere(5)
    
    p.fill([0, 0, 255])
    p.lights();
    p.stroke(0)
    p.strokeWeight(0)
    p.translate(5, 25, 0)
    p.sphere(10)
  }
}

let myP51 = function(p) {
  p.setup = function() {
  let canvas2 = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  canvas2.position(p.windowWidth / 2 - 100, p.windowHeight / 2 - 80)
  p.createEasyCam();
}
  p.draw = function() {
    p.push()
    // Set up the fixed point as the new origin
    //p.translate(this.position.x, this.position.y, this.position.z);
    //this.position.set(windowWidth / 8 - this.size, windowHeight / 8 - this.size, 0)
    
    // X-axis (red)
    p.stroke(255, 0, 0);
    p.strokeWeight(4);
    p.line(0, 0, 0, 30, 0, 0);
    

    // Y-axis (green)
    p.stroke(0, 255, 0);
    p.strokeWeight(4);
    p.line(0, 0, 0, 0, 30, 0);

    // Z-axis (blue)
    p.stroke(0, 0, 255);
    p.strokeWeight(4);
    p.line(0, 0, 0, 0, 0, 30);
    p.pop()
    
  }
}

let incidentLambdaInput, scatteredLambdaInput,photonAngle, electronAngle

let comptonEffect
let compass
let waveParticle1, waveParticle2
// Create a p5.js instance
let mySketch = new p5(myP5);
// Create a p5.js instance
let mySketch2 = new p5(myP51);


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  
  comptonEffect = new ComptonEffect();
  waveParticle1 = new Waveparticle(-100, 0, 0, 0, 0, 0, 10, 30);
  waveParticle2 = new Waveparticle(0, 0, 0, 50, -100, 0, 10, 30);

  // Input boxes
  let title1 = createP("Incident Photon's Wavelength");
  title1.position(windowWidth / 160,  windowHeight - 555);
  incidentLambdaInput = createInput(changePowers(comptonEffect.incidentLambda), 'string');
  incidentLambdaInput.position(windowWidth / 160 + 200,  windowHeight - 540);
  incidentLambdaInput.size(100, 15);
  
  let title2 = createP("Scattered Photon's Wavelength");
  title2.position(windowWidth / 160,  windowHeight - 535);
  scatteredLambdaInput = createInput(changePowers(comptonEffect.scatteredLambda), 'string');
  scatteredLambdaInput.position(windowWidth / 160 + 205,  windowHeight - 520);
  scatteredLambdaInput.size(100, 15);
  
  let title3 = createP('Theta');
  title3.position(windowWidth / 160,  windowHeight - 515);
  photonAngle = createInput(0, 'number');
  photonAngle.position(windowWidth / 160 + 40,  windowHeight - 500);
  photonAngle.size(100, 15);


  let title4 = createP('Phi');
  title4.position(windowWidth / 80,  windowHeight - 495);
  electronAngle = createInput(0, 'number');
  electronAngle.position(windowWidth / 80 + 30,  windowHeight - 480);
  electronAngle.size(100, 15);
  

  // Units for the boxes
  let b1 = createP('m');
  b1.position(windowWidth / 80 + 315,  windowHeight - 555);
  let b2 = createP('m');
  b2.position(windowWidth / 80 + 320 , windowHeight - 535);
  let b3 = createP('Rad');
  b3.position(windowWidth / 80 + 150, windowHeight - 515);
  let b4 = createP('Rad');
  b4.position(windowWidth / 80 + 140, windowHeight - 495);

  // Reference Box

  let photonParticle = createP('Photon');
  photonParticle.position(windowWidth / 60, windowHeight - 120);

  let electronParticle = createP('Electron');
  electronParticle.position(windowWidth / 60, windowHeight - 80);

}

function draw() {
  background(255);
  lights();
  
   // Set up the compass in the right bottom of the screen
  
  // compass.draw();
  
  comptonEffect.scatteredLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  comptonEffect.incidentLambda =  parseFloat(powerReverse(incidentLambdaInput.value()));
  
  comptonEffect.calculate();
  
  photonAngle.value(comptonEffect.theta);
  
  comptonEffect.draw();
  

  if(waveParticle1.progress < 1) {
    waveParticle1.progress += 0.01
  }else{
    waveParticle1.progress = 0
  }
  waveParticle1.setProgress();
  waveParticle1.show();

  if(waveParticle2.progress < 1) {
    waveParticle2.progress += 0.01
  }else{
    waveParticle2.progress = 0
  }
  waveParticle2.setProgress();
  waveParticle2.show();
  
}

function radianToDegree(rad) {
  return rad * (180 / Math.PI)
}

// To show powers 
function changePowers(number){
  let exponent = Math.floor(Math.log10(Math.abs(number)));
  let mantissa = number / Math.pow(10, exponent);
  let expressionString = `${mantissa} * 10^ ${exponent}`
  return expressionString
};

function powerReverse(string){
  console.log(string)
  let parts = string.split('*', 2);
  let mantissa = parseFloat(parts[0]);
  let exponent = parseFloat(parts[1].replace('10^',''));
  let result = mantissa * Math.pow(10, exponent);
  return result;
}
