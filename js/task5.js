let lolayty = document.querySelector("#lolayty");

let app = new Vue({
	el:"#app",
	data:{
		datosCongress :[],
		datosCongress2 :[],
		stateMetadata : [],
		estalisto : false,
		estalisto2 : false,
		links:{
            index:"index.html",
            sdata:"senate-data.html",
            hdata:"house-data.html",
            sattendance:"senate-attendance-statistics.html",
            hattendance:"house-attendance-statistics.html",
            sloyalty:"senate-party-loyalty-statistics.html",
            hloyalty:"house-party-loyalty-statistics.html"
                },
        cargoestados:false,
        selecStates:[]
	},
	methods:{
		selects(){
            this.datosCongress2.forEach(e=>this.selecStates.indexOf(e.state)==-1?this.selecStates.push(e.state):null)
            this.cargoestados = true;
        }
	}
})
if(lolayty!=null)traerJson(localStorage.getItem('state'));

fetch('https://api.propublica.org/congress/v1/113/senate/members.json',
    {
	method: 'GET',
	headers :{'X-API-Key': 'Sn4XoZPWj9ebHDI5w77k3Jhb00q4kkIGfMxdc3Vr'}
	}).then(function(response){ if(response.ok){return response.json() }
	}).then(function(data){
	app.datosCongress2 = data.results[0].members;
    app.selects();
	});

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
		app.selects();
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