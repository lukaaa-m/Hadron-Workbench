var quarkTraps = [];

function initialiseQuarkTraps(quarks){

    var dilation = 3.2;

    var yMargin = dilation * 12 * 1.2;
    var xMargin = dilation * 20 * 1.5;
    var index = 1;

    var yLevel;
    var xLevel;

    for (let [quark, props] of Object.entries(quarks)){
        yLevel = math.ceil(index / 3); //Changes for every 4th index
        xLevel = (index % 3) + 1; //Repeats every 4th index

        quarkTraps.push(new QuarkTrapezoid(xMargin*xLevel, yMargin*yLevel, dilation, props));
        index += 1;

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