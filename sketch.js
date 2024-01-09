
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
  
  h = 6.626 * pow(10, -34)
  me = 9.11 * pow(10, -31)
  c = 3 * pow(10, 8)

  mul = (me*c)/h
  ilambda = 1.441 * pow(10, -12)
  slambda = 2 * pow(10, -12)

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
  
  console.log(scatteredLambdaInput.value())
  console.log(parseFloat(scatteredLambdaInput.value()))

  photon1 = new Sphere(-50, 0, 0, 0, [255, 255, 0])
  photon2 = new Sphere(25, 0, 0, 0, [255, 255, 0])
  electron1 = new Sphere(0, 0, 0, 0, [0, 0, 255])
  electron2 = new Sphere(25, 25, 0, 0, [0, 0, 255])
}

function draw() {
  background(0);
  lights()
  
  scatteredLambda = parseFloat(scatteredLambdaInput.value())
  incidentLambda =  parseFloat(incidentLambdaInput.value())
  
  let smtg = ((scatteredLambda - incidentLambda) * mul)
  console.log(smtg)
  smtg.toPrecision(5)
  let theta = acos(smtg - 1)
  console.log(theta)
  theta.toPrecision(5)

  electronAngle.value()
  photonAngle.value(theta)
  photon2.theta = - theta

  photon1.show()
  photon2.show()
  electron1.show()
  electron2.show()
}
