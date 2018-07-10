class Menu{

    private game: Game;
    private background : Sprite;
    private startGameButton: Sprite;
    private keyObjects = new Array(255);
    song = new Audio("../assets/sound/Theme.mp3")
    private timer : number = 0;
    private volume : number = 0;

    constructor(g:Game) {
        this.game = g;
        this.background = new Sprite(0,0,0,0,innerWidth,innerHeight, "../assets/img/background.png","background");
        this.startGameButton = new Sprite(innerWidth/2-300,innerHeight/2-85,0,0,600,100,"","h2");
        this.startGameButton.div.innerHTML = "Press Spacebar";
        this.startGameButton.div.style.textAlign = "center";

        this.background.div.classList.add("wow");
        this.background.div.classList.add("fadeIn");
        this.background.div.setAttribute("data-wow-duration", "4s");

        this.startGameButton.div.classList.add("wow");
        this.startGameButton.div.classList.add("fadeIn");
        this.startGameButton.div.setAttribute("data-wow-duration", "4s");

        this.song.volume = 0;
        this.song.play();


        for (var i = 0; i < this.keyObjects.length; i++)
        {
            this.keyObjects[i] = false;
        }
        this.background.draw();
        this.startGameButton.draw();

        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
    }
    private keyDownHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = true;
    }


    public update(){
        this.timer++;
        if (this.keyObjects[32] == true){
            this.background.div.classList.remove("fadeIn");
            this.background.div.classList.add("fadeOut");
            this.song.pause();
            this.game.Level_1();
        }else{
            if (this.song.volume < 0.3 && this.timer > 100){
                this.timer = 0;
                this.volume = this.volume + 0;
                this.song.volume = this.volume;
                console.log("test");
            }
        }
    }

}
