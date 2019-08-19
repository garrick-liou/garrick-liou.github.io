class ParticleSystem {
    constructor(x, y, r, g, b, numParticles, type, lifetime) {
        this.particles = [];
        this.x = x;
        this.y = y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.type = type;
        for (let i = 0; i < numParticles; i++) {            
            let particle = new Particle(x, y, r, g, b, type, lifetime);
            this.particles.push(particle);
        }
        this.lifetime = lifetime + 1;
    }

    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].draw();
            if (this.particles[i].lifeRemaining == 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        this.lifetime--;
    }
}