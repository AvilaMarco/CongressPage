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

if (linkWeb.indexOf("senate")!=-1) 
{
  app.datosCongress = traerJson("senate")
}else{
  app.datosCongress = traerJson("house")
}

listasPorPartido(app.datosCongress);

if(linkWeb.indexOf("loyalty")!=-1)
{
  tableStadistics(false,"min",'votes_with_party_pct');
  tableStadistics(true,"max",'votes_with_party_pct');
}else{
  tableStadistics(false,"max",'missed_votes_pct');
  tableStadistics(true,"min",'missed_votes_pct');
}

function traerJson(stringPagina)
{
  return JSON.parse(localStorage.getItem("congress"+stringPagina))
}

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
  app.estadisticasVue = estadisticas
}