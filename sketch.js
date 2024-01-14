
let photon1
let photon2
let electron1
let electron2

let eEnergy, incidentLambda, scatteredLambda, photonAngle, electronAngle, incidentLambdaInput, scatteredLambdaInput

let h, me, c
let mul, ilambda, slambda

function setup() {
  createCanvas(400, 400, WEBGL);
  createEasyCam()
  
  // Compton Effect formula variables 
  h = 6.626 * pow(10, -34)
  me = 9.11 * pow(10, -31)
  c = 3 * pow(10, 8)

  mul = (me*c)/h
  ilambda = 1.441 * pow(10, -12)
  slambda = 2 * pow(10, -12)

  // Input boxes
  eEnergy = createInput(mul, 'number')
  eEnergy.position(0, 0)
  incidentLambdaInput = createInput(ilambda, 'number')
  incidentLambdaInput.position(0, 20)
  scatteredLambdaInput = createInput(slambda, 'number')
  scatteredLambdaInput.position(0, 40)
  photonAngle = createInput(0, 'number')
  photonAngle.position(0, 60)
  electronAngle = createInput(0, 'number')
  electronAngle.position(0, 80)
  
  
  // Spheres positions

  photon1 = new Sphere(-50, 0, 0, 0, [255, 255, 0])
  photon2 = new Sphere(25, 0, 0, 0, [255, 255, 0])
  electron1 = new Sphere(0, 0, 0, 0, [0, 0, 255])
  electron2 = new Sphere(25, 25, 0, 0, [0, 0, 255])
}

function draw() {
  background(0);
  lights()
  
  /* Compton Effect calculations 
  theta = ((lambda' - lambda) * (me*c)/h ) - 1 
  */

  scatteredLambda = parseFloat(scatteredLambdaInput.value())
  incidentLambda =  parseFloat(incidentLambdaInput.value())
  
  let leftEquation = ((scatteredLambda - incidentLambda) * mul)
  leftEquation.toPrecision(5)

  let theta = acos(leftEquation - 1)
  theta.toPrecision(5)

  electronAngle.value()
  photonAngle.value(theta)
  photon2.theta = radianToDegree(- theta)

  /*
  // Get coordinates of the particles
  let particles = [photon1, electron1, electron2]
  for (const coordinate of particles){
    console.log([...coordinate.getCoordinates()]);
  }
  */

  // Connecting 
  //draw3DTriangle();

  // Showing elements in the screen
  photon1.show()
  photon2.show()
  electron1.show()
  electron2.show()
}

function radianToDegree(rad) {
  return rad * 180 / PI
}

function draw3DTriangle() {
  // Set stroke color for edges
  stroke(0);

  // Set no fill for the shape
  noFill();

  // Begin the shape
  beginShape();

  // Define vertices of the triangle
  let particles = [photon1, electron1, electron2]
  for (const coordinate of particles){
    console.log([...coordinate.getCoordinates()]);
    vertex([...coordinate.getCoordinates()])
  }


  // End the shape
  endShape(CLOSE);
}

