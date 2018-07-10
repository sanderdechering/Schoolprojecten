class BattleMenu{
    movepoolInterface : Sprite;
    buttons: Array<Sprite> = [];
    i : number = 0;
    x : number = 30;
    y : number = window.innerHeight-170;
    player : Pokemon;
    constructor(player:Pokemon){
        this.player = player
        this.movepoolInterface = new Sprite(0,window.innerHeight-200,0,0,window.innerWidth-10, 190,"#fff","bar");
        this.movepoolInterface.draw();
        this.movepoolInterface.div.style.border = "5px solid red";
        for(this.i = 0; this.i < 4; this.i++) {
            if (this.i == 2) {
                this.y = this.y + 100;
                this.x = 30
            }
            this.buttons.push(new Sprite(this.x, this.y, 0, 0, window.innerWidth / 3, 50, "#2dff72", "button"));
            this.buttons[this.i].draw();
            if (this.player.movepool[this.i] != "...") {
                this.buttons[this.i].div.innerHTML = this.player.movepool[this.i][1];
                this.buttons[this.i].div.id = this.player.movepool[this.i][0];
            } else {
                this.buttons[this.i].div.innerHTML = "..."
                this.buttons[this.i].div.id = "-";
            }

            this.buttons[this.i].div.style.fontSize = "25px";
            this.x = this.x + window.innerWidth / 2;
            this.buttons[0].div.focus();

        }
    }
}