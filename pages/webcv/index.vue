<template>
    <div v-if="$auth.user && $auth.user.data">
        <div  v-if="$auth.user.data.webcv && $auth.user.data.webcv.data">
            <!-- <pre>{{$auth.user.data}}</pre> -->
            <link_nav_top_webcvVue></link_nav_top_webcvVue>

            <div class="container-fluid mt-4">
                <div class="card" style="border:none;background:transparent;box-shadow:none">
                    <ul class="nav nav-tabs nav-tabs-alt" data-bs-toggle="tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a href="#tabs-home-10" class="nav-link active" data-bs-toggle="tab" aria-selected="true" role="tab">Menus / Pages</a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a href="#tabs-profile-10" class="nav-link" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Customization</a>
                        </li>
                        <!-- <li class="nav-item" role="presentation">
                            <a href="#tabs-performace-11" class="nav-link" data-bs-toggle="tab" aria-selected="false" role="tab" tabindex="-1">Performance</a>
                        </li>
                        <li class="nav-item ms-auto" role="presentation">
                            <a href="#tabs-feedback-11" class="nav-link" title="Feedback" data-bs-toggle="tab" aria-selected="false" tabindex="-1" role="tab">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3"></path>
                                    <line x1="8" y1="9" x2="16" y2="9"></line>
                                    <line x1="8" y1="13" x2="14" y2="13"></line>
                                </svg>
                                &nbsp;  Leave Feedback
                            </a>
                        </li> -->
                    </ul>

                    <div class="card-body">
                        <div class="tab-content">
                            <div class="tab-pane active show" id="tabs-home-10" role="tabpanel">
                                <list_menu_cardVue :webcv="$auth.user.data.webcv.data.id"></list_menu_cardVue>
                            </div>

                            <div class="tab-pane" id="tabs-profile-10" role="tabpanel">
                                <div class="card">
                                    <div class="card-body">
                                        <edit_customizationVue v-if="renderCustomize" :list="$auth.user.data.webcv.data" @suksesUpdateCustomize="handleSuksesUpdateCustomize"></edit_customizationVue>
                                    </div>
                                </div>
                            </div>

                            <div class="tab-pane" id="tabs-performace-11" role="tabpanel">
                                <div>Performance</div>
                            </div>
                            <div class="tab-pane" id="tabs-feedback-11" role="tabpanel">
                                <div>Feedback</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="page-body">
                <div class="container-xl">
                    <div style="margin-top:15px;border:none" class="empty card">
                        <img src="~/static/illustrations/undraw_work_together_h63l.svg" height="228" alt="">
                        <p class="empty-title mt-4">Showcase your WebCv</p>
                        <p class="empty-subtitle text-muted">
                            Display your most important WebCv on one simple page. Then share one simple Web Cv to get people there.
                        </p>
                        <div class="empty-action">
                            <a href="#" class="btn btn-primary d-none d-sm-inline-block" @click.prevent="addNewWebcv">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Create a webcv
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <b-modal
                ref="modal-webcv"
                id="modal-webcv"
                size="lg"
                no-close-on-backdrop
                hide-footer
                :modal-class="'modal modal-blur fade'" 
                :dialog-class="'modal-dialog modal-dialog-centered'"
                title="Create a Webcv"
            >
                <div v-if="profile">
                    <div v-if="profile.success == true">
                        <create_new_webcvVue
                            @batal="handleBatal"
                            @suskesWebcv="handleSuksesWebcv"
                            :person="profile.person"></create_new_webcvVue>
                    </div>

                    <div v-if="profile.success == true">
                        
                    </div>
                </div>
                
            </b-modal>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    import create_new_webcvVue from "~/components/webcv/create_new_webcv.vue"
    import link_nav_top_webcvVue from "~/components/webcv/link_nav_top_webcv.vue"
    import list_menu_cardVue from "~/components/webcv/menu/list_menu_card.vue"
    import edit_customizationVue from "~/components/webcv/edit_customization.vue"
    export default{
        layout:'main',
        async fetch({store, params}){
            await store.dispatch('person/get_data')
        },
        computed:{
            ...mapState('person',{
                profile: state => state.profile,
            })
        },
        components:{
            create_new_webcvVue,
            link_nav_top_webcvVue,
            list_menu_cardVue,
            edit_customizationVue
        },
        data(){
            return {
                renderCustomize:true
            }
        },
        methods:{
            addNewWebcv(){
                this.$bvModal.show("modal-webcv");
            },

            handleBatal(){
                this.$bvModal.hide("modal-webcv");
            },

            handleSuksesWebcv(){
                this.$auth.fetchUser()
                this.$bvModal.hide("modal-webcv");

            },

            handleSuksesUpdateCustomize(){
                this.$auth.fetchUser()
            }
        }
    }
</script>

<style scoped>
.nav-tabs-alt .nav-link {
    font-size: 13px;
    font-weight: 600;
    text-transform: none;
}

.nav-tabs{
    border-left: none;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    color: #1b5ba7;
    background-color: transparent;
    border-left: 0;
    border-top:0;
    border-right: 0;
    border-bottom: 2px solid #1e293b;
    /* border-color: #dee2e6 #dee2e6 #fff; */
}
</style>