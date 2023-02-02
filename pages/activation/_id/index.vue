<template>
    <div class="px-4 border-bottom">
        <div class="container container-tight py-4">
            <div class="text-center">
                <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    layout:'default',
    auth:false,
    async fetch({store, params}){
        await store.dispatch('registrasi/verifikasi',{
            id: params.id
        })
    },
    computed:{
        ...mapState('registrasi',{
            errors: state=> state.errors,
            isFinish: state => state.isFinish,
            success: state => state.success,
            message: state => state.message,
        })
    }
}
</script>