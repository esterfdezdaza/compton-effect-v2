class Sphere {
    constructor(x, y, z, angle, color, radius) {
        this.pos = createVector(x, y, z)
        this.radius = radius
        this.angle = angle
        this.color = color
    }

    show() {
        fill(this.color)
        stroke(0)
        strokeWeight(0)
        push()
        rotateZ(this.angle)
        translate(this.pos.x, this.pos.y, this.pos.z)
        sphere(this.radius)
        pop()
    }
}