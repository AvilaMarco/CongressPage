// elementos html
let tBodySenate = document.querySelector('#senate-data');
let tBodyHouse = document.querySelector('#house-data');

// variables javascript
let primeraCarga = true;
let cargaActualHtml;

definirCarga()

function definirCarga()
{
	if(tBodyHouse==null)
	{
		cargaActualHtml = tBodySenate;
        traerJson("senate")
	}else if(tBodySenate==null){
		cargaActualHtml = tBodyHouse;
        traerJson("house")
	}
}

let app = new Vue({
    el:'#app',
    data:{
        checkbox:[
            {
                value:"R",
                name:"Republican"
            },
            {
                value:"D",
                name:"Democrat"
            },
            {
                value:"I",
                name:"Independent"
            }
        ],
        primeraCarga:true,
        datosCongress:[],
        selecStates:[],
        valueSelect:"all",
        tablaux:[],
        checkboxaux:[],
        storageSelect:"State Legislatures"
    },
    methods:{
        selects(){
        this.datosCongress.forEach(e=>this.selecStates.indexOf(e.state)==-1?this.selecStates.push(e.state):null)
        },
        filter(){
          this.primeraCarga=false
          this.tablaux = []
          let filtrado = (this.valueSelect!="all" && this.checkboxaux.length!=0)
          this.datosCongress.forEach(e=>((filtrado) ? (this.checkboxaux.indexOf(e.party)>=0 && this.valueSelect==e.state):(this.checkboxaux.indexOf(e.party)>=0 || this.valueSelect==e.state))?this.tablaux.push(e):null)
          if(this.valueSelect=="all" && this.checkboxaux.length==0){this.primeraCarga=true}
        },
        irALegislators(){
            localStorage.setItem('state', this.storageSelect);
            location.assign("State-Legislatures.html");
        }
    }
})

function traerJson(pagina)
{
	fetch('https://api.propublica.org/congress/v1/113/'+pagina+'/members.json',
    {
	method: 'GET',
	headers :{'X-API-Key': 'Sn4XoZPWj9ebHDI5w77k3Jhb00q4kkIGfMxdc3Vr'}
	}).then(function(response){ if(response.ok){return response.json() }
	}).then(function(data){
	app.datosCongress = data.results[0].members;
    app.selects();
    document.querySelector('#carga').style.display = "none";
	});
}

