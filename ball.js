class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;		
        this.xV = 0;
        this.yV = 0;
        this.r = 0;
        this.g = 200;
        this.b = 255;
        this.totalV = sqrt(pow(this.xV, 2) + pow(this.yV, 2));
        this.direction = -this.yV / this.xV;
        this.gravity = 0.08;
        this.collided = 0;
        this.wallLRCollided = 0;
        this.wallTBCollided = 0;
        this.collideCounter = 0;
        this.wallLRCollideCounter = 0;
        this.wallTBCollideCounter = 0;
        this.micActive = true;
    }

    draw() {
        this.totalV = sqrt(pow(this.xV, 2) + pow(this.yV, 2));
        if (this.totalV > 45) {
            this.xV *= 45 / this.totalV;
            this.yV *= 45 / this.totalV;
            this.totalV = sqrt(pow(this.xV, 2) + pow(this.yV, 2));
        }
        this.direction = -this.yV / this.xV;
        stroke(225);
        strokeWeight(2);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, 25);
        if (!this.micActive) {
            this.x += this.xV;
            this.y += this.yV;
            this.yV += this.gravity;
        }
        if (this.collided == 1) {
            if (this.collideCounter == 2) {
                this.collided = 0;
                this.collideCounter = 0;
            } else {
                this.collideCounter++;
            }
        }
        if (this.wallLRCollided == 1) {
            if (this.wallLRCollideCounter == 3) {
                this.wallLRCollided = 0;
                this.wallLRCollideCounter = 0;
            } else {
                this.wallLRCollideCounter++;
            }
        }
        if (this.wallTBCollided == 1) {
            if (this.wallTBCollideCounter == 3) {
                this.wallTBCollided = 0;
                this.wallTBCollideCounter = 0;
            } else {
                this.wallTBCollideCounter++;
            }
        }
    }

    bounce(offSlope) {
        if (offSlope == 0) {
            var perpSlope = 99999999999;
        } else {
            var perpSlope = 1 / offSlope;
        }
        let totalV = this.totalV;
        let tempxV = -((1 - pow(perpSlope, 2)) * this.xV + (2 * perpSlope * -this.yV)) / (1 + pow(perpSlope, 2));
        let tempyV = ((2 * perpSlope * this.xV) - (1 - pow(perpSlope, 2)) * -this.yV) / (1 + pow(perpSlope, 2));
        let tempTotal = sqrt(pow(tempxV, 2) + pow(tempyV, 2));
        this.xV = tempxV * totalV / tempTotal;
        this.yV = tempyV * totalV / tempTotal;
        this.totalV = sqrt(pow(this.xV, 2) + pow(this.yV, 2));
        console.log("hit", this.totalV)
    }

    addColor(r, g, b) {
        this.r += r;
        if (this.r > 255) {
            this.r -= 255;
        }
        this.g += g;
        if (this.g > 255) {
            this.g -= 255;
        }
        this.b += b;
        if (this.b > 255) {
            this.b -= 255;
        }
    }
}