class LinearMovementParticle {
    /**
     * 
     * @param {*} x1 x parameter of the vector begining
     * @param {*} y1 y parameter of the vector begining
     * @param {*} z1 z parameter of the vector begining
     * @param {*} x2 x parameter of the vector end
     * @param {*} y2 y parameter of the vector end
     * @param {*} z2 z parameter of the vector end
     */
    constructor(x1, y1, z1, x2, y2, z2) {
    this.colour = color(0, 0, 255)
    this.colourArrow = 0 // Has to be the value 0 or 255

    this.start = createVector(x1, y1, z1)
    this.end = createVector(x2, y2, z2)
    this.progress = 0
    this.particle = new Sphere(0, 0, 0, 0, this.colour, 10)
    this.trail = []
    
    this.hidden = false // whether or not to draw the particle

    }

    /**
     * Hiddes the particle
     */
    setHidden(hidden) {
        this.hidden = hidden
    }

    /**
     * Creates movement in the particle
     */
    setProgress() {
        let distance = this.start.dist(this.end)
    
        let output = distance * this.progress

        this.particle.pos.x = output
        this.particle.pos.y = 0
        
        this.trail.push(new Sphere(this.particle.pos.x, this.particle.pos.y, this.particle.pos.z, 0, this.colour, 3))
        if (this.trail.length > 15) {
            this.trail = this.trail.slice(1)
        }
    }
    
    /**
     * Shows the particle and arrow
     */
    show() {
        this.drawArrow()

        push()
        translate(this.start)
        let or_rel = p5.Vector.add(this.end, p5.Vector.mult(this.start, -1)); // relative origin
        let diff = 0;    
        // Cartesian Quadrants
        // 2 | 1
        // - o -
        // 3 | 4
        if (or_rel.x <= 0 && or_rel.y < 0) {
            // 2
            diff = PI
        } else if (or_rel.x < 0 && or_rel.y >= 0) {
            // 3
            diff = PI
        } else if (or_rel.x >= 0 && or_rel.y > 0) {
            // 4
            diff = 0
        } else if (or_rel.x >= 0 && or_rel.y > 0) {
            // 1
            diff = 0
        }
        rotateZ(diff + atan((this.end.y - this.start.y) / (this.end.x - this.start.x)))

        if (!this.hidden) {
            this.particle.colour = this.colour
            this.particle.show()
        }

        stroke([255, 255, 0])
        strokeWeight(1)
        // draw trail
        let distance = this.start.dist(this.end)
        for (let i = 0; i < this.trail.length - 1; i++) {
            let col = this.colour
            stroke(col)
            strokeWeight(5 * (i / this.trail.length))
            if (abs(this.trail[i].pos.x - distance) < 1 && abs(this.trail[i].pos.y) < 1 && abs(this.trail[i + 1].pos.x) < 1 && abs(this.trail[i + 1].pos.y) < 1) {
                continue
            }
            this._line(this.trail[i].pos, this.trail[i + 1].pos)
        }
        pop()
    }
    
    /**
     * Creates a line between two points
     */
    _line(v1, v2) {
        line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z)
    }

    /**
     * Function to create an arrow
     */
    drawArrow() {
        fill(0)
        stroke(this.colourArrow)
        strokeWeight(2)
        this._line(this.start, this.end)
    
        // this code is to make the arrow point
        push(); //start new drawing state
        var offset = 10
        var angle = atan2(this.start.y - this.end.y, this.start.x - this.end.x); //gets the angle of the line
        translate(this.end.x, this.end.y); //translates to the destination vertex
        rotate(angle - HALF_PI); //rotates the arrow point
        triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, 0); //draws the arrow point as a triangle
        pop()
    }
}
