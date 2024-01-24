class Sphere {
    constructor(x, y, z, theta, color, radius) {
        this.posX = x
        this.posY = y
        this.posZ = z
        this.radius = radius;
        this.theta = theta;
        this.color = color;
    }
    
    show() {
        // Check if p5 is defined (e.g., inside the p5.js draw loop)
        if (typeof fill !== 'undefined') {
        fill(this.color);
        stroke(0);
        strokeWeight(0);
        push();
        rotateZ(this.theta);
        translate(this.pos.x, this.pos.y, this.pos.z);
        sphere(this.radius);
        pop();
        }
    }
    }