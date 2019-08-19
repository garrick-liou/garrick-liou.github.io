class ballSystem {
    constructor(platformSystem) {
        this.balls = [];
        this.platformSystem = platformSystem;
        this.particleSystems = [];
        this.micActive = true;
    }

    draw() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].micActive = this.micActive;
            this.balls[i].draw();
            if (!this.micActive) {
                for (let j = 0; j < this.platformSystem.values.length - 1; j++) {
                    let hit = false;
                    hit = collideLineCircle(width * (j / (this.platformSystem.values.length - 1)), height * (1 - (this.platformSystem.values[j] / (this.platformSystem.maxValue + 100))), width * ((j + 1) / (this.platformSystem.values.length - 1)), height * (1 - (this.platformSystem.values[j + 1] / (this.platformSystem.maxValue + 100))), this.balls[i].x, this.balls[i].y, 25);
                    if (hit) {
                        if (this.balls[i].collided == 0) {
                            let particles = new ParticleSystem(this.balls[i].x, this.balls[i].y, this.balls[i].r, this.balls[i].g, this.balls[i].b, 30, 0, 20);
                            this.particleSystems.push(particles);
                            this.balls[i].bounce((height * (1 - (this.platformSystem.values[j + 1] / (this.platformSystem.maxValue + 100))) - height * (1 - (this.platformSystem.values[j] / (this.platformSystem.maxValue + 100)))) / ((width * ((j + 1) / (this.platformSystem.values.length - 1))) - width * (j / (this.platformSystem.values.length - 1))));
                            this.balls[i].collided = 1;
                        }
                    }
                }
                if (this.balls[i].wallLRCollided == 0) {
                    let hit = false;
                    hit = collideLineCircle(0, 0, 0, height, this.balls[i].x, this.balls[i].y, 25);
                    if (hit) {
                        let particles = new ParticleSystem(this.balls[i].x, this.balls[i].y, this.balls[i].r, this.balls[i].g, this.balls[i].b, 10, 2, 15);
                        this.particleSystems.push(particles);
                        console.log("hitLeft");
                        this.balls[i].xV *= -1;
                        this.balls[i].wallLRCollided = 1;
                    }
                    hit = collideLineCircle(width, 0, width, height, this.balls[i].x, this.balls[i].y, 25);
                    if (hit) {
                        let particles = new ParticleSystem(this.balls[i].x, this.balls[i].y, this.balls[i].r, this.balls[i].g, this.balls[i].b, 10, 2, 15);
                        this.particleSystems.push(particles);
                        console.log("hitRight");
                        this.balls[i].xV *= -1;
                        this.balls[i].wallLRCollided = 1;
                    }
                }
                if (this.balls[i].wallTBCollided == 0) {
                    let hit = false;
                    hit = collideLineCircle(0, 0, width, 0, this.balls[i].x, this.balls[i].y, 25);
                    if (hit) {
                        let particles = new ParticleSystem(this.balls[i].x, this.balls[i].y, this.balls[i].r, this.balls[i].g, this.balls[i].b, 10, 2, 15);
                        this.particleSystems.push(particles);
                        console.log("hitTop");
                        this.balls[i].yV *= -1;
                        this.balls[i].wallTBCollided = 1;
                    }
                    hit = collideLineCircle(0, height, width, height, this.balls[i].x, this.balls[i].y, 25);
                    if (hit) {
                        let particles = new ParticleSystem(this.balls[i].x, this.balls[i].y, this.balls[i].r, this.balls[i].g, this.balls[i].b, 10, 2, 15);
                        this.particleSystems.push(particles);
                        console.log("hitBottom");
                        this.balls[i].yV *= -1;
                        this.balls[i].wallTBCollided = 1;
                    }
                }
            }                             
        }
        for (let i = 0; i < this.particleSystems.length; i++) {
            this.particleSystems[i].draw();
        }
        for (let i = 0; i < this.particleSystems.length; i++) {
            if (this.particleSystems[i].lifetime == 0) {
                this.particleSystems.splice(i, 1);
                i--;
            }
        }
    }

    addBall(ball) {
        this.balls.push(ball);
        
    }

    createCollectParticles(x, y, r, g, b) {
        let particles = new ParticleSystem(x, y, r, g, b, 50, 1, 60);
        this.particleSystems.push(particles);
    }
}