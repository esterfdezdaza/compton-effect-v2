class ComptonEffect {
    h = 6.626 * pow(10, -34)
    me = 9.11 * pow(10, -31)
    c = 3 * pow(10, 8)

    constructor() {
        this.photon1 = new  Waveparticle(-100, 0, 0, 0, 0, 0, 10, 30, 0);
        this.photon2 = new Waveparticle(0, 0, 0, 50, -100, 0, 10, 30, 0);
        this.electron1 = new Sphere(0, 0, 0, 0, [0, 0, 255], 10)
        this.electron2 = new Sphere(50, 50, 25, 0, [0, 0, 255], 10)
        this.scatteredLambda = 2 * Math.pow(10, -12)
        this.incidentLambda = 1.441 * Math.pow(10, -12)
        this.theta = Math.PI / 3
        this.phi = Math.PI / 3
        this.h = 6.626 * Math.pow(10, -34)
        this.me = 9.11 * Math.pow(10, -31)
        this.c = 3 * Math.pow(10, 8)
        this.static_variables = (this.me*this.c)/this.h
        this.static_variables2= (this.h / (this.me * this.c * this.incidentLambda))
    }

    calculate() {
        /* Compton Effect calculations 
        theta = acos( ((lambda' - lambda) * (me*c)/h ) - 1 ) 
        */

        let leftEquation = ((this.scatteredLambda - this.incidentLambda) * this.static_variables)
        leftEquation.toPrecision(5)

        let theta = Math.acos(leftEquation - 1)
        this.theta = theta.toPrecision(5)
        
        this.photon2.angle = radianToDegree(- theta)
        console.log(radianToDegree(- theta))


        /* phi = arcot( 1 + h/(me*c*lambda) * tan( theta/ 2 ) ) */

        let leftEquation2 = Math.atan(1 / (1 + this.static_variables2))
        leftEquation2.toPrecision(5)
        let phi = leftEquation2 * Math.tan( this.theta / 2 )
        this.phi = phi.toPrecision(5)
        this.electron2.angle = - phi
    }

    draw() {
      
        // Showing elements in the screen
        this.photon1.show()
        this.photon2.show()
        this.electron1.show()
        this.electron2.show()

        // lines between particles

        stroke(100);
        strokeWeight(4);
        //line(this.photon1.start.x, this.photon1.start.y, this.photon1.start.z, this.electron1.pos.x, this.electron1.pos.y, this. electron1.pos.z)
        rotateZ(radianToDegree(- this.theta))
        line(this.photon2.start.x, this.photon2.start.y, this.photon2.start.z, this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z)
        rotateZ(this.phi)
        line(this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z, this.electron2.pos.x, this.electron2.pos.y, this.electron2.pos.z)
        
    }
}