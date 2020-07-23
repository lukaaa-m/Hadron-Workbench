class QuarkTrapezoid{
    constructor(x,y,dilation,props){
        this.props = props; //name, colour, mass, charge, spin

        this.x = x;
        this.y = y;
        
        this.dilation = dilation;
        this.rot = 0;

        this.draggable = true;
        this.isBeingDragged = false;
        this.dragPointDiffX;
        this.dragPointDiffY;

        //These are used for all translations, so that the rotate() and scale() functions *set* those properties, not *add to* those properties (useful for animations, cause I feel like making those myself)
        
        this.originVertices = [createVector(-10,5),
                               createVector(-6,-5),
                               createVector(6,-5),
                               createVector(10,5)];

        this.transformedVertices = this.originVertices.valueOf();

        //Copy origin vertices - these ones are actually drawn
        this.drawnVertices = this.originVertices.valueOf();
        //Translate drawnVertices to actual shape position (not at origin)
        
        //I added the x and y to the drawn vertices here but for some reason I didn't need to, so just in case things break, add it back in here

        this.rotate(this.rot);
        this.scale(this.dilation);
        this.drawTrap();
    }

    update(){
        this.checkIfDragged();
        if(this.isBeingDragged){
            this.drag();
        }

        this.drawTrap();
    }

    drawTrap(){
        this.updateDrawnVertices();
        fill(this.props['colour']);
        beginShape();
        this.drawnVertices.forEach(vec =>{
            vertex(vec.x,vec.y);
        });
        endShape(CLOSE);
    }

    updateDrawnVertices(){
        for(var i = 0; i<this.drawnVertices.length; i++){
            this.drawnVertices[i].x = this.transformedVertices[i].x + this.x;
            this.drawnVertices[i].y = this.transformedVertices[i].y + this.y;
        }
    }

    rotate(rot){
        this.rot = rot; //Update rotation property

        var rotMatrix = math.matrix([[cos(rot),-sin(rot)],[sin(rot), cos(rot)]]); //New rotation matrix
        var currentDilationMatrix = math.matrix([[this.dilation, 0],[0, this.dilation]]); //Current dilation matrix
        var currentTranslationMatrix = math.matrix([[this.x],[this.y]]);

        var vertToMatrix; //Vertex point as matrix
        var transVertMatrix; //Translated vertex point as matrix
        var newVertices = []; //Set of new vertices

        //Rotate each vertex with rotation matrix
        this.originVertices.forEach(vert =>{

            //Convert vertex position to matrix
            vertToMatrix = math.matrix([[vert.x],[vert.y]]);

            //Dilate to current size
            transVertMatrix = math.multiply(currentDilationMatrix, vertToMatrix);
            //Perform new rotation
            transVertMatrix = math.multiply(rotMatrix, transVertMatrix);

            //Add new vertex coordinate to 'new vertices' list
            newVertices.push(createVector(transVertMatrix.subset(math.index(0,0)),transVertMatrix.subset(math.index(1,0))));
        });

        this.transformedVertices = newVertices;
    }

    scale(dilation){
        this.dilation = dilation; //Update scale/dilation property

        var dilationMatrix = math.matrix([[dilation, 0],[0, dilation]]); //New dilation matrix
        var currentRotMatrix = math.matrix([[cos(this.rot),-sin(this.rot)],[sin(this.rot), cos(this.rot)]]); //Current rotation matrix
        var currentTranslationMatrix = math.matrix([[this.x],[this.y]]);

        var vertToMatrix; //Vertex point as matrix
        var transVertMatrix; //Translated vertex point as matrix
        var newVertices = []; //Set of new vertices

        this.originVertices.forEach(vert =>{

            //Convert vertex position to matrix
            vertToMatrix = math.matrix([[vert.x],[vert.y]]);

            //Perform new dilation
            transVertMatrix = math.multiply(dilationMatrix, vertToMatrix);
            //Rotate to current rotation
            transVertMatrix = math.multiply(currentRotMatrix, transVertMatrix);

            //Add new vertex coordinate to 'new vertices' list
            newVertices.push(createVector(transVertMatrix.subset(math.index(0,0)),transVertMatrix.subset(math.index(1,0))));
        });

        this.transformedVertices = newVertices;
    }

    checkIfDragged(){
        if(mouseIsPressed && collidePointPoly(mouseX, mouseY, this.drawnVertices)){
            console.log(`Clicked on trapezoid ${this.props['name']} ${this.props['colour']}`);
            this.dragPointDiffX = mouseX - this.x;
            this.dragPointDiffY = mouseY - this.y;
            this.isBeingDragged = true;
        }
        else{
            this.isBeingDragged = false;
        }
    }

    drag(){
        this.x = mouseX + this.dragPointDiffX;
        this.y = mouseY + this.dragPointDiffY;
    }
}