class Ball {
    
    private div : HTMLElement
    private x : number
    private y : number
    private xspeed : number
    private yspeed : number

    constructor() {
        this.div = document.createElement("ball")
        document.body.appendChild(this.div)

        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight

        this.xspeed = 4
        this.yspeed = 4
    }

    public update() : void {


        console.log(this.x)
        console.log(this.y)

        this.x = this.x + this.xspeed
        this.y = this.y + this.yspeed

        if (this.x > window.innerWidth-40 || this.x < 0){
            this.xspeed = this.xspeed*-1
        }

        if (this.y > window.innerHeight-40 || this.y < 0){
            this.yspeed = this.yspeed*-1
        }

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`


    }
}