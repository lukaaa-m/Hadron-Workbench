var quarkTraps = [];

function initialiseQuarkTraps(quarks){
    quarks.forEach(function(quark_props){
        quarkTraps.push(new QuarkTrapezoid(100,200,quark_props))
    });
}

function setup(){
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('workbench-canvas');
    background(32);
    //initialise quark trapezoids
    //initialiseQuarkTraps(quarks);
    testTrap = new QuarkTrapezoid(window.innerWidth/2,window.innerHeight/2,{"colour":"red"});
}

function draw(){
    background(32);
    testTrap.update();
    testTrap.x += 2;
}

class QuarkTrapezoid{
    constructor(x,y,props){
        this.props = props;
        //name, colour, mass, charge, spin
        this.x = x;
        this.y = y;
        
        this.scale = 10;
        this.rot = 0;

        this.originVertices = [[-10, 5],
                         [-6, -5],
                         [ 6, -5],
                         [ 10, 5]];

        //copy origin vertices
        this.drawnVertices = this.originVertices.valueOf();
    }

    update(){
        this.drawTrap();
        this.rotate(this.rot);
        //this.scale(this.scale);
    }

    drawTrap(){
        
        fill(this.props['colour']);
        beginShape();
        this.drawnVertices.forEach(coordinate =>{
            //vertices are defined relative to the true x,y of trapezoid
            vertex(this.x+coordinate[0],this.y+coordinate[1]);
        });
        endShape(CLOSE);

    }

    rotate(rot){
        this.rot = rot;
        var rotMatrix = math.matrix([[cos(rot),-sin(rot)],[sin(rot), cos(rot)]]);
        var currentDilationMatrix = math.matrix([[this.scale, 0],[0, this.scale]]);

        var vertToMatrix;
        var transVertMatrix;
        var newVertices = [];

        //Rotate each vertex with rotation matrix
        this.originVertices.forEach(coordinate =>{
            //console.log('Current coordinate: ' + coordinate);

            //Convert vertex position to matrix
            vertToMatrix = math.matrix([[coordinate[0]],[coordinate[1]]]);
            //console.log('Coordinate to matrix: ' + vertToMatrix);

            //Dilate to current size
            transVertMatrix = math.multiply(currentDilationMatrix, vertToMatrix);
            //Rotate vertex
            transVertMatrix = math.multiply(rotMatrix, transVertMatrix);
            //console.log('Translated matrix: ' + transVertMatrix);

            //Add new vertex coordinate to 'new vertices' list
            newVertices.push([transVertMatrix.subset(math.index(0,0)),transVertMatrix.subset(math.index(1,0))]);
            //console.log('New vertices array: ' + newVertices);
        });

        //console.log(this.vertices);
        this.drawnVertices = newVertices;
        //console.log(this.vertices);
    }

    scale(factor){
        this.scale = factor;
        var dilationMatrix = math.matrix([[factor, 0],[0, factor]]);
        var currentRotMatrix = math.matrix([[cos(this.rot),-sin(this.rot)],[sin(this.rot), cos(this.rot)]]);
        var vertToMatrix;
        var transVertMatrix;
        var newVertices = [];

        //scale each vertex with dilation matrix
        this.originVertices.forEach(coordinate =>{
            //console.log('Current coordinate: ' + coordinate);

            //Convert vertex position to matrix
            vertToMatrix = math.matrix([[coordinate[0]],[coordinate[1]]]);
            //console.log('Coordinate to matrix: ' + vertToMatrix);

            //Dilate
            transVertMatrix = math.multiply(dilationMatrix, vertToMatrix);
            //Rotate to current rotation
            transVertMatrix = math.multiply(currentRotMatrix, transVertMatrix);
            //console.log('Translated matrix: ' + transVertMatrix);

            //Add new vertex coordinate to 'new vertices' list
            newVertices.push([transVertMatrix.subset(math.index(0,0)),transVertMatrix.subset(math.index(1,0))]);
            //console.log('New vertices array: ' + newVertices);
        });

        //console.log(this.vertices);
        this.drawnVertices = newVertices;
        //console.log(this.vertices);
    }
}