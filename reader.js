//RECUPERATION DES DONNEES NIVEAU SERVEUR

var fs = require("fs");

class Reader{
	constructor(file){
		this.json = fs.readFileSync(file);
		this.json = JSON.parse(this.json);
	}

	search(criteres, callback){
		// filtrera le fichier
		// return le fichier
		var elements = [];

		this.json.filter(function(cinema){
			if(criteres.ecrans == cinema.fields.ecrans){
				elements.push(cinema.fields);
				console.log(cinema.fields);
			}
			if(criteres.ecrans == cinema.fields.ecrans){
				elements.push(cinema.fields);
				console.log(cinema.fields);
			}
			
		}); //this = fichier json ouvert

		return callback(elements); 
	}
}

module.exports = Reader;