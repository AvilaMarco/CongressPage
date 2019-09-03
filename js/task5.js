
let app = new Vue({
	el:"#app",
	data:{
		datosCongress :[],
		stateMetadata : [],
		estalisto : false,
		estalisto2 : false
	}
})
traerJson(localStorage.getItem('state'));

function traerJson(state)
{
	app.estalisto = false;
	app.estalisto2 = false;
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
		app.datosCongress = json;
		app.estalisto = true;
		localStorage.setItem('json_legislator_'+state,JSON.stringify(json))
	}).catch(function(error){
		console.log(error);
	})
	}else{
		app.datosCongress = aux;
		app.estalisto = true;
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
		app.estalisto2 = true;
		localStorage.setItem('json_metadata_'+state,JSON.stringify(json))
	}).catch(function(error){
		console.log(error);
	})
	}else{
		app.stateMetadata = aux2;
		app.estalisto2 = true;
	}

}