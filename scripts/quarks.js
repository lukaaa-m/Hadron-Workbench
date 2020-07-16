class Quark{
    constructor(name, colour, mass, charge, spin){
        this.name = name;
        this.colour = colour;
        this.mass = mass;
        this.charge = charge;
        this.spin = spin;
    }
};

$.getJSON('http://localhost:8888/scripts/quarks.json', function(data) {

    var text = JSON.stringify(data)
    console.log(text)
    $(".quarkdump").innerHTML(text);
});



//var quarksJSON = $.getJSON('http://localhost:8888/scripts/quarks.json', function(data){
//    console.log('success');
//    testdump.innerHTML = data;
//});

//for quark in quarksJSON:
//  for colour in quark.colours:
//      quarks.append(Quark(*properties))


