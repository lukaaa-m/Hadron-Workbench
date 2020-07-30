class MouseController{
    constructor(){
        this.x = mouseX;
        this.y = mouseY;

        this.isDragging = false;
        this.dragTarget = null;

        this.down = false;
        this.up = false;
        this.pressed = false;
    }

    update(){
        this.x = mouseX;
        this.y = mouseY;

        if(this.dragTarget != null){
            this.dragTarget.x = this.x;
            this.dragTarget.y = this.y;
        }
        
    }

    mDown(quarkTraps){
        if(!this.isDragging){
            quarkTraps.forEach(quarkTrap =>{
                if(collidePointPoly(this.x, this.y, quarkTrap.drawnVertices)){
                    console.log(`Clicked on trapezoid ${quarkTrap.props['name']} ${quarkTrap.props['colour']}`);
                    //Cubic animate quarktrap to mouse pos
                    this.dragTarget = quarkTrap;
                    this.isDragging = true;
                }
            })
        }
    }

    mUp(){
        if(this.isDragging){
            this.isDragging = false;
            this.dragTarget = null;
        }
    }
}