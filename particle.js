class Particle {
    constructor(x, y, r, g, b, type, lifetime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.xV = random(-2, 2);
        this.yV = random(-2, 2);
        this.gravity = 0.1;
        this.lifetime = lifetime;
        this.lifeRemaining = lifetime;
        this.type = type;
        if (type == 1) {
            this.rotate = random(0, 2 * PI);
            this.rotationSpeed = random(PI / 40, PI / 10);
        } else {
            this.rotate = 0;
            this.rotationSpeed = 0;
        }
    }

    draw() {
        this.x += this.xV;
        this.y += this.yV;
        this.yV += this.gravity;
        this.rotate += this.rotationSpeed;
        noStroke();
        if (this.type == 0) {
            fill(this.r, this.g, this.b, (.3 + .7 * (this.lifeRemaining / this.lifetime))* 255);
            ellipse(this.x, this.y, 5 + 5*(this.lifeRemaining / this.lifetime));
        } else if (this.type == 1) {
            fill(this.r + random(-10, 10), this.g + random(-10, 10), this.b + random(-10, 10), (.3 + .7*(this.lifeRemaining / this.lifetime))* 255);
            quad(this.x + (5 + 5 * (this.lifeRemaining / this.lifetime)) * cos(this.rotate + (PI / 4)), this.y + (5 + 5 * (this.lifeRemaining / this.lifetime)) * sin(this.rotate + (PI / 4)), this.x + (5 + 5 * (this.lifeRemaining / this.lifetime)) * cos(this.rotate + 3 * (PI / 4)), this.y + (5 + 5 * (this.lifeRemaining / this.lifetime)) * sin(this.rotate + 3 * (PI / 4)), this.x + (5 + 5 * (this.lifeRemaining / this.lifetime)) * cos(this.rotate + 5 * (PI / 4)), this.y + (5 + 5 * (this.lifeRemaining / this.lifetime)) * sin(this.rotate + 5 * (PI / 4)), this.x + (5 + 5 * (this.lifeRemaining / this.lifetime)) * cos(this.rotate + 7 * (PI / 4)), this.y + (5 + 5 * (this.lifeRemaining / this.lifetime)) * sin(this.rotate + 7 * (PI / 4)));
        } else {
            fill(this.r, this.g, this.b, (.3 + .7*(this.lifeRemaining / this.lifetime))*255);
            ellipse(this.x, this.y, 5 + 5*(this.lifeRemaining / this.lifetime));
        }
        this.lifeRemaining--;
    }
}
