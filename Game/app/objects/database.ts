class Database{

    public moves : any;

    constructor(){
        this.moves = [
                      [0, "Scratch", "40"],
                      [1, "Pound", "40"],
                      [2, "Tackle", "40"],
                      [3, "Mudshot", "60"],
                      [4, "Takedown", "70"],
                      [5, "Surf", "90"],
                      [6, "Earthquake", "150"],
                      [7, "Growl","-10"],
                      [8, "Swagger", "-20"],
                      [9, "Scaryface", "-30"]
                     ]
    }
    public getMove(id:string){
        return this.moves[id];
    }
}