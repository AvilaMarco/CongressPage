// objeto json
var estadisticas =
{
	"Number_of_Democrats" : 0,
	"Number_of_Republican" : 0,
	"Number_of_Independents" : 0,
	"votes_with_party_pct_Democrats" : 0,
	"votes_with_party_pct_Republican" : 0,
	"votes_with_party_pct_Independents" : 0,
    "total_pct" :0
}

// objetos html
let tablaGlance = document.querySelector("#tabla-at-a-glance");
let tableLeast = document.querySelector("#Least-table");
let tableMost = document.querySelector("#Most-table");
let attendace = document.querySelector("#attendance");
let lolayty = document.querySelector("#lolayty");

// datos json
let datosCongress = datos.results[0].members;
// variables javascript
let congressRepublican = [];
let congressDemocrats = [];
let congressIndependents = [];

listasPorPartido(datosCongress,congressRepublican,congressDemocrats,congressIndependents);

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
}

function listasPorPartido(datosMenber,Republicanx,Democratsx,Independentsx)
{
	for (var i = 0; i < datosMenber.length; i++)
	{
		switch(datosMenber[i].party)
		{
			case "R":
				Republicanx.push(datosMenber[i]);
			break;
			case "D":
				Democratsx.push(datosMenber[i]);
			break;
			case "I":
				Independentsx.push(datosMenber[i]);
			break;
		}
	}
}


function numeroRepresentantes(Republicanx2,Democratsx2,Independentsx2)
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
    
}

function diesPorcientoBT(propiedad,orden)
{
    let diezP = Math.floor((datosCongress.length * 10)/100);
    let minimosObjetos = [];
		let minimosValores = obtenerArrayDatos(datosCongress,diezP,propiedad,orden);
		
    for(let i=0;i<minimosValores.length;i++)
		{
			let aux = minimosValores[i];
			datosCongress.forEach((item) => item[propiedad] == aux ? minimosObjetos.push(item):null)
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




function senateAtAGlance(objetoHtml)
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
}

function tableLoyal(objetoHtml,orden)
{
	let datos = diesPorcientoBT("votes_with_party_pct",orden);
	objetoHtml.innerHTML = "";
	for(let i = 0; i < datos.length;i++)
		{
			objetoHtml.innerHTML += `<tr>
										<td>${datos[i].first_name} ${(datos[i].middle_name || "")} ${datos[i].last_name}</td>
										<td>${Math.round(((datos[i].total_votes * datos[i].votes_with_party_pct)/100))}</td>
										<td>${datos[i].votes_with_party_pct.toFixed(2)}</td>
									</tr>`
		}
}

function tableEngaged(objetoHtml,orden)
{
	let datos = diesPorcientoBT("missed_votes_pct",orden);
	objetoHtml.innerHTML = "";
	for(let i = 0; i < datos.length;i++)
		{
			objetoHtml.innerHTML += `<tr>
										<td>${datos[i].first_name} ${(datos[i].middle_name || "")} ${datos[i].last_name}</td>
										<td>${datos[i].missed_votes}</td>
										<td>${datos[i].missed_votes_pct.toFixed(2)}</td>
									</tr>`
		}
}