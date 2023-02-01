<template>
    <div v-if="list">
        <div v-if="list.success">
            <div v-if="list.profile">
                <div v-if="list.profile.data">
                    <div class="container-xl" v-if="list.profile.data.ijin_download_cv == 'Y'">

                        <div v-if="list.profile.data.person">
                            <div v-if="list.profile.data.person.data">
                                <div v-if="list.profile.data.person.data.template">
                                    <div v-if="list.profile.data.person.data.template.data">
                                        <vue-html2pdf
                                            :show-layout="true"
                                            :float-layout="false"
                                            :enable-download="true"
                                            :preview-modal="true"
                                            :paginate-elements-by-height="1400"
                                            :filename="list.profile.data.person.data.nama_depan+'-'+list.profile.data.person.data.nama_belakang+'-'+list.profile.data.person.data.nama_belakang+'-'+list.profile.data.person.data.profesi"
                                            :pdf-quality="2"
                                            :manual-pagination="false"
                                            pdf-format="a4"
                                            pdf-orientation="portrait"
                                            pdf-content-width="100%"
                                            ref="html2Pdf"
                                        >
                                            <section slot="pdf-content">
                                                <div v-if="list.profile.data.person.data.template.data.nama_template == 'Crisp'">
                                                    <crispVue v-if="list.profile.data.person" :person="list.profile.data.person.data"></crispVue>
                                                </div>

                                                <div v-if="list.profile.data.person.data.template.data.nama_template == 'Nanica'">
                                                    <nanicaVue v-if="list.profile.data.person" :person="list.profile.data.person.data"></nanicaVue>
                                                </div>

                                                <div v-if="list.profile.data.person.data.template.data.nama_template == 'Influx'">
                                                    <influxVue v-if="list.profile.data.person" :person="list.profile.data.person.data"></influxVue>
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
                            <li style="background:white">
                                <a class="btn btn-primary" href="#" @click.prevent="generateReport">
                                    Download PDF
                                </a>
                            </li>
                        </ul>

                    </div>

                    <div v-if="list.profile.data.ijin_download_cv == 'N'">

                        <div class="page page-center">
                            <div class="container-tight py-4">
                                <div class="empty">
                                    <div class="empty-header">404</div>
                                    <p class="empty-title">Oops… You just found an error page</p>
                                    <p class="empty-subtitle text-muted">
                                        We are sorry but the page you are looking for was not found
                                    </p>
                                    <div class="empty-action">

                                        <nuxt-link :to="'/u/'+list.profile.data.slug"  class="btn btn-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg>
                                            Take me home
                                        </nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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
    auth:false,
    layout:'default',
    head(){
        return {
            title:this.list.profile ? this.list.profile.data.title : '',
        }
    },
    components:{
        oxfordVue,
        crispVue,
        nanicaVue,
        influxVue
    },
    async fetch({store, params}){
        await store.dispatch('preview/get_profile',params.id)
    },
    computed:{
        ...mapState('preview',{
            list: state=> state.list,
        })
    },
    data(){
        return {
            current_menu:''
        }
    },
    methods:{
        generateReport () {
            this.$refs.html2Pdf.generatePdf()
        }
    }
}
</script>