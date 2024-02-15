//Canvas with the compass
let myP51 = function(p) {
  p.setup = function() {
    let canvas2 = p.createCanvas(100, 100, p.WEBGL);
    canvas2.position(p.windowWidth / 2 + 120, p.windowHeight / 2 + 120);
    p.createEasyCam();
  }
  p.draw = function() {
    p.background(colourBackgroud);

    //Creating the compass
    p.push();
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
    p.pop();
  }
}

// Initial variables
let incidentLambdaInput, scatteredLambdaInput, photonAngle, electronAngle
let comptonEffect
let compass
let waveParticle1, waveParticle2
let colour1, colour2, colourText, theme, colourBackgroud, themeFirst
let title1, title2, title3, title4, b1, b2, b3, b4, photonParticle, electronParticle, themeTitle

// Create p5.js instance
let mySketch2 = new p5(myP51);

// Use previous values to observe which input value changed most recenlty
var prevIncLambda, prevScaLambda, prevTheta, prevPhi

/**
 * Set up of the canvas
 */
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  createEasyCam();

  // Create initial instances
  comptonEffect = new ComptonEffect();
  waveParticle1 = comptonEffect.photon1
  waveParticle2 = comptonEffect.photon2
  colourText = 255
  colourBackgroud = 255

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
  theme.selected("original")
  //themeFirst = "original"
};

/**
 * Draw particles, compass and color in the canvas
 */
function draw() {
  background(colourBackgroud);
  lights();

  // Defining the particle´s color
  //comptonEffect.photon1.colour = colour1.selected()
  //comptonEffect.photon2.colour = colour1.selected()
  //comptonEffect.electronMoving.colour = colour2.selected()

  //Defining theme
 
  themeSetUp(theme.selected())
  themeFirst = theme.selected()

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
  selector.option('red');
  selector.option('green');
  selector.option('blue');
  selector.option('yellow');
  selector.option('magenta');
  selector.option('black');

};

function setupThemeSelector(selector){
  selector.option('original');
  selector.option('dark');
  selector.option('cream');
  selector.option('pastel');
}
//Need to fix that when is first time chosen the theme, it updates
// Problem with dark entering second time


function themeSetUp(theme){
  if (theme == "dark"){
    console.log(themeFirst)
    if ((colour1.selected() == 'yellow' && colour2.selected() == 'blue') || themeFirst != "dark"){
      console.log(themeFirst)
      comptonEffect.photon1.colour = color("yellow")
      comptonEffect.photon2.colour = color("yellow")
      comptonEffect.electronMoving.colour = color("magenta")
      themeFirst = "dark"
    }else{
      console.log("here")
      comptonEffect.photon1.colour = colour1.selected()
      comptonEffect.photon2.colour = colour1.selected()
      comptonEffect.electronMoving.colour = colour2.selected()
    }
    colourBackgroud = color("black")
    colourElements(255)

  }else if(theme == "cream"){
    if ((colour1.selected() == 'yellow' && colour2.selected() == 'blue')|| themeFirst != "cream"){
      console.log("here")
      comptonEffect.photon1.colour = color("magenta")
      comptonEffect.photon2.colour = color("magenta")
      comptonEffect.electronMoving.colour = color("blue")
      themeFirst = "cream"
    }else{
      console.log("here")
      comptonEffect.photon1.colour = colour1.selected()
      comptonEffect.photon2.colour = colour1.selected()
      comptonEffect.electronMoving.colour = colour2.selected()
    }
    colourBackgroud = color(255, 253, 208)
    colourElements(0)

  }else if(theme == "pastel"){
    if (colour1.selected() == 'yellow' && colour2.selected() == 'blue'){
      console.log("here")
      comptonEffect.photon1.colour = color("yellow")
      comptonEffect.photon2.colour = color("yellow")
      comptonEffect.electronMoving.colour = color("magenta")
    }else{
      console.log("here")
      comptonEffect.photon1.colour = colour1.selected()
      comptonEffect.photon2.colour = colour1.selected()
      comptonEffect.electronMoving.colour = colour2.selected()
    }
    colourBackgroud = color(162, 192, 224)
    colourElements(0)

  }else{
    // Original theme otherwise
    if (colour1.selected() == 'yellow' && colour2.selected() == 'blue'){
      console.log("here")
      comptonEffect.photon1.colour = color("yellow")
      comptonEffect.photon2.colour = color("yellow")
      comptonEffect.electronMoving.colour = color("blue")
    }else{
      console.log("here")
      comptonEffect.photon1.colour = colour1.selected()
      comptonEffect.photon2.colour = colour1.selected()
      comptonEffect.electronMoving.colour = colour2.selected()
    }
    colourBackgroud = color("white")
    colourElements("black")
  };
};

function colourElements(elementColour){
  title1.style('color', color(elementColour));
  title2.style('color', color(elementColour));
  title3.style('color', color(elementColour));
  title4.style('color', color(elementColour));
  
  b1.style('color', color(elementColour));
  b2.style('color', color(elementColour));
  b3.style('color', color(elementColour));
  b4.style('color', color(elementColour));

  themeTitle.style('color', color(elementColour));
  photonParticle.style('color', color(elementColour));
  electronParticle.style('color', color(elementColour));

  comptonEffect.photon1.colourArrow = elementColour
  comptonEffect.photon2.colourArrow = elementColour
  comptonEffect.electronMoving.colourArrow = elementColour

}

// TODO***********
function manageInputs(input, defaultValue){
  if (input == " " || input == 0){
    console.log("here")
    return defaultValue
  } else if(input == int){

  }else{
    return input
  }

};

// TODO***********

function mouseClicked() {
  console.log('Mouse clicked at:', mouseX, mouseY);
}


