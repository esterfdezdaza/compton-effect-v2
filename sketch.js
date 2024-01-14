let incidentLambdaInput, scatteredLambdaInput,photonAngle, electronAngle

let comptonEffect


function setup() {
  createCanvas(400, 400, WEBGL);
  createEasyCam()
  
  comptonEffect = new ComptonEffect()


  // Input boxes
  incidentLambdaInput = createInput(comptonEffect.incidentLambda, 'number');
  incidentLambdaInput.position(0, 0);
  incidentLambdaInput.size(100, 15);

  scatteredLambdaInput = createInput(comptonEffect.scatteredLambda, 'number');
  scatteredLambdaInput.position(0, 20);
  scatteredLambdaInput.size(100, 15);

  photonAngle = createInput(0, 'number');
  photonAngle.position(0, 40);
  photonAngle.size(100, 15);

  electronAngle = createInput(0, 'number');
  electronAngle.position(0, 60);
  electronAngle.size(100, 15);


  // Units
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
   let compassSize = 100;
   let compassPosition = createVector(width / 2 - compassSize, height / 2 - compassSize, 0);
   drawCompass(compassPosition, compassSize);
  

  comptonEffect.scatteredLambda = parseFloat(scatteredLambdaInput.value());
  comptonEffect.incidentLambda =  parseFloat(incidentLambdaInput.value());

  comptonEffect.calculate();

  photonAngle.value(comptonEffect.theta);
  comptonEffect.draw();
}

function radianToDegree(rad) {
  return rad * 180 / PI
}

function drawCompass(position, size) {
  push();
  translate(position.x, position.y, position.z);

  // X-axis (red)
  stroke(255, 0, 0);
  line(0, 0, 0, size, 0, 0);

  // Y-axis (green)
  stroke(0, 255, 0);
  line(0, 0, 0, 0, size, 0);

  // Z-axis (blue)
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, size);

  // Draw arrows at the ends of the axes
  drawArrow(createVector(size, 0, 0), createVector(10, 0, 0));
  drawArrow(createVector(0, size, 0), createVector(0, 10, 0));
  drawArrow(createVector(0, 0, size), createVector(0, 0, 10));

  pop();
}


function drawArrow(base, vec) {
  push();
  translate(base.x, base.y, base.z);
  line(0, 0, 0, vec.x, vec.y, vec.z);
  rotateArrow(vec);
  line(0, 0, 0, -8, -8, 0);
  line(0, 0, 0, -8, 8, 0);
  pop();
}

function rotateArrow(vec) {
  let sigma = atan2(vec.y, vec.x);
  let phi = atan2(sqrt(vec.x * vec.x + vec.y * vec.y), vec.z);
  rotate(sigma, 0, phi);
}

