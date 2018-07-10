class Game {
    private currentscreen:any;
    constructor() {
        this.currentscreen = new Victory(this);
        this.gameLoop()
    }
    private gameLoop():void{
        this.currentscreen.update();
        requestAnimationFrame(() => this.gameLoop())
    }
    public Menu(){
        document.body.innerHTML = "";
        this.currentscreen = new Menu(this)
    }
    public Level_1(){
        document.body.innerHTML = "";
        this.currentscreen = new Level_1(this)
    }
    public Battle(){
        document.body.innerHTML = "";
        this.currentscreen = new Battle(this)
    }
    public gameOver(){
        document.body.innerHTML = "";
        this.currentscreen = new gameOver(this)
    }
    public victory(){
        document.body.innerHTML = "";
        this.currentscreen = new Victory(this)
    }

}
window.addEventListener("load", () => new Game());