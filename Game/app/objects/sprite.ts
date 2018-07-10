class Sprite{

    public X : number;
    public Y : number;
    public speedX : number;
    public speedY : number;
    public width : number;
    public height : number;
    public url : string;
    public name : string;
    public div : HTMLElement;

    constructor(X:any, Y:any, speedX:any, speedY:any, width:any, height:any, url:any, name:any){
        this.X = X;
        this.Y = Y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.width = width;
        this.height = height;
        this.url = url;
        this.name = name;
        this.div = document.createElement(""+this.name+"");
    }

    public update(){
        this.X += this.speedX;
        this.Y += this.speedY;
    }
    public getRectangle(){
        return this.div.getBoundingClientRect()
    }
    public draw(){
        this.div.style.transform = `translate(${this.X}px, ${this.Y}px)`;
        this.div.style.width = this.width+"px";
        this.div.style.height = this.height+"px";
        if (this.url.charAt(0) == '.'){
            this.div.style.backgroundImage = "url("+this.url+")"
        }
        if (this.url.charAt(0) == '#'){
            this.div.style.backgroundColor = ""+this.url+"";
        }
        if (this.url == ''){
        }

        document.body.appendChild(this.div);
    }
}