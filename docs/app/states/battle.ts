class Battle{
    game : Game;
    player : Pokemon;
    playerStatus : Sprite;
    playerHealth : Sprite;
    db : Database;
    enemy : Pokemon;
    enemyStatus : Sprite;
    enemyHealth : Sprite;
    battleMenu : BattleMenu;
    f : number = 0;

    keyObjects  = new Array(255);
    keyObjectTimer:number = 0;

    playerTurn : boolean = true;
    enemyTurn : boolean = false

    constructor(g : Game){
        this.game = g;
        this.player = new Pokemon(40,"hero","torchic");
        this.playerStatus = new Sprite(window.innerWidth-500,window.innerWidth-550,0,0,430,55,"#fff","playerStatus");
        this.playerHealth = new Sprite(window.innerWidth-450,window.innerWidth-520,0,0,400,30,"#03ff00","playerHealth");
        this.enemy = new Pokemon(40,"enemy","poochyena");
        this.enemyStatus = new Sprite(20,20,0,0,430,55,"#fff","playerStatus");
        this.enemyHealth = new Sprite(70,50,0,0,400,30,"#03ff00","enemyHealth");
        this.battleMenu = new BattleMenu(this.player);
        this.db = new Database()
        this.playerStatus.draw();
        this.player.draw();
        this.playerHealth.draw();
        this.enemyStatus.draw();
        this.enemy.draw();
        this.enemyHealth.draw();


        this.playerStatus.div.innerHTML = this.player.pokemonName;
        this.playerStatus.div.style.padding = "10px";
        this.enemyStatus.div.innerHTML = this.enemy.pokemonName;
        this.enemyStatus.div.style.padding = "10px";

        document.addEventListener('keyup',(event: KeyboardEvent) => this.keyUpHandeler(event));
        document.addEventListener('keydown',(event: KeyboardEvent) => this.keyDownHandeler(event));

    }
    public  update(){
        if(this.playerTurn == true){
            this.keyObjectTimer++;
            if (this.keyObjectTimer > 10) {
                this.highlightButtons();
                if (this.keyObjects[32] == true) {
                    this.attackPlayer()
                }
                this.keyObjectTimer = 0
            }
        }
        if (this.enemyTurn == true){
            this.attackEnemy()
        }
        if (this.playerHealth.div.offsetWidth == 0 ){
            this.game.gameOver();
        }
        if (this.enemyHealth.div.offsetWidth == 0){
            this.game.victory();
        }
    }
    public attackPlayer(){
        if (document.activeElement.id != "-"){
            let moveData = this.db.getMove(document.activeElement.id)
            if (moveData[2].charAt(0) == "-"){
                if (this.enemy.reducedDamage < 60){
                    this.enemy.reducedDamage = this.enemy.reducedDamage + Number(moveData[2].substr(1));
                    this.playerTurn = false;
                    this.enemyTurn = true;
                }else{
                    this.playerTurn = false;
                    this.enemyTurn = true;
                }
            }else{
                this.enemyHealth.div.style.width = (this.enemyHealth.div.offsetWidth - moveData[2]+this.player.reducedDamage)+"px";
                this.playerTurn = false;
                this.enemyTurn = true;
            }
        }
    }
    public attackEnemy(){
        let randomNumber = Math.floor(Math.random() * 4)
        let moveData = this.enemy.movepool[randomNumber];
        if (moveData != "..."){
            if (moveData[2].charAt(0) == "-"){
                if (this.player.reducedDamage < 20){
                    this.player.reducedDamage = this.player.reducedDamage + Number(moveData[2].substr(1));
                    this.playerTurn = true;
                    this.enemyTurn = false;
                }else{
                    this.playerTurn = true;
                    this.enemyTurn = false;
                }
            }else{
                this.playerHealth.div.style.width = (this.playerHealth.div.offsetWidth - moveData[2]+this.enemy.reducedDamage)+"px";
                this.playerTurn = true;
                this.enemyTurn = false;
            }
        }else{
            this.attackEnemy();
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
    private highlightButtons(){
        if (this.keyObjects[38] == true) {
            this.f--;
            if (this.f < 0) {
                this.f = this.battleMenu.buttons.length-1;
            }
            this.battleMenu.buttons[this.f].div.focus();
            this.keyObjectTimer = 0;
        }
        if (this.keyObjects[40] == true) {
            this.f++;
            if (this.f == this.battleMenu.buttons.length) {
                this.f = 0
            }
            this.battleMenu.buttons[this.f].div.focus();
            this.keyObjectTimer = 0
        }
    }
}