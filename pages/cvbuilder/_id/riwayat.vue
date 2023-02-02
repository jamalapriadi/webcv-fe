<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">
                <ul class="steps steps-green steps-counter my-4">
                    <li :class="classStep(0)">Detail Pribadi</li>
                    <li :class="classStep(1)">Pengalaman</li>
                    <li :class="classStep(2)">Template</li>
                </ul>

                <div v-for="(l,idx) in availables" :key="idx">

                    <div v-if="l == 'description'">
                        <card_descriptionVue v-if="profile.person" :person="profile.person.data" @sukses="get_data"></card_descriptionVue>
                    </div>

                    <div v-if="l == 'pengalaman'" class="mt-4">
                        <card_pengalaman_kerjaVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pengalaman_kerjaVue>
                    </div>

                    <div v-if="l == 'pendidikan'" class="mt-4">
                        <card_pendidikanVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pendidikanVue>
                    </div>

                    <div v-if="l == 'minat'" class="mt-4">
                        <card_minatVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_minatVue>
                    </div>

                    <div v-if="l == 'keahlian'" class="mt-4">
                        <card_keahlianVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_keahlianVue>
                    </div>

                    <div v-if="l == 'bahasa'" class="mt-4">
                        <card_bahasaVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_bahasaVue>
                    </div>

                    <div v-if="l == 'kursus'" class="mt-4">
                        <card_kursusVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_kursusVue>
                    </div>

                    <div v-if="l == 'pencapaian'" class="mt-4">
                        <card_pencapaianVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_pencapaianVue>
                    </div>

                    <div v-if="l == 'publikasi'" class="mt-4">
                        <card_publikasiVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_publikasiVue>
                    </div>

                    <div v-if="l == 'project'" class="mt-4">
                        <card_projectVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data"></card_projectVue>
                    </div>

                    <div v-if="l == 'social media'" class="mt-4">
                        <card_sosmedVue v-if="profile.person" :person="profile.person.data" @sukses="get_data" @changeStatusMember="get_data" :sosmed="sosmeds"></card_sosmedVue>
                    </div>

                </div>

                <div class="card mt-3" v-if="others.length > 0">
                    <div class="card-body">
                        <select name="" id="" class="form-select" v-model="bagian" @change="changeBagian">
                            <option value="" disabled selected>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 5l0 14"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg>
                                Tambahkan bagian ekstra
                            </option>
                            <option v-for="(l,idx) in others" :key="idx" :value="l">{{ l }}</option>
                        </select>
                    </div>
                </div>

                <div class="text-center text-muted mt-4" v-if="profile.person">
                    <nuxt-link class="btn btn-primary btn-lg" :to="'/cvbuilder/'+profile.person.data.id+'/template'">
                        Langkah Selanjutnya &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                    </nuxt-link>
                </div>

                <div class="text-center text-muted mt-3" v-if="profile.person">
                    <nuxt-link :to="'/cvbuilder/'+profile.person.data.id+'/detail'" class="text-link text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M15 6l-6 6l6 6"></path>
                        </svg> &nbsp;
                        Langkah Sebelumnya
                    </nuxt-link>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import card_descriptionVue from '~/components/webcv/cv/card_description.vue'
import card_pengalaman_kerjaVue from '~/components/webcv/cv/card_pengalaman_kerja.vue'
import card_pendidikanVue from '~/components/webcv/cv/card_pendidikan.vue'
import card_minatVue from "~/components/webcv/cv/card_minat.vue"
import card_keahlianVue from '~/components/webcv/cv/card_keahlian.vue'
import card_bahasaVue from "~/components/webcv/cv/card_bahasa.vue"
import card_kursusVue from "~/components/webcv/cv/card_kursus.vue"
import card_pencapaianVue from "~/components/webcv/cv/card_pencapaian.vue"
import card_publikasiVue from '~/components/webcv/cv/card_publikasi.vue'
import card_projectVue from '~/components/webcv/cv/card_project.vue'
import card_sosmedVue from '~/components/webcv/cv/card_sosmed.vue'

export default{
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
        await store.dispatch('person/get_social_media')
    },
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "edit_cvbuilder")
            {
                return true
            }
        }

        return false
    },
    components:{
        card_descriptionVue,
        card_pengalaman_kerjaVue,
        card_pendidikanVue,
        card_minatVue,
        card_keahlianVue,
        card_bahasaVue,
        card_kursusVue,
        card_pencapaianVue,
        card_publikasiVue,
        card_projectVue,
        card_sosmedVue
    },
    computed:{
        ...mapState('person',{
            loading: state => state.loading,
            profile: state => state.profile,
            message: state => state.message,
            messageclass: state => state.messageclass,
            availables: state => state.availables,
            others: state => state.others,
            semua: state => state.semua,
            sosmeds: state => state.sosmeds
        })
    },
    data(){
        return {
            current_step:1,
            bagian:''
        }
    },
    methods:{
        ...mapActions('person',['get_data','change_bagian']),

        classStep(id){
            var asli = 'step-item'

            if(this.current_step == id)
            {
                asli = 'step-item active'
            }

            return asli
        },

        changeBagian(){
            this.change_bagian(this.bagian)
            this.bagian = ''
        }
    }
}
</script>