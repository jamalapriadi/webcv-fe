<template>
    <div class="container">
        <div class="row mb-2 mt-2" v-if="sections">
            <div class="col-auto">
                <div class="card bg-dark text-white card-sm">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="font-weight-medium text-white">
                                    Add Display
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-auto" v-if="sections.data" v-for="(l,idx) in sections.data">
                <div class="card card-sm">
                    <div class="card-body">
                        <a href="#" style="border:none" :class="getClassActive(l.title)" @click.prevent="addNewSection(l)">
                            <div class="row align-items-center">
                                <div class="col-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mist" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M5 5h3m4 0h9"></path>
                                        <path d="M3 10h11m4 0h1"></path>
                                        <path d="M5 15h5m4 0h7"></path>
                                        <path d="M3 20h9m4 0h3"></path>
                                    </svg>
                                </div>
                                <div class="col">
                                    <div class="font-weight-medium">
                                        {{ l.title }}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- <pre>{{ list }}</pre> -->

        <div v-if="list">
            <div v-if="list.data">
                <div v-if="list.data.sections">
                    <div v-if="list.data.sections.data" v-for="(l,idx) in list.data.sections.data" :key="idx">
                        <div v-if="l.section">
                            <div v-if="l.section.data">
                                <div v-if="l.section.data.title == 'centered_hero'">
                                    <centered_hero :fields="l.json_fields"></centered_hero>
                                </div>

                                <div v-if="l.section.data.title == 'accordion'">
                                    <accordionVue :fields="l.json_fields"></accordionVue>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <b-modal
            :ref="'modal-section'"
            :id="'modal-section'"
            size="lg"
            no-close-on-backdrop
            hide-footer
            :modal-class="'modal modal-blur fade'" 
            :dialog-class="'modal-dialog modal-dialog-centered'"
            title="Create new Section"
        >
            <form v-if="section" @submit.prevent="saveSection">
                <div v-if="section.title == 'centered_hero'">
                    <div v-for="(l,idx) in section.json_fields" :key="idx" class="form-group">
                        <label for="" class="control-label">{{ l.name }}</label>
                        <input v-if="l.type == 'text'" @input.prevent="inputText($event, idx)" type="text" class="form-control" :placeholder="l.name">
                        <textarea v-if="l.type == 'textarea'" @input.prevent="inputText($event, idx)" :placeholder="l.name" class="form-control"></textarea>
                    </div>
                    <centered_hero :fields="section_preview.json_fields"></centered_hero>
                </div> 

                <div v-if="section.title == 'accordion'">
                    <inputDataAccordion @addAccordion="handleaddAccordion"></inputDataAccordion>
                    <accordionVue :fields="section_preview.json_fields"></accordionVue>
                </div> 

                <hr>

                <div class="card-footer text-end">
                    <div class="d-flex">
                        <a href="#" class="btn btn-link" @click.prevent="batal">Cancel</a>
                        <button type="submit" class="btn btn-primary ms-auto">Save</button>
                    </div>
                </div>
            </form>
        </b-modal>


    </div>
</template>

<script>
import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import accordionVue from '~/components/webcv/sections/accordion.vue'
import inputDataAccordion from '~/components/webcv/sections/inputDataAccordion.vue'

export default{
    layout:'main',
    components:{
        centered_hero,
        accordionVue,
        inputDataAccordion
    },
    data(){
        return {
            kode:'',
            list: {},
            selected_type:'',
            sections:[],
            section:{},
            section_preview:{
                webcv_id:'',
                menu_id:'',
                section_id:'',
                json_fields:[],
            },
            loading:false,
            message:'',
            messageclass:''
        }
    },
    mounted(){
        this.getData()
        this.getSection()
    },
    methods:{
        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/auth/webcv-menu/'+id)
                .then(resp => {
                    this.list = resp.data

                    if(this.list)
                    {
                        if(this.list.data)
                        {
                            this.section_preview = {
                                webcv_id:this.list.data.webcv_id,
                                menu_id: this.list.data.id,
                                section_id:'',
                                json_fields: [],
                            }
                        }
                    }

                    
                })
        },

        getSection(){
            this.$axios.get('/auth/section-all')
                .then(resp => {
                    this.sections = resp.data
                })
        },  

        getClassActive(type){
            var asli = 'list-group-item list-group-item-action'

            if(this.selected_type == type){
                asli = 'list-group-item list-group-item-action active'
            }

            return asli
        },

        addNewSection(l){
            this.section = l
            this.section_preview.section_id = l.id
            this.section_preview.json_fields =  []

            if(this.section.title == 'centered_hero')
            {
                for(var a=0; a<l.json_fields.length; a++)
                {
                    this.section_preview.json_fields.push(
                        {
                            name: l.json_fields[a].name,
                            type: l.json_fields[a].type,
                            value:''
                        }
                    )
                }
            }

            

            this.$bvModal.show("modal-section");
        },

        batal(){
            this.section = {}

            this.reset()
            this.$bvModal.hide("modal-section");
        },

        reset(){
            this.section_preview = {
                webcv_id:this.list.data.webcv_id,
                menu_id: this.list.data.id,
                section_id:'',
                json_fields:[],
            }
        },

        inputText(e, idx){
            for(var a=0; a<this.section_preview.json_fields.length; a++)
            {
                if(a == idx)
                {
                    this.section_preview.json_fields[a].value = e.target.value
                }
            }

        },

        handleaddAccordion(data){
            this.section_preview.json_fields.push(data)
        },

        saveSection(){
            this.loading = true

            this.$axios.post('/auth/save-menu-section', this.section_preview)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$swal('Success', resp.data.message , 'info');
                        this.getData()
                        this.batal()
                    }else{
                        this.$swal('Warning', resp.data.message , 'warning');
                    }
                })
        }
    }
}
</script>