<template>
    <div>
        <div class="page-body">
            <div class="container-xl">

                <div v-if="loading" class="text-center">
                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                </div>

                <!-- <pre>{{ $auth.user.data }}</pre> -->

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout:'main',
        validate({ params, query, store }) {
            for(var a=0;a<store.$auth.user.data.permissions.length;a++)
            {
                if(store.$auth.user.data.permissions[a].name == "dashboard")
                {
                    return true
                }
            }

            return false
        },
        data(){
            return {
                dashboard:[],
                loading:false
            }
        },
    }
    </script>