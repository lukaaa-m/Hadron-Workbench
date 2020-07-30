class GameState{
    constructor(quarks){
        this.quarks = quarks;
        this.quarkTraps = [];
        this.mouseController = new MouseController()

        this.initialiseQuarkTraps();

    }
    update(){
        this.mouseController.update();

        this.quarkTraps.forEach(quark =>{
            quark.update();
        })
    }
    initialiseQuarkTraps(){
        var dilation = 3.2;
    
        var yMargin = dilation * 12 * 1.2;
        var xMargin = dilation * 20 * 1.5;
        var index = 1;
    
        var yLevel;
        var xLevel;

        console.log('Initialising quark traps in gamestate');

        for (let [quark, props] of Object.entries(this.quarks)){
            yLevel = math.ceil(index / 3); //Changes for every 4th index
            xLevel = (index % 3) + 1; //Repeats every 4th index
    
            this.quarkTraps.push(new QuarkTrapezoid(xMargin*xLevel, yMargin*yLevel, dilation, props));
            index += 1;
        }
    }
}