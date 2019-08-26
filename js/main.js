// elementos html
let tBodySenate = document.querySelector('#senate-data');
let tBodyHouse = document.querySelector('#house-data');
let carga = document.querySelector('#carga');
let checkbox = document.querySelectorAll('form input');
let selectState = document.querySelector('#state-filter');

// datos json
let datosCongress = datos.results[0].members;

// variables javascript
let primeraCarga = true;
let cargaActualHtml;
let animationCarga;
let states=[];
let state;

// elije la pagina en la que agrega los datos de la tabla
definirCarga();
// agrega las option al select
buildSelect(datosCongress,states,selectState);
// construye la tabla por defecto, sin filtros
buildTable(datosCongress,cargaActualHtml,checkbox);
// agrega el escuchador de eventos a los inputs checkbox y al select
checkbox.forEach(box => box.addEventListener("change",filter))
selectState.addEventListener("change",filter);

function buildSelect(datosMenber,arrayState,elementHTML)
{
	for (let i = 0; i < datosMenber.length; i++)
	{
		if (arrayState.indexOf(datosMenber[i].state) == -1)
		{
			arrayState.push(datosMenber[i].state);
			elementHTML.innerHTML +=`<option value="${datosMenber[i].state}">${datosMenber[i].state}</option>`
		}
	}
}

function filter(target)
{
	state = selectState.value;
	buildTable(datosCongress,cargaActualHtml,checkbox,state);
}

function definirCarga()
{
	if(tBodyHouse==null)
	{
		cargaActualHtml = tBodySenate;
		animationCarga = false;
	}else if(tBodySenate==null){
		cargaActualHtml = tBodyHouse;
		animationCarga = true;
	}
}

function buildTable(datosMenber,elementHTML,tilde,state)
{
	// // vacia la tabla
	elementHTML.innerHTML = "";
	// agrega a un array los checkbox que estan checked
	let filter = [];
	tilde.forEach((box,index) => box.checked ? filter[index] = box.value : null);
	// variable auxiliar para poder decidir luego si el filtrado es combinado o simple
	let filtrado = (state!="all" && filter.length!=0);

	for (let i = 0; i < datosMenber.length; i++)
	{
		let filtroEstado = datosMenber[i].state == state;
		let filtroPartido = filter.indexOf(datosMenber[i].party) >= 0;
		// variable para decidir si es filtrado simple o combinado
		let filtradoActual = (filtrado ? (filtroPartido && filtroEstado) : (filtroPartido || filtroEstado))

		if (primeraCarga || filtradoActual || (state =="all" && filter.length==0))
		{
			elementHTML.innerHTML +=`<tr>
										<td><a href="${datosMenber[i].url}">
											${datosMenber[i].first_name}
											${(datosMenber[i].middle_name || "")}
											${datosMenber[i].last_name}</a></td>
										<td>${datosMenber[i].party}</td>
										<td>${datosMenber[i].state}</td>
										<td>${datosMenber[i].seniority}</td>
										<td>${datosMenber[i].votes_with_party_pct}</td>
									</tr>`
		}
	}
	if (animationCarga)carga.style.display="none";
	primeraCarga = false;
}
