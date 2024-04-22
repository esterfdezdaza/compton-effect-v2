// Initial variables
let incidentLambdaInput, scatteredLambdaInput, photonAngle, electronAngle
let comptonEffect
let waveParticle1, waveParticle2
let colour1, colour2, colourText, theme, colourBackground, prevTheme
let title1, title2, title3, title4, b1, b2, b3, b4, photonParticle, electronParticle, themeTitle
let caption // The text right below the visualisation providing some more detail about what is visible
let camera
let font
let compasAxisCheckbox

// Use previous values to observe which input value changed most recenlty
var prevIncLambda, prevScaLambda, prevTheta, prevPhi

function preload() {
  font = loadFont("Montserrat-Regular.ttf")
}

/**
 * Set up of the canvas and its elements
 */
function setup() {
  // Set up normal canvas
  createCanvas(windowWidth, windowHeight, WEBGL)
  camera = createEasyCam()
  
  // Create initial instances
  comptonEffect = new ComptonEffect()
  waveParticle1 = comptonEffect.photon1
  waveParticle2 = comptonEffect.photon2
  colourText = 0
  colourBackground = 255
  prevTheme = "original"

  // Input boxes
  title1 = createP("Incident Photon's Wavelength")
  title1.position(10, 0)
  incidentLambdaInput = createSlider(0.01, 9.99, 2, 0.01)
  incidentLambdaInput.elt.setAttribute("id", "slider")
  incidentLambdaInput.position(210, 15)
  incidentLambdaInput.size(100, 15)

  title2 = createP("Scattered Photon's Wavelength")
  title2.position(10, 20)
  scatteredLambdaInput = createSlider(0.01, 9.99, 3.41, 0.01)
  scatteredLambdaInput.elt.setAttribute("id", "slider1")
  scatteredLambdaInput.position(210, 35)
  scatteredLambdaInput.size(100, 15)

  title3 = createP('Theta')
  title3.position(10, 40)
  photonAngle = createSlider(0.001, 9.99, comptonEffect.theta, 0.01)
  photonAngle.elt.setAttribute("id", "slider2")
  photonAngle.position(210, 55)
  photonAngle.size(100, 15)

  title4 = createP('Phi')
  title4.position(10, 60)
  electronAngle = createSlider(0, 9.99, comptonEffect.phi, 0.01)
  electronAngle.elt.setAttribute("id", "slider3")
  electronAngle.position(210, 75)
  electronAngle.size(100, 15)

  // Units for the boxes
  b1 = createP(incidentLambdaInput.value() + ' * 10 ^ -12 m')
  b1.position(325, 0)
  b2 = createP(scatteredLambdaInput.value() + ' * 10 ^ -12 m')
  b2.position(325, 20 )
  b3 = createP(photonAngle.value() + ' Rad')
  b3.position(325, 40)
  b4 = createP(electronAngle.value() + ' Rad')
  b4.position(325, 60)

  // Reference Box
  photonParticle = createP('Photon')
  photonParticle.position(10, windowHeight - 120)
  electronParticle = createP('Electron')
  electronParticle.position(10, windowHeight - 80)

  // Initialise previous values
  this.prevIncLambda = parseFloat((incidentLambdaInput.value()) * Math.pow(10, -12))
  this.prevScaLambda = parseFloat((scatteredLambdaInput.value()) * Math.pow(10, -12))
  this.prevTheta = parseFloat(photonAngle.value())
  this.prevPhi = parseFloat(electronAngle.value())

  // Particle's color menu
  colour1 = createSelect()
  colour1.position(70, windowHeight - 105)
  setupColourSelector(colour1)
  colour1.selected("yellow")

  colour2 = createSelect()
  colour2.position(70, windowHeight - 65)
  setupColourSelector(colour2)
  colour2.selected("blue")

  // Theme menu
  themeTitle = createP("Theme")
  themeTitle.position(windowWidth - 200, 15)
  theme = createSelect()
  theme.position(windowWidth - 150, 30)
  setupThemeSelector(theme)
  theme.selected("original")

  // Checkbox
  compasAxisCheckbox = createCheckbox("Axis")
  compasAxisCheckbox.position(windowWidth - 180, windowHeight - 100)

  // Set up caption
  caption = createP("Photon approximates to the outer layers of an atom")
  caption.position(windowWidth/2 - 150, 550)

  // Button
  let refreshButton = createButton("↻")
  refreshButton.position(windowWidth - 70, 27)
  refreshButton.mousePressed(() => {
    location.reload(true)
  })
}

/**
 * Draw particles, compass and colour menus in the canvas
 */
function draw() {
  // Functionality main canvas
  background(colourBackground)
  lights()

  // Defining theme and colors
  prevTheme = themeSetUp(theme.selected(), prevTheme)
  // Drawing compass
  createCompass(compasAxisCheckbox.checked())

  // Update values of the input boxes plus handling error
  let newScatteredLambda = scatteredLambdaInput.value() * Math.pow(10, -12)
  if (!isNaN(newScatteredLambda)) {
    comptonEffect.scatteredLambda = newScatteredLambda
  }
  let newIncidentLambda = incidentLambdaInput.value() * Math.pow(10, -12)
  if (!isNaN(newIncidentLambda)) {
    comptonEffect.incidentLambda = newIncidentLambda
  }
  let newTheta = parseFloat(photonAngle.value())
  if (!isNaN(newTheta)) {
    comptonEffect.theta = newTheta
  }
  let newPhi = parseFloat(electronAngle.value())
  if (!isNaN(newPhi)) {
    comptonEffect.phi = newPhi
  }
  if (isNaN(newScatteredLambda) || isNaN(newIncidentLambda) || isNaN(newTheta) || isNaN(newPhi)) {
    return
  }
  if (this.prevIncLambda != comptonEffect.incidentLambda) {
    // User has changed incident lambda
    comptonEffect.photon1.a = getFrequency(comptonEffect.incidentLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta)
    electronAngle.value(comptonEffect.phi)
  } else if (this.prevScaLambda != comptonEffect.scatteredLambda) {
    // User has changed scattered lambda
    comptonEffect.photon2.a = getFrequency(comptonEffect.scatteredLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta)
    electronAngle.value(comptonEffect.phi)
  } else if (this.prevTheta != comptonEffect.theta) {
    // User has changed theta
    comptonEffect.calculate_scatteredLambda()
    comptonEffect.photon2.a = getFrequency(comptonEffect.scatteredLambda)
    comptonEffect.calculate_phi()

    scatteredLambdaInput.value(comptonEffect.scatteredLambda)
    electronAngle.value(comptonEffect.phi)
  } else if (this.prevPhi != comptonEffect.phi) {
    // User has changed phi 
    comptonEffect.calculate_theta_phi()
    comptonEffect.calculate_scatteredLambda()
    comptonEffect.photon2.a = getFrequency(comptonEffect.scatteredLambda)

    photonAngle.value(comptonEffect.theta)
    scatteredLambdaInput.value(comptonEffect.scatteredLambda)
  }

  // Update text next to the sliders
  b1.html(powertoDecimal(comptonEffect.incidentLambda) + " m")
  b2.html(powertoDecimal(comptonEffect.scatteredLambda) + " m")
  b3.html(comptonEffect.theta + " Rad")
  b4.html(comptonEffect.phi + " Rad")

  comptonEffect.draw()

  // Movement of the Particle
  if (waveParticle1.progress < 1) {
    // Make other trail disappear
    waveParticle2.progressTrail()
    waveParticle2.setHidden(true)
    waveParticle2.progress = 0

    // Progress first photon
    waveParticle1.setHidden(false)
    waveParticle1.progress += 0.01

    // Change caption
    if (waveParticle1.progress == 0.01) {
      caption.html("Photon approximates to the outer layers of an atom.")
      caption.position(windowWidth/2 - 150, windowHeight - 100)
    }

  } else {
    if (waveParticle2.progress < 1) {
      // Change caption
      if (waveParticle2.progress == 0) {
        caption.html("BANG !")
        caption.position(windowWidth/2, windowHeight - 100)
      }
      // Make other trail disappear
      waveParticle1.progressTrail()
      waveParticle1.setHidden(true)

      // Progress second photon
      waveParticle2.setHidden(false)
      waveParticle2.progress += 0.01

      // Change caption
      if (waveParticle2.progress > 0.15) {
        caption.html("New photon with less energy and momentum is produced and an electron is scattered.")
        caption.position(windowWidth/2 - 250, windowHeight - 100)
      }
      // Move electron
      comptonEffect.electronMoving.progress += 0.01
    } else {
      waveParticle1.progress = 0
      comptonEffect.electronMoving.progress = 0
    }
  }
  
  waveParticle1.setProgress()
  waveParticle2.setProgress()
  comptonEffect.electronMoving.setProgress()

  // Save previous values
  this.prevIncLambda = powertoLetter(powertoDecimal(incidentLambdaInput.value() * Math.pow(10, -12)))
  this.prevScaLambda = powertoLetter(powertoDecimal(scatteredLambdaInput.value() * Math.pow(10, -12)))
  this.prevTheta = parseFloat(photonAngle.value())
  this.prevPhi = parseFloat(electronAngle.value())
}

/**
 * To change from radians to degrees
 * @param {*} rad takes radians and changes into degrees
 * @returns 
 */
function radianToDegree(rad) {
  return rad * (180 / Math.PI)
}

/**
 * To show powers 
 * @param {*} number numbers and power with e notation
 * @returns 
 */
function powertoDecimal(number){
  let exponent = Math.floor(Math.log10(Math.abs(number)))
  let firstPat = number / Math.pow(10, exponent)
  let expressionString = `${firstPat} * 10^ ${exponent}`
  return expressionString
}

/**
 * To transform a string representing a number in scientific notation (e.g. 1.5*10^2) into a number
 * @param {*} string the string representing the number in scientific notation
 * @returns 
 */
function powertoLetter(string) {
  try {
    let parts = string.split('*', 2)
    let number = parseFloat(parts[0])
    let exponent = parseFloat(parts[1].replace('10^',''))
    let result = number * Math.pow(10, exponent)
    return result
  } catch {
    return NaN
  }
}

/**
 * Add colours to the menu
 * @param {*} selector the selector to add options to
 */
function setupColourSelector(selector) {
  options = ['red', 'green', 'blue', 'yellow', 'magenta', 'black']
  for (let i = 0; i < options.length; i++){
    selector.option(options[i])
  }
}
/**
 * Add colours to the menu
 * @param {*} selector the selector to add options to
 */
function setupThemeSelector(selector){
  options = ['original', 'dark', 'cream', 'pastel']
  for (let i = 0; i < options.length; i++){
    selector.option(options[i])
  }
}
/**
 * 
 * @param {*} theme Name of the new theme
 * @param {*} prevTheme Name of the old theme
 * @returns the new theme
 */
function themeSetUp(theme, prevTheme){
  if (theme == "dark"){
    // If it is the first time the theme is chosen: setup theme coluors
    if (prevTheme != "dark"){
      colourElements(255, "yellow", "magenta", ["yellow", "green", "blue"])
    // Otherwise theme is the same, so you can choose any color for now
    }else{
      colourElements(255, colour1.selected(), colour2.selected(), ["yellow", "green", "blue"])
    }
    colourBackground = color("black")
    return "dark"

  }else if(theme == "cream"){
    if (prevTheme != "cream"){
      colourElements("black", "magenta", "blue", ["magenta", "green", "blue"])
    }else{
      colourElements("black", colour1.selected(), colour2.selected(), ["magenta", "green", "blue"])
    }
    colourBackground = color(255, 253, 208)
    return "cream"

  }else if(theme == "pastel"){
    if (prevTheme != "pastel"){
      colourElements(0, "yellow", "magenta", ["magenta", "green", "yellow"])
    }else{
      colourElements("black", colour1.selected(), colour2.selected(), ["magenta", "green", "yellow"])
    }
    colourBackground = color(162, 192, 224)
    return "pastel"

  // Original theme otherwise
  }else{
    if (prevTheme != "original"){
      colourElements("black", "yellow", "blue", ["magenta", "green", "blue"])
    }else{
      colourElements("black", colour1.selected(), colour2.selected(), ["magenta", "green", "blue"])
    }
    colourBackground = color("white")
    return "original"
  }
}

/**
 * 
 * @param {*} elementColour pre-set colour
 * @param {*} particle1 particle to change colour
 * @param {*} particle2 particle to change colour
 */
function colourElements(elementColour, particle1, particle2){
  // Text colour
  colourText = elementColour
  
  caption.style('color', color(colourText))

  let titles = [title1, title2, title3, title4]
  for (let i = 0; i < titles.length; i++){
    titles[i].style('color', color(elementColour))
  }
  let buttons = [b1, b2, b3, b4]
  for (let i = 0; i < buttons.length; i++){
    buttons[i].style('color', color(elementColour))
  }

  compasAxisCheckbox.style('color', color(elementColour))
  themeTitle.style('color', color(elementColour))
  photonParticle.style('color', color(elementColour))
  electronParticle.style('color', color(elementColour))

  // Arrows' colour
  comptonEffect.photon1.colourArrow = elementColour
  comptonEffect.photon2.colourArrow = elementColour
  comptonEffect.electronMoving.colourArrow = elementColour

  // Particles' colour
  colour1.selected(particle1)
  comptonEffect.photon1.colour = color(particle1)
  colour1.selected(particle1)
  comptonEffect.photon2.colour = color(particle1)
  colour2.selected(particle2)
  comptonEffect.electronMoving.colour = color(particle2)
}
/**
 * 
 * @param {*} value number to verify if it is a value or a NaaN
 * @returns True/False whether it is a Number or NaN
 */
function isNumber(value) {
  return !isNaN(value) && value === 'number'
}
/**
 * 
 * @param {*} drawAxisText creates compass and shows axix if box is selected
 */
function createCompass(drawAxisText){
  stroke(colourText)
  strokeWeight(5)
  line(0, 90, 0, -90)
  line(10, 90, -10, 90)
  line(10, -90, -10, -90)

  if(drawAxisText){
    textSize(10)
    fill(colourText)
    stroke(3)
    textFont(font)
    text("y", 14, 90)
  }
}


