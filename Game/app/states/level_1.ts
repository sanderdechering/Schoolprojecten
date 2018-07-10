class Level_1{
    game : Game
    hero : Hero
    prevX : number = 0;
    prevY : number = 0;

    currX : number = 0;
    currY : number = 0;

    background : Sprite;
    treeGroup_1 : Sprite;
    treeGroup_2 : Sprite;
    bush : Sprite;
    collision: boolean = false;
    collision_left: boolean = false;
    collision_right: boolean = false;
    collision_top: boolean = false;
    collision_bottom: boolean = false;
    move_timer : number;
    song_timer : number = 0;
    song_volume : number = 0;
    song = new Audio("../assets/sound/Littleroot.mp3")

    constructor(g:Game){
        this.game = g;
        this.background = new Sprite(0,0,0, 0,window.innerWidth, window.innerHeight,"../assets/img/background_level_1.png","background_level_1")
        this.bush = new Sprite(0,570,0, 0,window.innerWidth, 200,"#fff","bush")
        this.background.draw();
        this.bush.draw();

        this.hero = new Hero("../assets/img/hero.png");
        this.treeGroup_1 = new Sprite(0,0,0,0,400,425,"../assets/img/tree_group.png","tree")
        this.treeGroup_2 = new Sprite(625,0,0,0,400,425,"../assets/img/tree_group.png","tree")
        this.treeGroup_1.draw();
        this.treeGroup_2.draw();
        this.move_timer = 0;
        this.song.volume = 0;
        this.song.play()
    }
    public update(){
        this.move_timer++

        this.prevX = this.hero.hero.X;
        this.prevY = this.hero.hero.Y;

        if (this.move_timer > 10){
            this.hero.update();
            this.move_timer = 0;
        }

        this.currX = this.hero.hero.X;
        this.currY = this.hero.hero.Y;

        if (this.prevX != this.currX || this.prevY != this.currY){
            if(this.checkCollision(this.hero.getRectangle(), this.bush.getRectangle())){
                if (Math.floor(Math.random() * 10) == 4){
                    this.game.Battle();
                }
            }
        }


        this.collision_left = this.checkCollisionLeft(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        this.collision_right = this.checkCollisionRight(this.hero.getRectangle(), this.treeGroup_2.getRectangle());
        this.collision_bottom = this.checkCollisionBottom(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        this.collision = this.checkCollision(this.hero.getRectangle(), this.treeGroup_1.getRectangle());
        
        if (this.hero.hero.Y <= this.treeGroup_1.height){
            if (this.collision_left == true){
                this.hero.hero.X = this.hero.hero.X + 3
            }
            if (this.collision_right == true){
                this.hero.hero.X = this.hero.hero.X - 3
            }
        }
        if (this.hero.hero.X <= this.treeGroup_1.width){
            if (this.collision_bottom == true){
                this.hero.hero.Y = this.hero.hero.Y + 3
            }
        }

        if (this.song.volume < 0.8 && this.song_timer > 100){
            this.song_timer = 0;
            this.song_volume = this.song_volume + 0.1;
            this.song.volume = this.song_volume;
        }
    }
    public checkCollisionLeft(hero: ClientRect, tree: ClientRect){
        if (hero.top <= tree.bottom){
            return (hero.left <= tree.right);
        }else{
            return false
        }
    }

    public checkCollisionRight(hero: ClientRect, tree: ClientRect){
        if (hero.top <= tree.bottom){
            return (hero.right >= tree.left);
        }else{
            return false
        }
    }
    public checkCollisionBottom(hero: ClientRect, tree: ClientRect){
        if (hero.left <= tree.right){
            return(hero.top <= tree.bottom)
        }else{
            return false
        }
    }

    public checkCollision(a: ClientRect, b: ClientRect){
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }


}