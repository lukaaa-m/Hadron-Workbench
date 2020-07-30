function mouseReleased(){
    gameState.mouseController.mUp();
}

function mousePressed(){
    gameState.mouseController.mDown(gameState.quarkTraps);
}


function setup(){
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('workbench-canvas');
    background(32);

    gameState = new GameState(quarks);
}

function draw(){
    background(32);
    gameState.update();
}