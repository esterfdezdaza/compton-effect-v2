class ComptonEffect {
    h = 6.626 * pow(10, -34)
    me = 9.11 * pow(10, -31)
    c = 3 * pow(10, 8)

    constructor() {
        this.photon1 = new Sphere(-50, 0, 0, 0, [255, 255, 0])
        this.photon2 = new Sphere(50, 0, 0, 0, [255, 255, 0])
        this.electron1 = new Sphere(0, 0, 0, 0, [0, 0, 255])
        this.electron2 = new Sphere(25, 25, 0, 0, [0, 0, 255])

        this.scatteredLambda = 2 * pow(10, -12)
        this.incidentLambda = 1.441 * pow(10, -12)
        this.theta = 0
    }

    calculate() {
        /* Compton Effect calculations 
        theta = ((lambda' - lambda) * (me*c)/h ) - 1 
        */

        const mul = (me*c)/h
        let leftEquation = ((this.scatteredLambda - this.incidentLambda) * mul)
        leftEquation.toPrecision(5)

        let theta = acos(leftEquation - 1)
        theta.toPrecision(5)

        
        this.theta = theta
        this.photon2.theta = radianToDegree(- theta)
    }

    draw() {
        // Showing elements in the screen
        this.photon1.show()
        this.photon2.show()
        this.electron1.show()
        this.electron2.show()

        // lines
        stroke(100);
        strokeWeight(4);
        line(this.photon1.pos.x, this.photon1.pos.y, this.photon1.pos.z, this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z)
        rotateZ(radianToDegree(- this.theta))
        line(this.photon2.pos.x, this.photon2.pos.y, this.photon2.pos.z, this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z)
        rotateZ(radianToDegree( this.theta))
        line(this.electron1.pos.x, this.electron1.pos.y, this.electron1.pos.z, this.electron2.pos.x, this.electron2.pos.y, this.electron2.pos.z)

    }
}