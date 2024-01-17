class Compass{
    constructor() {
        this.size = 20;
        this.position = createVector(width / 4 - this.size, height / 4 - this.size, 0);
    }

    drawCompass() {
        push();
      
        // Set up the fixed point as the new origin
        translate(this.position.x, this.position.y, this.position.z);
      
        // X-axis (red)
        stroke(255, 0, 0);
        line(0, 0, 0, this.size, 0, 0);
        
      
        // Y-axis (green)
        stroke(0, 255, 0);
        line(0, 0, 0, 0, this.size, 0);
      
        // Z-axis (blue)
        stroke(0, 0, 255);
        line(0, 0, 0, 0, 0, this.size);
        pop();
    }
      
    drawArrow(base, vec) {
        push();
        translate(base.x, base.y, base.z);
        line(0, 0, 0, vec.x, vec.y, vec.z);
        rotateArrow(vec);
        line(0, 0, 0, -8, -8, 0);
        line(0, 0, 0, -8, 8, 0);
        pop();
    }

    rotateArrow(vec) {
        let sigma = atan2(vec.y, vec.x);
        let phi = atan2(sqrt(vec.x * vec.x + vec.y * vec.y), vec.z);
        rotate(sigma, 0, phi);
    }
}