let eEnergy, incidentLambda, scatteredLambda, photonAngle, electronAngle, incidentLambdaInput, scatteredLambdaInput

let h, me, c
let mul, ilambda, slambda

let comptonEffect

function setup() {
  createCanvas(400, 400, WEBGL);
  createEasyCam()
  
  comptonEffect = new ComptonEffect()

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
}

function draw() {
  background(0);
  lights()

  comptonEffect.scatteredLambda = parseFloat(scatteredLambdaInput.value())
  comptonEffect.incidentLambda =  parseFloat(incidentLambdaInput.value())

  comptonEffect.calculate()

  photonAngle.value(comptonEffect.theta)
  comptonEffect.draw()
}

function radianToDegree(rad) {
  return rad * 180 / PI
}
