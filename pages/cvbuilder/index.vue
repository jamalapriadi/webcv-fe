<template>
    <div v-if="profile">
        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">

                <div v-if="loading" class="text-center">
                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                </div>

                <pre>{{ profile }}</pre>

            </div>
        </div>

        <div v-else>
            <div class="page-body">
                <div class="container-xl">
                    <div style="margin-top:15px;border:none" class="empty card">
                        <img src="~/static/illustrations/undraw_work_together_h63l.svg" height="228" alt="">
                        <p class="empty-title mt-4">Showcase your CV</p>
                        <p class="empty-subtitle text-muted">
                            Display your most important CV on one simple page. Then share one simple Cv to get people there.
                        </p>
                        <div class="empty-action">
                            <nuxt-link :to="'cvbuilder/create'" class="btn btn-primary d-none d-sm-inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Create a CV
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
export default{
    layout:'main',
    async fetch({store, params}){
        await store.dispatch('person/get_data')
    },
    computed:{
        ...mapState('person',{
            loading: state => state.loading,
            profile: state => state.profile,
            message: state => state.message,
            messageclass: state => state.messageclass,
        })
    }
}
</script>