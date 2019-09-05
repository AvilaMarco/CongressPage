function definirCarga(stringPagina)
{
	return JSON.parse(localStorage.getItem("congress"+stringPagina))
}

if (linkWeb.indexOf("senate")!=-1) 
{
	app.datosCongress = definirCarga("senate")
}else{
	app.datosCongress = definirCarga("house")
}
