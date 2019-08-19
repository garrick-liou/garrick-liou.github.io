class Square {
    constructor() {
        this.x = random(10, width - 10);
        this.y = random(50, height - 180);
        this.size = 50;
        this.r = floor(random(0, 256));
        this.g = floor(random(0, 256));
        this.b = floor(random(0, 256));
    }

    draw() {
        strokeWeight(1);
        stroke(255);
        fill(this.r, this.g, this.b);
        rectMode(CORNER);
        rect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
    }

    collect() {
        this.x = random(10, width - 10);
        this.y = random(50, height - 125);
        if (this.size > 5) {
            this.size--;
        }
        this.r = floor(random(0, 256));
        this.g = floor(random(0, 256));
        this.b = floor(random(0, 256));        
    }
}