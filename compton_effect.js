class ComptonEffect {
    constructor() {
        this.photon1 = new  Waveparticle(-100, 0, 0, 0, 0, 0, 10, 30, 0);
        this.photon2 = new Waveparticle(0, 0, 0, 50, -100, 0, 10, 30, 0);
        this.electron1 = new Sphere(0, 0, 0, 0, [0, 0, 255], 10)
        this.electron2 = new Sphere(50, 50, 25, 0, [0, 0, 255], 10)
        this.scatteredLambda = 2 * Math.pow(10, -12)
        this.incidentLambda = 1.41 * Math.pow(10, -12)
        this.theta = Math.PI / 3
        //Needs to calculate phi for the given example
        this.phi = Math.PI / 3
        this.h = 6.626 * Math.pow(10, -34) // Plank's Constant
        this.me = 9.11 * Math.pow(10, -31) // Electron's mass
        this.c = 3 * Math.pow(10, 8) // Light speed
        this.static_variables = (this.me*this.c)/this.h
        this.static_variables2= (this.h / (this.me * this.c * this.incidentLambda))
    }

    draw() {
      
        // Showing elements in the screen
        let arrowLength = 100
        this.photon2.end = createVector(arrowLength * cos(this.theta), arrowLength * -sin(this.theta))
        this.electron2.pos = createVector(arrowLength * cos(this.phi), arrowLength * sin(this.phi))

        this.photon1.show()
        this.photon2.show()
        this.electron1.show()
        this.electron2.show()

        // lines between particles

        stroke(100);
        strokeWeight(4);
        line(this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z, this.electron2.pos.x, this.electron2.pos.y, this.electron2.pos.z)
    }

    calculate_theta() {
        // theta = acos( 1 - ((lambda' - lambda) * (me*c)/h ) ) 
        let theta = acos(1 - (this.scatteredLambda - this.incidentLambda) * (this.me * this.c) / this.h)
        this.theta = theta // in rad

        console.log("Calculated theta: " + theta + " (rad), " + radianToDegree(theta) + " (deg)")
    }

    calculate_phi() {
        // phi = arcot( 1 + h/(me*c*lambda)) * tan( theta/ 2 ) )

        let leftEquation2 = Math.atan(1 / (1 + this.static_variables2))
        //leftEquation2.toPrecision(5)

        let phi = leftEquation2 * Math.tan( this.theta / 2 )
        //this.phi = phi.toPrecision(5)

        this.electron2.angle = - phi

        console.log("Calculated phi: " + phi + ", in degrees: " + radianToDegree(phi))
    }
    
    calculate_incidentLambda() {
        // lambda = (h/(me*c))(1 - cos(theta))) - lambda'
        let rightEquation3 = (1 - Math.cos(this.theta))

        let incidentLambda = ((1/this.static_variables) * rightEquation3) - this.scatteredLambda
        this.incidentLambda = incidentLambda
    }
    
    calculate_scatteredLambda() {
        // lambda' = (h/(me*c))(1 - cos(theta))) + lambda
        let rightEquation4 = (1 - Math.cos(this.theta))

        let scatteredLambda = ((1/this.static_variables) * rightEquation4) + this.incidentLambda
        this.scatteredLambda = scatteredLambda
    }
}
