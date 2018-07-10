class Pokemon{

    public health : number;
    public movepool : any;
    public side : string;
    public sprite : Sprite;
    public pokemonName : string;
    public db : Database;
    public reducedDamage : number;
    constructor(health:number, side:string, pokemonName:string){
        this.health = health;
        this.side = side;
        this.pokemonName = pokemonName;
        this.db = new Database();
        this.reducedDamage = 0;
        this.movepool = [];
        if (this.side == "enemy"){
            this.sprite = new Sprite(window.innerWidth-250,20,0,0,150,150,"../assets/img/pokemons/"+this.pokemonName+".png","enemy");
        }else{
            this.sprite = new Sprite(150,window.innerHeight-350,0,0,150,150,"../assets/img/pokemons/"+this.pokemonName+".png","hero");
        }
        if (this.pokemonName == "torchic"){
            this.movepool.push(this.db.moves[0], this.db.moves[7], "...", "...")
        }if (this.pokemonName == "treeko"){
            this.movepool.push(this.db.moves[1], this.db.moves[7], "...", "...")
        }if (this.pokemonName == "swampert"){
            this.movepool.push(this.db.moves[6], this.db.moves[3], this.db.moves[4], this.db.moves[5])
        }if (this.pokemonName == "poochyena"){
            this.movepool.push(this.db.moves[0], this.db.moves[7], "...", "...")
        }if (this.pokemonName == "mightyena"){
            this.movepool.push(this.db.moves[0], this.db.moves[4], this.db.moves[8], this.db.moves[7])
        }

    }
    public draw(){
        this.sprite.draw();
    }
    public reduceDamage(numb:number){
        this.reducedDamage = this.reducedDamage + numb;
    }
}