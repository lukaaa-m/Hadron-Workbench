const { create } = require("mathjs");

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
        this.originVertices = [[-10,5],
                               [-6, this.y-5],
                               [this.x+6, this.y-5],
                               [this.x+10,this.y+5]];
        
        this.originVertices = [createVector(-10,5),
                               createVector(-6,-5),
                               createVector(6,-5),
                               createVector(10,5)];

        //Copy origin vertices - these ones are actually drawn
        this.drawnVecs = [];
        this.updateDrawnVecs(this.originVertices); //Converts the vertex array to p5 vectors

        this.drawTrap();
    }

    update(){
        this.rotate(this.rot);
        this.scale(this.dilation);
        this.checkIfDragged();
        if(this.isBeingDragged){
            this.drag();
        }
        if(collidePointPoly(mouseX, mouseY, this.drawnVecs)){
            console.log(`Hovering over ${this.props['name']}`);
        }
        this.drawTrap();
    }

    drawTrap(){
        fill(this.props['colour']);
        beginShape();
        this.drawnVecs.forEach(vec =>{
            //Vertices are defined relative to the true x,y of trapezoid
            vertex(this.x+vec.x,this.y+vec.y);
        });
        endShape(CLOSE);
    }

    rotate(rot){
        this.rot = rot;
        var rotMatrix = math.matrix([[cos(rot),-sin(rot)],[sin(rot), cos(rot)]]); //New rotation matrix
        var currentDilationMatrix = math.matrix([[this.dilation, 0],[0, this.dilation]]); //Current dilation matrix

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

        this.drawnVecs = newVertices;
    }

    scale(factor){
        this.dilation = factor;
        var dilationMatrix = math.matrix([[factor, 0],[0, factor]]); //New dilation matrix
        var currentRotMatrix = math.matrix([[cos(this.rot),-sin(this.rot)],[sin(this.rot), cos(this.rot)]]); //Current rotation matrix

        var vertToMatrix; //Vertex point as matrix
        var transVertMatrix; //Translated vertex point as matrix
        var newVertices = []; //Set of new vertices

        this.originVertices.forEach(vert =>{

            //Convert vertex position to matrix
            vertToMatrix = math.matrix([[coordinate[0]],[coordinate[1]]]);

            //Perform new dilation
            transVertMatrix = math.multiply(dilationMatrix, vertToMatrix);
            //Rotate to current rotation
            transVertMatrix = math.multiply(currentRotMatrix, transVertMatrix);

            //Add new vertex coordinate to 'new vertices' list
            newVertices.push([transVertMatrix.subset(math.index(0,0)),transVertMatrix.subset(math.index(1,0))]);
        });

        this.updateDrawnVecs(newVertices);
    }

    checkIfDragged(){
        if(mouseIsPressed && collidePointPoly(mouseX, mouseY, this.drawnVecs)){
            console.log(`Clicked on trapezoid ${this.props['name']} ${this.props['colour']}`);
            this.dragPointDiffX = mouseX - this.x;
            this.dragPointDiffY = mouseY - this.y;
            this.isBeingDragged = true;
        }
        
    }

    drag(){
        this.x = mouseX + this.dragPointDiffX;
        this.y = mouseY + this.dragPointDiffY;
    }
}