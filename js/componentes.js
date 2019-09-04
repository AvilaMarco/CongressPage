Vue.component('navegacion',{
    props:{
        arrayestados:{
            type: Array
        },
        linkess:{
            type: Object
        },
        isready:{
            type:Boolean
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
                        <select v-model="storageSelect" @change="irALegislators" :class="legisboton" class="form-control ml-2 btn">
                            <option>State Legislatures</option>
                            <option v-if="isready" v-for="state in arrayestados" :value="state">{{state}}</option>
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