class PlatformSystem {
    constructor() {
        this.micActive = true;
        this.values = [];
        this.maxValue = 0;
    }

    draw() {
        for (let i = 0; i < this.values.length; i++) {
            if (this.values[i] > this.maxValue) {
                this.maxValue = this.values[i];
            }
        }
        if (this.micActive == 1) {
            stroke(0, 255, 0);
        } else {
            stroke(255, 0, 0);
        }
        strokeWeight(2);
        for (let i = 0; i < this.values.length - 1; i++) {
            if (this.values.length != 1) {
                line(width * (i / (this.values.length - 1)), height - height * (this.values[i] / (this.maxValue + 100)), width * ((i + 1) / (this.values.length - 1)), height - height * (this.values[i + 1] / (this.maxValue + 100)));              
            }            
        }
    }

    addPoint(freq) {
        if (this.values.length >= 25) {
            this.values.shift();
        }
        
        if (freq - this.values[this.values.length - 1] > 30) {
            if (this.values[this.values.length - 1] + 30 > 550) {
                this.values.push(550);
            } else {
                this.values.push(this.values[this.values.length - 1] + 15);
            }
        } else if (this.values[this.values.length - 1] - freq > 30) {
            if (this.values[this.values.length - 1] - 30 < 50) {
                this.values.push(50);
            } else {
                this.values.push(this.values[this.values.length - 1] - 15);
            }
        } else {            
            this.values.push(freq);            
        }
    }
}