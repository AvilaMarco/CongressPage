traerJson(localStorage.getItem('state'));

function traerJson(state)
{

	app.metadatosReady = false;
	app.legislatorsReady = false;
	let aux = JSON.parse(localStorage.getItem('json_legislator_'+state));
	let aux2 = JSON.parse(localStorage.getItem('json_metadata_'+state));

	if(aux==null){
		fetch('https://openstates.org/api/v1/legislators?state='+state,
	    {
			method: 'GET',
			headers :{'X-API-Key': '13b2120c-4d1c-4c70-8904-151c6088644f'}
		}).then(function(response){ 
			if(response.ok)
			{
				return response.json()
			}else{
				throw new Error()
			}
		}).then(function(json){
			app.datosCongressLegislators = json;
			app.legislatorsReady = true;
			localStorage.setItem('json_legislator_'+state,JSON.stringify(json))
		}).catch(function(error){
			console.log(error);
		})
	}else{
		app.datosCongressLegislators = aux;
		app.legislatorsReady = true;
	}

	if(aux2==null){
		fetch('https://openstates.org/api/v1/metadata/'+state,
	    {
			method: 'GET',
			headers :{'X-API-Key': '13b2120c-4d1c-4c70-8904-151c6088644f'}
		}).then(function(response){ 
			if(response.ok)
			{
				return response.json()
			}else{
				throw new Error()
			}
		}).then(function(json){
			app.stateMetadata = json;
			app.metadatosReady = true;
			localStorage.setItem('json_metadata_'+state,JSON.stringify(json))
		}).catch(function(error){
			console.log(error);
		})
	}else{
		app.stateMetadata = aux2;
		app.metadatosReady = true;
	}

}