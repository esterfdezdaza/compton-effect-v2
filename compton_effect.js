class ComptonEffect {
    constructor() {
        this.photon1 = new  Waveparticle(-100, 0, 0, 0, 0, 0, 10, 30, 0);
        this.photon2 = new Waveparticle(0, 0, 0, 50, -100, 0, 10, 30, 0);
        this.electronMoving = new LinearMovementParticle(0, 0, 0, 50, 100, 0)
        this.scatteredLambda = 3.41 * Math.pow(10, -12)
        this.incidentLambda = 2 * Math.pow(10, -12)
        this.theta = Math.PI / 3            // 60º in theory but in practice 65º
        this.phi = Math.PI / 12             // 15,5758º in practice that has been rounded to 15º for the example
        this.h = 6.626 * Math.pow(10, -34)  // Plank's Constant
        this.me = 9.11 * Math.pow(10, -31)  // Electron's mass
        this.c = 3 * Math.pow(10, 8)        // Light speed
        this.staticVariable = (this.me*this.c)/this.h
    };

    /**
     * Shows the particles
     */
    draw() {
        // Set up for movement
        let arrowLength = 100
        this.photon2.end = createVector(arrowLength * cos(this.theta), arrowLength * -sin(this.theta))
        this.electronMoving.end = createVector(arrowLength * cos(this.phi), arrowLength * sin(this.phi))
        // Show particles
        this.photon1.show()
        this.photon2.show()
        this.electronMoving.show()
    };

    /**
     * Calculates Compton's Effect formula for the angle of the scattered photon
     */
    calculate_theta() {
        // theta = acos( 1 - ((lambda' - lambda) * (me*c)/h ) ) 
        let theta = acos(1 - (this.scatteredLambda - this.incidentLambda) * (this.me * this.c) / this.h)
        if (!isNaN(theta)) {
            this.theta = theta // In rad
        }

        console.log("Calculated theta: " + theta + " (rad), " + radianToDegree(theta) + " (deg)")
    };

    /**
     * Calculates then angle phi
     */
    calculate_phi() {
        // phi = arcot( 1 + h/(me*c*lambda)) * tan( theta/ 2 ) )
        let rightEquation2 = Math.atan(1 / (1 + (this.h / (this.me * this.c * this.incidentLambda))))
        let phi = rightEquation2 * Math.tan( this.theta / 2 )
        if (!isNaN(phi)) {
            this.phi = phi.toPrecision(5)
        }
        console.log("Calculated phi: " + phi + ", in degrees: " + radianToDegree(phi))
    };
    
    /**
     * Calculates Compton's Effect formula for the Incident Lambda
     */
    calculate_incidentLambda() {
        // lambda = (h/(me*c))(1 - cos(theta))) - lambda'
        let leftEquation = (1 - Math.cos(this.theta))
        let incidentLambda = ((1/this.staticVariable) * leftEquation) - this.scatteredLambda
        if (!isNaN(incidentLambda)) {
            this.incidentLambda = incidentLambda
        }
    };
    
    /**
     * Calculates Compton's Effect formula for the Scattered Lambda
     */
    calculate_scatteredLambda() {
        // lambda' = (h/(me*c))(1 - cos(theta))) + lambda
        let rightEquation4 = (1 - Math.cos(this.theta))
        let scatteredLambda = ((1/this.staticVariable) * rightEquation4) + this.incidentLambda
        if (!isNaN(scatteredLambda)) {
            this.scatteredLambda = scatteredLambda
            this.photon2.a = getFrequency(scatteredLambda)
        }
    };
};

/**
 * Returns a number for the particle's speed
 */
function getFrequency(nmValue) {
    return floor(20 / (nmValue * Math.pow(10, 12)));
};