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
/*votes_with_party_pct*/
/*<thead>
            <tr>
                <th>Name</th>
                <th>Number of Missed Votes</th>
                <th>% Missed</th>
            </tr>
        </thead>*/
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
                <td><a :href="menber.url">{{menber.first_name}}{{(menber.middle_name || "")}}{{menber.last_name}}</a></td>
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
                <td><a :href="menber.url">{{menber.first_name}}{{(menber.middle_name || "")}}{{menber.last_name}}</a></td>
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
    no:false
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



/*function tableEngaged(isAscendente,orden)
{
  if(isAscendente){
    app.menbersM = diesPorcientoBT("missed_votes_pct",orden);
  }else{
    app.menbersL = diesPorcientoBT("missed_votes_pct",orden);
  }
  
}*/
/*let tablaGlance = document.querySelector("#tabla-at-a-glance");*/
/*let tableLeast = document.querySelector("#Least-table");
let tableMost = document.querySelector("#Most-table");*/

/*// datos json
let datosCongress = datos.results[0].members;*/
// variables javascript
/*let congressRepublican = [];
let congressDemocrats = [];
let congressIndependents = [];*/

/*objetoHtml.innerHTML = "";
  for(let i = 0; i < datos.length;i++)
    {
      objetoHtml.innerHTML += `<tr>
                    <td>${datos[i].first_name} ${(datos[i].middle_name || "")} ${datos[i].last_name}</td>
                    <td>${datos[i].missed_votes}</td>
                    <td>${datos[i].missed_votes_pct.toFixed(2)}</td>
                  </tr>`
    }*/

  /*objetoHtml.innerHTML = "";
  for(let i = 0; i < datos.length;i++)
    {
      objetoHtml.innerHTML += `<tr>
                    <td>${datos[i].first_name} ${(datos[i].middle_name || "")} ${datos[i].last_name}</td>
                    <td>${Math.round(((datos[i].total_votes * datos[i].votes_with_party_pct)/100))}</td>
                    <td>${datos[i].votes_with_party_pct.toFixed(2)}</td>
                  </tr>`
    }*/

/*listasPorPartido(datosCongress,congressRepublican,congressDemocrats,congressIndependents);

numeroRepresentantes(congressRepublican,congressDemocrats,congressIndependents);

porcentajeDeVotos(congressRepublican,congressDemocrats,congressIndependents);

//contruir tablas con las estadisticas
senateAtAGlance(tablaGlance);
if(attendace == null)
{
	tableLoyal(tableLeast,"min");
	tableLoyal(tableMost,"max");
}else if(lolayty == null)
{
	tableEngaged(tableLeast,"min");
	tableEngaged(tableMost,"max");
}*/



/*  function numeroRepresentantes(Republicanx2,Democratsx2,Independentsx2)
  {
      estadisticas.Number_of_Democrats = Democratsx2.length;
      estadisticas.Number_of_Republican = Republicanx2.length;
      estadisticas.Number_of_Independents = Independentsx2.length;
  }

  function porcentajeDeVotos(Republicanx2,Democratsx2,Independentsx2)
  {
      let xRVote = 0,xDVote=0,xIVote=0;
      let dividir = 3;
      Republicanx2.forEach((menber) => xRVote += menber.votes_with_party_pct);
      Democratsx2.forEach((menber) => xDVote += menber.votes_with_party_pct);
      Independentsx2.forEach((menber) => xIVote += menber.votes_with_party_pct);
      estadisticas.total_pct = (xRVote+xDVote+xIVote)/(Republicanx2.length+Democratsx2.length+Independentsx2.length);
          xRVote = xRVote/Republicanx2.length;
          estadisticas.votes_with_party_pct_Republican = xRVote;
          xDVote = xDVote/Democratsx2.length;
          estadisticas.votes_with_party_pct_Democrats = xDVote;

      if(Independentsx2.length!=0)xIVote = xIVote/Independentsx2.length;
          estadisticas.votes_with_party_pct_Independents = xIVote;

  }*/





/*function senateAtAGlance(objetoHtml)
{
	objetoHtml.innerHTMl ="";
	objetoHtml.innerHTML =	`<tr>
								<td>Republican</td>
								<td>${estadisticas.Number_of_Republican}</td>
								<td>${estadisticas.votes_with_party_pct_Republican.toFixed(2)}</td>
							</tr>
							<tr>
                                <td>Democrat</td>
                                <td>${estadisticas.Number_of_Democrats}</td>
                                <td>${estadisticas.votes_with_party_pct_Democrats.toFixed(2)}</td>
							</tr>
							<tr>
                                <td>Independent</td>
                                <td>${estadisticas.Number_of_Independents}</td>
                                <td>${estadisticas.votes_with_party_pct_Independents.toFixed(2)}</td>
							</tr>
                            <tr>
                                <td>Total</td>
                                <td>${datosCongress.length}</td>
                                <td>${estadisticas.total_pct.toFixed(2)}</td>
							</tr>`
}*/

