class gameOver{
    wallpaper:Sprite;
    game : Game
    keyObjects  = new Array(255);
    constructor(g:Game){
        this.game = g;
        this.wallpaper = new Sprite(0,0,0,0,window.innerWidth,window.innerHeight,"../assets/img/background_gameOver.jpg","background");
        this.wallpaper.draw();
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
    }
    public update(){
        if (this.keyObjects[32] == true){
            this.game.Menu();
        }
    }
    private keyDownHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = true;
    }

    private keyUpHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = false;
    }
}