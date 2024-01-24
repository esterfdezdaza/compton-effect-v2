class Compass{
    constructor() {
        this.size = 50;
        //this.position = createVector(windowWidth / 4 - this.size, windowHeight / 4 - this.size, 0);
    }

    draw() {
        
        // Set up the fixed point as the new origin
        //translate(this.position.x, this.position.y, this.position.z);
        
        // X-axis (red)
        stroke(255, 0, 0);
        line(0, 0, 0, this.size, 0, 0);
        
      
        // Y-axis (green)
        stroke(0, 255, 0);
        line(0, 0, 0, 0, this.size, 0);
      
        // Z-axis (blue)
        stroke(0, 0, 255);
        line(0, 0, 0, 0, 0, this.size);
        
        
    }
}