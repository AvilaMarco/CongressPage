Vue.component('encabezado',{
    template:`
    <header>
      <div class="d-flex">
        <div class="m-4 ">
            <i class="fab fa-searchengin fuente1"></i>
            <a href="#" class="fuente1">TGIF</a>
        </div>
          <div class="m-4 ml-auto">
            <i class="far fa-envelope fuente1"></i>
            <a class="fuente1" href="mailto:info@tgif.net">info@tgif.net</a>
        </div>
      </div>
    </header>`
})

Vue.component('navegacion',{
    props:{
        arrayestados:{
            type: Array
        },
        fetchestalisto:{
            type:Boolean
        },
        linkess:{
            type: Object
        },
        indexboton:{
            type:String
        },
        congressboton:{
            type:String
        },
        atboton:{
            type:String
        },
        loyalboton:{
            type:String
        },
        legisboton:{
            type:String
        }
    },
    template:`      
        <nav class="mb-4 navbar navbar-expand bg-light border border-dark text-center">
            <ul class="navbar-nav row w-100 mx-auto">
                <li class="nav-item col-md-2">
                    <a  :class="indexboton" class="nav-link text-center" :href="linkess.index">Home</a>
                </li>
                <li class="nav-item col-md-2">
                    <a :class="congressboton" class="nav-link" data-toggle="collapse" href="#collapse1">Congress 113</a>
                    <div id="collapse1" class="panel-collapse collapse">
                        <div class="list-group">
                          <a class="list-group-item list-group-item-action" :href="linkess.sdata">Senate</a>
                          <a class="list-group-item list-group-item-action" :href="linkess.hdata">House</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item col-md-2">
                    <a :class="atboton" class="nav-link text-center" data-toggle="collapse" href="#collapse2">Attendance</a>
                    <div id="collapse2" class="panel-collapse collapse">
                        <div class="list-group">
                          <a class="list-group-item list-group-item-action" :href="linkess.sattendance">Senate</a>
                          <a class="list-group-item list-group-item-action" :href="linkess.hattendance">House</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item col-md-2">
                    <a :class="loyalboton" class="nav-link text-center" data-toggle="collapse" href="#collapse3">Party Loyalty</a>
                    <div id="collapse3" class="panel-collapse collapse">
                        <div class="list-group">
                          <a class="list-group-item list-group-item-action" :href="linkess.sloyalty">Senate</a>
                          <a class="list-group-item list-group-item-action" :href="linkess.hloyalty">House</a>
                        </div>
                    </div>
                </li>
                <li class="nav-item col-md-3">
                    <div class="form-check-inline float-lg-right">
                        <select v-if="fetchestalisto" v-model="storageSelect" @change="irALegislators" :class="legisboton" class="form-control ml-2 btn">
                            <option>State Legislatures</option>
                            <option v-for="state in arrayestados" :value="state">{{state}}</option>
                        </select>
                    </div>
                </li>
            </ul>
        </nav>`,
        data(){
            return{
                storageSelect:"State Legislatures"
            }
        },
        methods:{
            irALegislators(){
                localStorage.setItem('state', this.storageSelect);
                location.assign("State-Legislatures.html");
            }
        }
})

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
    data:
    {
        checkbox:[{value:"R",name:"Republican"},{value:"D",name:"Democrat"},{value:"I",name:"Independent"}],
        links:{
            index:"index.html",
            sdata:"senate-data.html",
            hdata:"house-data.html",
            sattendance:"senate-attendance-statistics.html",
            hattendance:"house-attendance-statistics.html",
            sloyalty:"senate-party-loyalty-statistics.html",
            hloyalty:"house-party-loyalty-statistics.html"
        },
        datosCongress:[],
        datosCongressLegislators:[],
        stateMetadata:[],
        metadatosReady:false,
        legislatorsReady:false,
        fetchreadyV:false,
        estadisticasVue:{},
        menbersM:[],
        menbersL:[],
        si:true,
        no:false,
        primeraCarga:true,
        valueSelect:"all",
        tablaux:[],
        checkboxaux:[],
    },
    computed:{
        selecStates(){
        /*selecStates:localStorage.getItem("arrayEstados").split(","),*/
        if (this.fetchreadyV) {
            return localStorage.getItem("arrayEstados").split(",")
        }
        }
    },
    methods:
    {
        filter()
        {
            this.primeraCarga=false
            this.tablaux = []
            let filtrado = (this.valueSelect!="all" && this.checkboxaux.length!=0)
            // aplico filtros
            this.datosCongress.forEach(e=>( (filtrado) ? 
                (this.checkboxaux.indexOf(e.party)>=0 && this.valueSelect==e.state):
                (this.checkboxaux.indexOf(e.party)>=0 || this.valueSelect==e.state) ) ? this.tablaux.push(e) : null,this)
            if(this.valueSelect=="all" && this.checkboxaux.length==0)this.primeraCarga=true
        },
        paginaActual()
        {
            let aux = location.href.split("/");
            let aux2 = this.links
            for (link in aux2) 
            {
                if(aux[aux.length-1]==aux2[link])
                this.links[link] = "#"
            }     
        }
    }
})

app.paginaActual()