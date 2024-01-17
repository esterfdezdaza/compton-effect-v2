let incidentLambdaInput, scatteredLambdaInput,photonAngle, electronAngle

let comptonEffect
let compass


function setup() {
  createCanvas(400, 400, WEBGL);
  createEasyCam();
  
  comptonEffect = new ComptonEffect();
  compass = new Compass();

  // Input boxes
  incidentLambdaInput = createInput(changePowers(comptonEffect.incidentLambda), 'string');
  incidentLambdaInput.position(0, 0);
  incidentLambdaInput.size(100, 15);

  scatteredLambdaInput = createInput(changePowers(comptonEffect.scatteredLambda), 'string');
  scatteredLambdaInput.position(0, 20);
  scatteredLambdaInput.size(100, 15);

  photonAngle = createInput(0, 'number');
  photonAngle.position(0, 40);
  photonAngle.size(100, 15);

  electronAngle = createInput(0, 'number');
  electronAngle.position(0, 60);
  electronAngle.size(100, 15);


  // Units for the boxes
  let b1 = createP('m');
  b1.position(110, -15);
  let b2 = createP('m');
  b2.position(110, 5);
  let b3 = createP('Rad');
  b3.position(110, 25);
  let b4 = createP('Rad');
  b4.position(110, 45);
}

function draw() {
  background(255);
  lights();

   // Set up the compass in the right bottom of the screen
  compass.drawCompass();
  
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
