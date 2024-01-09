class Sphere {
    constructor(x, y, z, theta, color) {
        this.pos = createVector(x, y, z)
        this.r = 10
        this.theta = theta
        this.color = color
    }

    show() {
        fill(this.color)
        stroke(0)
        strokeWeight(0)
        push()
        rotateZ(this.theta)
        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(this.r)
        pop()
    }
}