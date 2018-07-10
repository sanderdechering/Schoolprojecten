class Hero {

    public  hero    : Sprite;
    private keyObjects  = new Array(255);

    constructor(url:string) {
        this.hero = new Sprite(window.innerWidth / 2,200,0, 0, 60,80, url, "hero");
        this.hero.draw();
        for (var i = 0; i < this.keyObjects.length; i++) {
            this.keyObjects[i] = false;
        }
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));
        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
    }

    private keyDownHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = true;
    }

    private keyUpHandeler(event: KeyboardEvent)
    {
        this.keyObjects[event.keyCode] = false;
    }
    public getRectangle(){
        return this.hero.div.getBoundingClientRect()
    }
    public update() : void {
        this.hero.div.style.transform = `translate(${this.hero.X}px, ${this.hero.Y}px)`;

        if (this.hero.X < window.innerWidth-40){
            if (this.keyObjects[39] == true && this.keyObjects[37] == false && this.keyObjects[38] == false && this.keyObjects[40] == false){
                this.hero.speedX = 30;
                this.hero.update();
                this.hero.speedX = 0;
            }
        }
        if (this.hero.X > 0){
            if (this.keyObjects[37] == true && this.keyObjects[39] == false && this.keyObjects[38] == false && this.keyObjects[40] == false){
                this.hero.speedX = -30;
                this.hero.update();
                this.hero.speedX = 0;
            }
        }
        if (this.hero.Y < window.innerHeight-40) {

            if (this.keyObjects[40] == true && this.keyObjects[39] == false && this.keyObjects[38] == false && this.keyObjects[37] == false){
                this.hero.speedY = 30;
                this.hero.update();
                this.hero.speedY = 0;
            }
        }
        if (this.hero.Y > 0) {
            if (this.keyObjects[38] == true && this.keyObjects[39] == false && this.keyObjects[40] == false && this.keyObjects[37] == false){
                this.hero.speedY = -30;
                this.hero.update();
                this.hero.speedY = 0;
            }
        }

    }
}