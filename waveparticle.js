class Waveparticle {
    constructor(x1, y1, z1, x2, y2, z2, a, width, angle) {
    this.color = color(255, 220, 0);
    
    this.angle = 0
    this.start = createVector(x1, y1, z1);
    this.end = createVector(x2, y2, z2);
    this.a = a;
    this.width = width; // "height" of the wave
    this.progress = 0;
    this.particle = new Sphere(0, 0, 0, 0, this.color, 5);
    this.trail = [];
    
    this.setProgress();
    }
    
    setProgress() {
        let distance = this.start.dist(this.end);
        /* Note, "slope" below is a constant for given numbers, so if you are calculating
        a lot of output values, it makes sense to calculate it once. It also makes
        understanding the code easier */
        
        let output = distance * this.progress;
        let pi_val = ((this.a * PI) / distance) * output;
        
        this.particle.pos.x = output;
        this.particle.pos.y = sin(pi_val) * (this.width / 2);
        
        this.trail.push(new Sphere(this.particle.pos.x, this.particle.pos.y, this.particle.pos.z, 0, this.color, 3));
        if (this.trail.length > 15) {
            this.trail = this.trail.slice(1);
        }
    }
    
    show() {
        push();
        translate(this.start);
        let or_rel = p5.Vector.add(this.end, p5.Vector.mult(this.start, -1));
        let diff = 0;
        //console.log(or_rel);
        
        // Cartesian Quadrants
        // 2 | 1
        // - o -
        // 3 | 4
        if (or_rel.x <= 0 && or_rel.y < 0) {
            // 2
            diff = PI;
        } else if (or_rel.x < 0 && or_rel.y >= 0) {
            // 3
            diff = PI;
        } else if (or_rel.x >= 0 && or_rel.y > 0) {
            // 4
            diff = 0;
        } else if (or_rel.x >= 0 && or_rel.y > 0) {
            // 1
            diff = 0;
        }
        
        rotateZ(diff + atan((this.end.y - this.start.y) / (this.end.x - this.start.x)));
        this.particle.show();
        stroke([255, 255, 0]);
        strokeWeight(1);
        
        // draw trail
        let distance = this.start.dist(this.end);
        for (let i = 0; i < this.trail.length - 1; i++) {
            let col = this.color;
            // col.setAlpha(255 * (i / this.trail.length));
            stroke(col);
            strokeWeight(5 * (i / this.trail.length));
            // this.trail[i].show();
            if (abs(this.trail[i].pos.x - distance) < 1 && abs(this.trail[i].pos.y) < 1 && abs(this.trail[i + 1].pos.x) < 1 && abs(this.trail[i + 1].pos.y) < 1) {
                console.log("hello");
                continue;
            }

            this._line(this.trail[i].pos, this.trail[i + 1].pos);
        }
        pop();
        
        fill(0);
               
        stroke(0);
        strokeWeight(2)
        this._line(this.start, this.end);
        
        // this code is to make the arrow point
        push(); //start new drawing state
        var offset = 10;
        var angle = atan2(this.start.y - this.end.y, this.start.x - this.end.x); //gets the angle of the line
        translate(this.end.x, this.end.y); //translates to the destination vertex
        rotate(angle - HALF_PI); //rotates the arrow point
        triangle(-offset * 0.5, offset, offset * 0.5, offset, 0, -offset / 2); //draws the arrow point as a triangle
        pop();
        }
        
        _line(v1, v2) {
            line(v1.x, v1.y, v1.z, v2.x, v2.y, v2.z);
        }
    }
    