<template>
    <div v-if="profile">
        <div class="card" style="border:none">
            <div class="card-body">
                <strong>Detail CV</strong>
            </div>
        </div>

        <div class="page-body" v-if="profile.success == true">
            <div class="container-xl">

                <div v-if="loading" class="text-center">
                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                </div>

                <!-- <p>Refrensi Template : https://zety.com/resume-templates</p> -->

                <div v-if="profile.person" class="card">
                    <div v-if="profile.person.data" class="card-table table-responsive">
                        <table class="table table-vcenter">
                            <thead>
                                <tr>
                                    <th>Nama Depan</th>
                                    <th>Nama Belakang</th>
                                    <th>Email</th>
                                    <th>Telp</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ profile.person.data.nama_depan }}</td>
                                    <td>{{ profile.person.data.nama_belakang }}</td>
                                    <td>{{ profile.person.data.email }}</td>
                                    <td>{{ profile.person.data.telp }}</td>
                                    <td>
                                        <nuxt-link v-if="profile.person.data.cv_template_id" target="_blank" :to="'/cvbuilder/'+profile.person.data.id+'/preview'" class="btn btn-info">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7"></path>
                                            </svg>

                                            Preview
                                        </nuxt-link>
                                    </td>
                                    <td>
                                        <nuxt-link :to="'/cvbuilder/'+profile.person.data.id+'/detail'" class="btn btn-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                                <path d="M16 5l3 3"></path>
                                            </svg>
                                            Customize
                                        </nuxt-link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

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
    validate({ params, query, store }) {
        for(var a=0;a<store.$auth.user.data.permissions.length;a++)
        {
            if(store.$auth.user.data.permissions[a].name == "cvbuilder")
            {
                return true
            }
        }

        return false
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