// Currently not in use
class Compass{
    constructor() {
        this.size = 20;
        this.position = createVector(windowWidth / 8 - this.size, windowHeight / 8 - this.size, 0);
    }

    draw() {
        push()
        // Set up the fixed point as the new origin
        translate(this.position.x, this.position.y, this.position.z);
        this.position.set(windowWidth / 8 - this.size, windowHeight / 8 - this.size, 0)
        
        // X-axis (red)
        stroke(255, 0, 0);
        line(0, 0, 0, this.size, 0, 0);
        
      
        // Y-axis (green)
        stroke(0, 255, 0);
        line(0, 0, 0, 0, this.size, 0);
      
        // Z-axis (blue)
        stroke(0, 0, 255);
        line(0, 0, 0, 0, 0, this.size);
        pop()
        
    }
}