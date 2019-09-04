// objeto json
var estadisticas =
{
	"Number_of_Democrats" : 0,
	"Number_of_Republican" : 0,
	"Number_of_Independents" : 0,
	"votes_pct_Democrats" : 0,
	"votes_pct_Republican" : 0,
	"votes_pct_Independents" : 0,
    "total_pct" :0,
    "total_menbers": 0
}

// objetos html
let attendace = document.querySelector("#attendance");
let lolayty = document.querySelector("#lolayty");
let tBodySenate = document.querySelector('#senate-data');

tBodySenate==null?traerJson("house"):traerJson("senate")

function traerJson(pagina)
{
	fetch('https://api.propublica.org/congress/v1/113/'+pagina+'/members.json',{
	method: 'GET',
	headers :{'X-API-Key': 'Sn4XoZPWj9ebHDI5w77k3Jhb00q4kkIGfMxdc3Vr'}
	}).then(function(response){if(response.ok){return response.json()}
	}).then(function(data){
    app.datosCongress = data.results[0].members;
    app.selects();
    listasPorPartido(app.datosCongress);
      
    //contruir tablas con las estadisticas
    if(attendace == null)
    {
        tableStadistics(false,"min",'votes_with_party_pct');
        tableStadistics(true,"max",'votes_with_party_pct');
    }else if(lolayty == null)
    {
        tableStadistics(false,"max",'missed_votes_pct');
        tableStadistics(true,"min",'missed_votes_pct');
    }
  });
}

Vue.component('tabla-estadistics',{
  props:{
    arraymenbers:{
      type: Array,
      required: true
    },
    isattendance:{
      type:Boolean,
      required:true,
    }
  },
  template:`<div class="scroll text-center">
    <table v-if="!isattendance" class="table table-bordered tamaño">
        <thead>
            <tr>
                <th>Name</th>
                <th>Number Party Votes</th>
                <th>% Party Votes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="menber in arraymenbers">
                <td><a :href="menber.url" target="_blank">{{menber.first_name}}{{(menber.middle_name || "")}}{{menber.last_name}}</a></td>
                <td>{{((menber.total_votes * menber.votes_with_party_pct)/100).toFixed(2)}}</td>
                <td>{{menber.votes_with_party_pct}}</td>
            </tr>
        </tbody>
    </table>
    <table v-if="isattendance" class="table table-bordered tamaño">
        <thead>
            <tr>
                <th>Name</th>
                <th>Number of Missed Votes</th>
                <th>% Missed</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="menber in arraymenbers">
                <td><a :href="menber.url" target="_blank">{{menber.first_name}}{{(menber.middle_name || "")}}{{menber.last_name}}</a></td>
                <td>{{menber.missed_votes}}</td>
                <td>{{menber.missed_votes_pct.toFixed(2)}}</td>
            </tr>
        </tbody>
    </table>
</div>`
})

Vue.component('tabla-glance',{
  props:{
    estadisticasg:{
      type:Object,
      required:true
    }
  },
  template:`<table class="table table-bordered">
              <thead>
                  <tr>
                      <th>Party</th>
                      <th>Number of Reps</th>
                      <th>% Voted with Party</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Republican</td>
                      <td>{{estadisticasg.Number_of_Republican}}</td>
                      <td>{{estadisticasg.votes_pct_Republican}}</td>
                  </tr>
                  <tr>
                      <td>Democrat</td>
                      <td>{{estadisticasg.Number_of_Democrats}}</td>
                      <td>{{estadisticasg.votes_pct_Democrats}}</td>
                  </tr>
                  <tr>
                      <td>Independent</td>
                      <td>{{estadisticasg.Number_of_Independents}}</td>
                      <td>{{estadisticasg.votes_pct_Independents}}</td>
                  </tr>
                  <tr>
                      <td>Total</td>
                      <td>{{estadisticasg.total_menbers}}</td>
                      <td>{{estadisticasg.total_pct}}</td>
                  </tr>
              </tbody>
          </table>`
})

let app = new Vue({
  el:'#app',
  data:{
    datosCongress:[],
    estadisticasVue:estadisticas,
    menbersM:[],
    menbersL:[],
    si:true,
    no:false,
    selecStates:[],
    links:{
            index:"index.html",
            sdata:"senate-data.html",
            hdata:"house-data.html",
            sattendance:"senate-attendance-statistics.html",
            hattendance:"house-attendance-statistics.html",
            sloyalty:"senate-party-loyalty-statistics.html",
            hloyalty:"house-party-loyalty-statistics.html"
        },
    cargoestados:false
  },
  methods:{
    selects(){
            this.datosCongress.forEach(e=>this.selecStates.indexOf(e.state)==-1?this.selecStates.push(e.state):null)
            app.cargoestados = true; },
  }
})

function tableStadistics(isAscendente,orden,prop)
{
  if(isAscendente){
    app.menbersM = diesPorcientoBT(prop,orden);
  }else{
    app.menbersL = diesPorcientoBT(prop,orden);
  }
}

function diesPorcientoBT(propiedad,orden)
{
    let diezP = Math.floor((app.datosCongress.length * 10)/100);
    let minimosObjetos = [];
    let minimosValores = obtenerArrayDatos(app.datosCongress,diezP,propiedad,orden);
    
    for(let i=0;i<minimosValores.length;i++)
    {
      let aux = minimosValores[i];
      app.datosCongress.forEach((item) => item[propiedad] == aux ? minimosObjetos.push(item):null)
    }
  return minimosObjetos;
}

function obtenerArrayDatos(Array,porcentaje,propiedad,orden)
{
  let listCompare = [];
                        
    for(let i = 0; i < porcentaje ; i++)
    {
      let auxTB = null;
      for(let i=0;i<Array.length;i++)
      {
        if(orden=="min")
        {
          if((auxTB==null ||auxTB>Array[i][propiedad]) && (listCompare.indexOf(Array[i][propiedad]) == -1))
          {
            auxTB = Array[i][propiedad];
          }
        }else if(orden=="max")
        {
          if((auxTB==null ||auxTB<Array[i][propiedad]) && (listCompare.indexOf(Array[i][propiedad]) == -1))
          {
            auxTB = Array[i][propiedad];
          }
        }
      }
      listCompare.push(auxTB)                   
    }
    return listCompare;
}


function listasPorPartido(arrayMenber)
{
  let contR=0,contD=0,contI=0;
  let pctR=0,pctD=0,pctI=0;
  
  arrayMenber.forEach(e=> {
    switch(e.party){
      case "R":
        pctR+=e.votes_with_party_pct;
        contR++;
      break;
      case "D":
        pctD+=e.votes_with_party_pct;
        contD++;
      break;
      case "I":
        pctI+=e.votes_with_party_pct;
        contI++;
      break;
  }
  })
  
  estadisticas.total_pct = ((pctD+pctI+pctR)/arrayMenber.length).toFixed(2);
  estadisticas.votes_pct_Democrats = (pctD/contD).toFixed(2);
  estadisticas.votes_pct_Independents = contI==0?"-":(pctI/contI).toFixed(2);
  estadisticas.votes_pct_Republican = (pctR/contR).toFixed(2);
  estadisticas.total_menbers = arrayMenber.length;
  estadisticas.Number_of_Democrats = contD;
  estadisticas.Number_of_Independents = contI;
  estadisticas.Number_of_Republican = contR;
}