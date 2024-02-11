class Sphere {
    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     * @param {*} angle 
     * @param {*} color 
     * @param {*} radius 
     */
    constructor(x, y, z, angle, colour, radius) {
        this.pos = createVector(x, y, z)
        this.radius = radius
        this.angle = angle
        this.colour = colour
    }

    show() {
        fill(this.colour)
        stroke(0)
        strokeWeight(0)
        push()
        rotateZ(this.angle)
        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(this.radius)
        pop()
    }
}