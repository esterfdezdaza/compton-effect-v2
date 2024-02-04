let myP5 = function(p) {
  p.setup = function() {
    let canvas1 = p.createCanvas(200, 200);
    canvas1.position(0,350)
  }
  p.draw = function() {
    
    p.fill([255, 255, 0])
    p.stroke(0)
    p.strokeWeight(0)
    p.circle(100, 105, 5)
    
    p.fill([0, 0, 255])
    p.stroke(0)
    p.strokeWeight(0)
    p.circle(100, 145, 10)
    
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

let incidentLambdaInput, scatteredLambdaInput, photonAngle, electronAngle
let comptonEffect
let compass
let waveParticle1, waveParticle2
// Create a p5.js instance
let mySketch = new p5(myP5);
// Create a p5.js instance
let mySketch2 = new p5(myP51);

// use previous values to observe which input value changed most recenlty
var prevIncLambda, prevScaLambda, prevTheta, prevPhi


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  
  comptonEffect = new ComptonEffect();
  waveParticle1 = comptonEffect.photon1
  waveParticle2 = comptonEffect.photon2

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
  photonAngle = createInput(Math.PI / 3, 'string');
  photonAngle.position(windowWidth / 160 + 40,  windowHeight - 500);
  photonAngle.size(100, 15);


  let title4 = createP('Phi');
  title4.position(windowWidth / 80,  windowHeight - 495);
  electronAngle = createInput(Math.PI / 3, 'string');
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

  // initialise previous values
  // this.prevIncLambda = comptonEffect.incidentLambda
  // this.prevScaLambda = comptonEffect.scatteredLambda
  // this.prevTheta = comptonEffect.theta
  // this.prevPhi = comptonEffect.phi
  this.prevIncLambda = parseFloat(powerReverse(incidentLambdaInput.value()));
  this.prevScaLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  this.prevTheta = parseFloat(photonAngle.value());
  this.prevPhi = parseFloat(electronAngle.value());
}

function draw() {
  background(255);
  lights();
  
  comptonEffect.scatteredLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  comptonEffect.incidentLambda =  parseFloat(powerReverse(incidentLambdaInput.value()));
  comptonEffect.theta =  parseFloat(photonAngle.value());
  comptonEffect.phi =  parseFloat(electronAngle.value());

  if (this.prevIncLambda != comptonEffect.incidentLambda) {
    console.log("inc lambda changed")
    // user has changed incident lambda
    comptonEffect.photon1.a = getFrequency(comptonEffect.incidentLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta)
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevScaLambda != comptonEffect.scatteredLambda) {
    console.log("sca lambda changed")
    // user has changed scattered lambda
    comptonEffect.photon2.a = getFrequency(comptonEffect.scatteredLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta);
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevTheta != comptonEffect.theta) {
    console.log("theta changed")
    // user has changed theta
    comptonEffect.calculate_scatteredLambda()
    comptonEffect.calculate_phi()

    scatteredLambdaInput.value(changePowers(comptonEffect.scatteredLambda))
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevPhi != comptonEffect.phi) {
    // user has changed phi
  }

  // comptonEffect.calculate();

  
  // Updating angles' values

  // photonAngle.value(comptonEffect.theta);
  // electronAngle.value(comptonEffect.phi)
  
  comptonEffect.draw();
  
  // Movement of the Particle
  
  if (waveParticle1.progress < 1) {
    // make other trail disappear
    waveParticle2.progressTrail()
    waveParticle2.setHidden(true)
    waveParticle2.progress = 0

    // progress first photon
    waveParticle1.setHidden(false)
    waveParticle1.progress += 0.01
  } else {
    if (waveParticle2.progress < 1) {
      // make other trail disappear
      waveParticle1.progressTrail()
      waveParticle1.setHidden(true)
      waveParticle1.progress = 

      // progress second photon
      waveParticle2.setHidden(false)
      waveParticle2.progress += 0.01

      // move electron
      comptonEffect.electronMoving.progress += 0.01
    } else {
      waveParticle1.progress = 0
      comptonEffect.electronMoving.progress = 0
  }
  }
  waveParticle1.setProgress();
  waveParticle2.setProgress();
  comptonEffect.electronMoving.setProgress();

  // save previous values
  this.prevIncLambda = parseFloat(powerReverse(incidentLambdaInput.value()));
  this.prevScaLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  this.prevTheta = parseFloat(photonAngle.value());
  this.prevPhi = parseFloat(electronAngle.value());
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
  let parts = string.split('*', 2);
  let mantissa = parseFloat(parts[0]);
  let exponent = parseFloat(parts[1].replace('10^',''));
  let result = mantissa * Math.pow(10, exponent);
  return result;
}

