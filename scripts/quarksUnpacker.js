function unpackQuarks(quarks){
	var unpackedQuarks = {};

	//Creates a quark object for every colour of every type of quark - 'up' becomes 'up red', 'up green' etc...
	for (let [quark, props] of Object.entries(quarksPacked)){
		props['colours'].forEach(colour =>{
			unpackedQuarks[`${quark} ${colour}`] = {
				"name": quark,
				"colour": colour,
				"mass": props['mass'],
				"charge": props['charge'],
				"spin": props['spin'],
			}
		});
	}
	return unpackedQuarks;
}
	
quarks = unpackQuarks(quarksPacked);