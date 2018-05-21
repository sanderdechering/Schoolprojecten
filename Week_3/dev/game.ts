/// <reference path="ball.ts"/>

class Game {
    
    private balls:Ball[2]
    
    constructor() {
        this.balls.push(new Ball())
        this.gameLoop()
    }
    
    private gameLoop(){
        this.balls.update()
        requestAnimationFrame(()=>this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())