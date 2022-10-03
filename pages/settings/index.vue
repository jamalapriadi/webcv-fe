<template>
    <div>
        <div class="page-body">
            <div class="container-xl">

                <div class="page-header d-print-none">
                    <div class="row g-2 align-items-center">
                        <div class="col">
                            <!-- Page pre-title -->
                            <div class="page-pretitle">
                                Page
                            </div>
                            <h2 class="page-title">
                                Settings
                            </h2>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-12 col-md-3 px-4" style="padding-left:0px !important">
                        <div class="list-group list-group-transparent mb-3 ml-3">
                            <a href="#" v-bind:class="getClassSidebar('profile')" @click.prevent="changeSidebar('profile')">
                                Profile
                            </a>
                            <a href="#" v-bind:class="getClassSidebar('sandi')" @click.prevent="changeSidebar('sandi')">
                                Kata Sandi
                            </a>
                            <!-- <a href="#" v-bind:class="getClassSidebar('sosmed')" @click.prevent="changeSidebar('sosmed')">
                                Social Media Account
                            </a>
                            <a href="#" v-bind:class="getClassSidebar('history')" @click.prevent="changeSidebar('history')">
                                Riwayat Masuk
                            </a> -->
                        </div>
                    </div>

                    <div class="col-12 col-md-9">
                        <div class="row">
                            <div class="col-12">
                                <div v-if="active_sidebar == 'profile'">
                                    <div class="card">
                                        <div class="card-header">Pengaturan Profile</div>
                                        <div class="card-body">
                                            <profileVue></profileVue>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="active_sidebar == 'sandi'">
                                    <div class="card">
                                        <div class="card-header">Setting Password</div>
                                        <div class="card-body">
                                            <passwordVue></passwordVue>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="active_sidebar == 'sosmed'">
                                    <h1>Sosmed</h1>
                                </div>

                                <div v-if="active_sidebar == 'history'">
                                    <h1>History</h1>
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
import passwordVue from '~/components/profile/password.vue'
import profileVue from '~/components/profile/profile.vue'
export default {
    layout:'main',
    components:{
        passwordVue,
        profileVue
    },
    data(){
        return {
            active_sidebar:'profile',
        }
    },
    methods:{
        getClassSidebar(type){
            var defaultClass = 'list-group-item list-group-item-action d-flex align-items-center'  

            if(this.active_sidebar == type){
                defaultClass = 'list-group-item list-group-item-action d-flex align-items-center active'  
            }

            return defaultClass;
        },

        changeSidebar(type){
            this.active_sidebar = type
        },
    }
}
</script>