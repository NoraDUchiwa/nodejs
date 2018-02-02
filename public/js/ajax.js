$("#parser").on("click", function(){
	var obj = {
		ecrans : $('#ecrans').val(),
		fauteuil : $('#fauteuils').val(),
		operation : $('#operation').val(),

	};

	$.post("/render", obj, function(cinemas){
		// construction du tableau HTML

		/*$("#container").append(
			'<table class="table table-dark"><thead><tr><th scope="col">Nom</th><th scope="col">Adresse</th><th scope="col">Ecrans</th></tr></thead><tbody>'
			);

		for(var i=0; i<= cinemas.length; i++){
			$("#container").append('<tr>');
			$("#container").append('<td>'+ cinemas[i].fields.nom_etablissement +'</td>');
			$("#container").append('<td>'+ cinemas[i].fields.adresse +'</td>');
			$("#container").append('<td>'+ cinemas[i].fields.ecrans +'</td>');
			$("#container").append('</tr>');
		};*/

		

	
	});	
})