//Canvas with the compass
let myP51 = function(p) {
  p.setup = function() {
    let canvas2 = p.createCanvas(100, 100, p.WEBGL);
    canvas2.position(p.windowWidth / 2 + 80, p.windowHeight / 2 + 150);
    p.createEasyCam();
    xColour = "magenta"
    yColour = "green"
    zColour = "blue"
  }
  p.draw = function() {
    p.background(colourBackground);

    //Creating the compass
    p.push();
    // X-axis (red)
    p.stroke(xColour);
    p.strokeWeight(4);
    p.line(0, 0, 0, 30, 0, 0);
    
    // Y-axis (green)
    p.stroke(yColour);
    p.strokeWeight(4);
    p.line(0, 0, 0, 0, 30, 0);

    // Z-axis (blue)
    p.stroke(zColour);
    p.strokeWeight(4);
    p.line(0, 0, 0, 0, 0, 30);
    p.pop();
  }
}

// Initial variables
let incidentLambdaInput, scatteredLambdaInput, photonAngle, electronAngle
let comptonEffect
let compass
let waveParticle1, waveParticle2
let colour1, colour2, colourText, theme, colourBackground, prevTheme, xColour, yColour, zColour
let title1, title2, title3, title4, b1, b2, b3, b4, photonParticle, electronParticle, themeTitle

// Create p5.js instance  
let mySketch2 = new p5(myP51);

// Use previous values to observe which input value changed most recenlty
var prevIncLambda, prevScaLambda, prevTheta, prevPhi

/**
 * Set up of the canvas
 */
function setup() {
  let canvas2 = createCanvas(100, 100, WEBGL);
  canvas2.position(windowWidth / 2 + 80, windowHeight / 2 + 150);
  createEasyCam();

  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();
  // Create initial instances
  comptonEffect = new ComptonEffect();
  waveParticle1 = comptonEffect.photon1
  waveParticle2 = comptonEffect.photon2
  colourText = 255
  colourBackground = 255
  prevTheme = "original"

  // Input boxes
  title1 = createP("Incident Photon's Wavelength");
  title1.position(10, 0);
  incidentLambdaInput = createInput(changePowers(comptonEffect.incidentLambda), 'string');
  //incidentLambdaInput = manageInputs(incidentLambdaInput, comptonEffect.incidentLambda )
  incidentLambdaInput.position(210, 15);
  incidentLambdaInput.size(100, 15);

  title2 = createP("Scattered Photon's Wavelength");
  title2.position(10, 20);
  scatteredLambdaInput = createInput(changePowers(comptonEffect.scatteredLambda), 'string');
  scatteredLambdaInput.position(210, 35);
  scatteredLambdaInput.size(100, 15);

  title3 = createP('Theta');
  title3.position(10, 40);
  photonAngle = createInput(comptonEffect.theta, 'string');
  photonAngle.position(210, 55);
  photonAngle.size(100, 15);

  title4 = createP('Phi');
  title4.position(10, 60);
  electronAngle = createInput(comptonEffect.phi, 'string');
  electronAngle.position(210, 75);
  electronAngle.size(100, 15);

  // Units for the boxes
  b1 = createP('m');
  b1.position(325, 0);
  b2 = createP('m');
  b2.position(325, 20 );
  b3 = createP('Rad');
  b3.position(325, 40);
  b4 = createP('Rad');
  b4.position(325, 60);

  // Reference Box
  photonParticle = createP('Photon');
  photonParticle.position(10, windowHeight - 120);
  electronParticle = createP('Electron');
  electronParticle.position(10, windowHeight - 80);

  // initialise previous values
  this.prevIncLambda = parseFloat(powerReverse(incidentLambdaInput.value()));
  this.prevScaLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  this.prevTheta = parseFloat(photonAngle.value());
  this.prevPhi = parseFloat(electronAngle.value());

  // Particle's color menu
  colour1 = createSelect();
  colour1.position(70, windowHeight - 105);
  setupColourSelector(colour1);
  colour1.selected("yellow");

  colour2 = createSelect();
  colour2.position(70, windowHeight - 65);
  setupColourSelector(colour2);
  colour2.selected("blue");

  // Theme menu
  themeTitle = createP("Theme");
  themeTitle.position(windowWidth - 130,  windowHeight - 555);
  theme = createSelect();
  theme.position(windowWidth - 80,  windowHeight - 540);
  setupThemeSelector(theme);
  theme.selected("original");
};

/**
 * Draw particles, compass and color in the canvas
 */
function draw() {
  background(colourBackground);
  lights();

  // Defining the particle´s color
  //comptonEffect.photon1.colour = colour1.selected()
  //comptonEffect.photon2.colour = colour1.selected()
  //comptonEffect.electronMoving.colour = colour2.selected()

  //Defining theme
  prevTheme = themeSetUp(theme.selected(), prevTheme)
  console.log(prevTheme)

  //Update values of the input boxes

  comptonEffect.scatteredLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  comptonEffect.incidentLambda =  parseFloat(powerReverse(incidentLambdaInput.value()));
  comptonEffect.theta =  parseFloat(photonAngle.value());
  comptonEffect.phi =  parseFloat(electronAngle.value());

  if (this.prevIncLambda != comptonEffect.incidentLambda) {
    console.log("inc lambda changed")
    // User has changed incident lambda
    comptonEffect.photon1.a = getFrequency(comptonEffect.incidentLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta)
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevScaLambda != comptonEffect.scatteredLambda) {
    console.log("sca lambda changed")
    // User has changed scattered lambda
    comptonEffect.photon2.a = getFrequency(comptonEffect.scatteredLambda)
    comptonEffect.calculate_theta()
    comptonEffect.calculate_phi()

    photonAngle.value(comptonEffect.theta);
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevTheta != comptonEffect.theta) {
    console.log("theta changed")
    // User has changed theta
    comptonEffect.calculate_scatteredLambda()
    comptonEffect.calculate_phi()

    scatteredLambdaInput.value(changePowers(comptonEffect.scatteredLambda))
    electronAngle.value(comptonEffect.phi)
  }

  else if (this.prevPhi != comptonEffect.phi) {
    // User has changed phi TODO***********
  }

  comptonEffect.draw();

  // Movement of the Particle
  if (waveParticle1.progress < 1) {
    //  Make other trail disappear
    waveParticle2.progressTrail()
    waveParticle2.setHidden(true)
    waveParticle2.progress = 0

    // Progress first photon
    waveParticle1.setHidden(false)
    waveParticle1.progress += 0.01
  } else {
    if (waveParticle2.progress < 1) {
      // Make other trail disappear
      waveParticle1.progressTrail()
      waveParticle1.setHidden(true)
      waveParticle1.progress = 

      // Progress second photon
      waveParticle2.setHidden(false)
      waveParticle2.progress += 0.01

      // Move electron
      comptonEffect.electronMoving.progress += 0.01
    } else {
      waveParticle1.progress = 0
      comptonEffect.electronMoving.progress = 0
    }
  }
  
  waveParticle1.setProgress();
  waveParticle2.setProgress();
  comptonEffect.electronMoving.setProgress();

  // Save previous values
  this.prevIncLambda = parseFloat(powerReverse(incidentLambdaInput.value()));
  this.prevScaLambda = parseFloat(powerReverse(scatteredLambdaInput.value()));
  this.prevTheta = parseFloat(photonAngle.value());
  this.prevPhi = parseFloat(electronAngle.value());
};

/**
 * To change from radians to degrees
 * @param {*} rad takes radians and changes into degrees
 * @returns 
 */
function radianToDegree(rad) {
  return rad * (180 / Math.PI);
};


/**
 * To show powers 
 * @param {*} number numbers and power with e
 * @returns 
 */
function changePowers(number){
  let exponent = Math.floor(Math.log10(Math.abs(number)));
  let mantissa = number / Math.pow(10, exponent);
  let expressionString = `${mantissa} * 10^ ${exponent}`;
  return expressionString;
};

/**
 * To undo the change of powers to be able to do calculations with powers
 * @param {*} string string of numbers and power with 10
 * @returns 
 */
function powerReverse(string){
  let parts = string.split('*', 2);
  let mantissa = parseFloat(parts[0]);
  let exponent = parseFloat(parts[1].replace('10^',''));
  let result = mantissa * Math.pow(10, exponent);
  return result;
};

/**
 * Add colours to the menu
 * @param {*} selector the selector to add options to
 */
function setupColourSelector(selector) {
  options = ['red', 'green', 'blue', 'yellow', 'magenta', 'black']
  for (let i = 0; i < options.length; i++){
    selector.option(options[i]);
  };
};

function setupThemeSelector(selector){
  options = ['original', 'dark', 'cream', 'pastel']
  for (let i = 0; i < options.length; i++){
    selector.option(options[i]);
  }
};

function themeSetUp(theme, prevTheme){
  if (theme == "dark"){
    // If it is the first time the theme is chosen: setup theme colors
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
      colourElements("black", "magenta", "blue", ["yellow", "green", "blue"])
    }else{
      colourElements("black", colour1.selected(), colour2.selected(), ["yellow", "green", "blue"])
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
  };
};

function colourElements(elementColour, particle1, particle2, compass){
  let titles = [title1, title2, title3, title4];
  for (let i = 0; i < titles.length; i++){
    titles[i].style('color', color(elementColour));
  };
  let buttons = [b1, b2, b3, b4];
  for (let i = 0; i < buttons.length; i++){
    buttons[i].style('color', color(elementColour));
  };
  xColour = compass[0]
  yColour = compass[1]
  zColour = compass[2]

  themeTitle.style('color', color(elementColour));
  photonParticle.style('color', color(elementColour));
  electronParticle.style('color', color(elementColour));

  comptonEffect.photon1.colourArrow = elementColour;
  comptonEffect.photon2.colourArrow = elementColour;
  comptonEffect.electronMoving.colourArrow = elementColour;

  colour1.selected(particle1);
  comptonEffect.photon1.colour = color(particle1);
  colour1.selected(particle1);
  comptonEffect.photon2.colour = color(particle1);
  colour2.selected(particle2);
  comptonEffect.electronMoving.colour = color(particle2);
};

// TODO***********
function manageInputs(input, defaultValue){
  if (input == " " || input == 0){
    console.log("here");
    return defaultValue;
  } else if(input == int){

  }else{
    return input
  }

};

// TODO***********

function mouseClicked() {
  console.log('Mouse clicked at:', mouseX, mouseY);
}


