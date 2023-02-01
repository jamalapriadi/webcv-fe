<template>
    <div v-if="profile">
        <div v-if="profile.success == true">
            <div class="container-xl">

                <div v-if="profile.person">
                    <div v-if="profile.person.data">
                        <div v-if="profile.person.data.template">
                            <div v-if="profile.person.data.template.data">
                                <vue-html2pdf
                                    :show-layout="true"
                                    :float-layout="false"
                                    :enable-download="true"
                                    :preview-modal="true"
                                    :paginate-elements-by-height="1400"
                                    :filename="profile.person.data.nama_depan+'-'+profile.person.data.nama_belakang+'-'+profile.person.data.nama_belakang+'-'+profile.person.data.profesi"
                                    :pdf-quality="2"
                                    :manual-pagination="false"
                                    pdf-format="a4"
                                    pdf-orientation="portrait"
                                    pdf-content-width="100%"
                                    ref="html2Pdf"
                                >
                                    <section slot="pdf-content">
                                        <div v-if="profile.person.data.template.data.nama_template == 'Crisp'">
                                            <crispVue v-if="profile.person" :person="profile.person.data"></crispVue>
                                        </div>

                                        <div v-if="profile.person.data.template.data.nama_template == 'Nanica'">
                                            <nanicaVue v-if="profile.person" :person="profile.person.data"></nanicaVue>
                                        </div>

                                        <div v-if="profile.person.data.template.data.nama_template == 'Influx'">
                                            <influxVue v-if="profile.person" :person="profile.person.data"></influxVue>
                                        </div>
                                    </section>
                                </vue-html2pdf>

                                <!-- <a href="#" @click.prevent="generateReport">Download</a> -->
                            </div>
                        </div>
                    </div>
                </div>

                <ul v-bind:style="{
                    'line-height': '28px',
                    'min-height': '60px',
                    'height':'auto',
                    'max-width': '8%',
                    'min-width': '150px',
                    'padding': '10px',
                    'position': 'fixed',
                    'left': '0%',
                    'text-align': 'center',
                    'bottom': '59%',
                    'z-index': '1900',
                    'list-style-type': 'none',
                    'background':'white',
                    'box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)',
                    '-webkit-box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)',
                    '-moz-box-shadow': '-2px 9px 22px -11px rgba(0,0,0,0.75)'
                }">
                    <li style="background:white;margin-bottom:10px">
                        <nuxt-link :to="'/cvbuilder'" class="btn btn-secondary btn-block">
                            Home
                        </nuxt-link>
                    </li>
                    <li style="background:white">
                        <a class="btn btn-primary" href="#" @click.prevent="generateReport">
                            Download PDF
                        </a>
                    </li>
                </ul>
                
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import oxfordVue from '~/components/webcv/cvtemplate/oxford.vue'
import crispVue from "~/components/webcv/cvtemplate/crisp.vue"
import nanicaVue from '~/components/webcv/cvtemplate/nanica.vue'
import influxVue from '~/components/webcv/cvtemplate/influx.vue'

export default{
    layout:'default',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
    },
    components:{
        oxfordVue,
        crispVue,
        nanicaVue,
        influxVue
    },
    computed:{
        ...mapState('person',{
            loading: state => state.loading,
            profile: state => state.profile,
            message: state => state.message,
            messageclass: state => state.messageclass,
        })
    },
    data(){
        return {
            current_step:2,
            form:{
                kode:'',
                template_id:''
            }
        }
    },
    methods:{
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }
    }
}
</script>