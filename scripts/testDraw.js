var quarkTraps = [];

function initialiseQuarkTraps(quarks){
    for (let [quark, props] of Object.entries(quarks)){
        quarkTraps.push(new QuarkTrapezoid(100,100,props));
	}
}

function setup(){
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('workbench-canvas');
    background(32);

    initialiseQuarkTraps(quarks);
}

function draw(){
    background(32);
    quarkTraps.forEach(quark =>{
        quark.update();
    })
}