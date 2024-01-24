let incidentLambdaInput, scatteredLambdaInput,photonAngle, electronAngle

let comptonEffect
let compass


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  
  comptonEffect = new ComptonEffect();
  compass = new Compass();

  // Input boxes
  let title1 = createP("Incident Photon's Wavelength");
  title1.position(windowWidth / 80,  windowHeight - 555);
  incidentLambdaInput = createInput(changePowers(comptonEffect.incidentLambda), 'string');
  incidentLambdaInput.position(windowWidth / 80 + 200,  windowHeight - 540);
  incidentLambdaInput.size(100, 15);
  
  let title2 = createP("Scattered Photon's Wavelength");
  title2.position(windowWidth / 80,  windowHeight - 535);
  scatteredLambdaInput = createInput(changePowers(comptonEffect.scatteredLambda), 'string');
  scatteredLambdaInput.position(windowWidth / 80 + 205,  windowHeight - 520);
  scatteredLambdaInput.size(100, 15);
  
  let title3 = createP('Theta');
  title3.position(windowWidth / 80,  windowHeight - 515);
  photonAngle = createInput(0, 'number');
  photonAngle.position(windowWidth / 80 + 40,  windowHeight - 500);
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
  photonParticle.position(windowWidth / 60, windowHeight - 110);

  let electronParticle = createP('Electron');
  electronParticle.position(windowWidth / 60, windowHeight - 90);



}

function draw() {
  background(255);
  lights();
  
   // Set up the compass in the right bottom of the screen
  
  compass.draw();
  
  comptonEffect.scatteredLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  comptonEffect.incidentLambda =  parseFloat(powerReverse(incidentLambdaInput.value()));
  
  comptonEffect.calculate();
  
  photonAngle.value(comptonEffect.theta);
  
  comptonEffect.draw();

  
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
