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

let aPP = new Vue({
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
        links:{
            index:"index.html",
            sdata:"senate-data.html",
            hdata:"house-data.html",
            sattendance:"senate-attendance-statistics.html",
            hattendance:"house-attendance-statistics.html",
            sloyalty:"senate-party-loyalty-statistics.html",
            hloyalty:"house-party-loyalty-statistics.html"
                },
        primeraCarga:true,
        datosCongress:[],
        selecStates:[],
        valueSelect:"all",
        tablaux:[],
        checkboxaux:[],
        cargoestados:false
    },
    methods:{
        selects(){
            this.datosCongress.forEach(e=>this.selecStates.indexOf(e.state)==-1?this.selecStates.push(e.state):null)
            aPP.cargoestados = true;     },
        filter(){
          this.primeraCarga=false
          this.tablaux = []
          let filtrado = (this.valueSelect!="all" && this.checkboxaux.length!=0)
          this.datosCongress.forEach(e=>((filtrado) ? (this.checkboxaux.indexOf(e.party)>=0 && this.valueSelect==e.state):(this.checkboxaux.indexOf(e.party)>=0 || this.valueSelect==e.state))?this.tablaux.push(e):null)
          
          if(this.valueSelect=="all" && this.checkboxaux.length==0){this.primeraCarga=true}
        },
        paginaActual(){
                {let aux = location.href.split("/");
                let aux2 = this.links
                for (link in aux2) {
                   if(aux[aux.length-1]==aux2[link])
                    this.links[link] = "#"
                }
                }
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
	aPP.datosCongress = data.results[0].members;
    aPP.selects();
    aPP.paginaActual();
    document.querySelector('#carga').style.display = "none";
	});
}

