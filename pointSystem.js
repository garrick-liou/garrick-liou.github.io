class pointSystem {
    constructor(ballSystem) {
        this.score = 0;
        this.squares = [];
        var square = new Square();
        this.squares.push(square);
        this.ballSystem = ballSystem;
    }

    draw() {
        this.squares[0].draw();
        for (let i = 0; i < this.squares.length; i++) { 
            var hit = false;
            hit = collideRectCircle(this.squares[i].x - (this.squares[i].size / 2), this.squares[i].y - (this.squares[i].size / 2), this.squares[i].size, this.squares[i].size, this.ballSystem.balls[0].x, this.ballSystem.balls[0].y, 25, 25);
            if (hit) {
                this.addScore(this.squares[i].x, this.squares[i].y, this.squares[i].r, this.squares[i].g, this.squares[i].b, this.squares[i].size);
                this.squares[i].collect();
                this.ballSystem.balls[0].addColor(this.squares[i].r, this.squares[i].g, this.squares[i].b);
            }
        }
    }

    addScore(x, y, r, g, b, size) {
        this.ballSystem.createCollectParticles(x, y, r, g, b);
        this.score += 51 - size;
        document.getElementById("score").innerHTML = "Score: " + this.score;
    }
}