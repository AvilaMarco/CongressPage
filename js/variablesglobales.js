function traerJson(pagina)
{
	fetch('https://api.propublica.org/congress/v1/113/'+pagina+'/members.json',
    {
	method: 'GET',
	headers :{'X-API-Key': 'Sn4XoZPWj9ebHDI5w77k3Jhb00q4kkIGfMxdc3Vr'}
	}).then(function(response){ if(response.ok){return response.json() }
	}).then(function(json){
		localStorage.setItem('congress'+pagina, JSON.stringify(json.results[0].members));
	});
}
traerJson("senate")
traerJson("house")
let estados = []
JSON.parse(localStorage.getItem("congresssenate")).forEach(e=>estados.indexOf(e.state)==-1?estados.push(e.state):null)
localStorage.setItem('arrayEstados',estados)
var aux = location.href.split("/");
var linkWeb = aux[aux.length-1].split("-")