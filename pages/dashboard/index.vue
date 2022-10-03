<template>
    <div>
        <div class="page-body">
            <div class="container-xl">

                <div v-if="loading" class="text-center">
                    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout:'main',
        data(){
            return {
                dashboard:[],
                loading:false
            }
        },
    }
    </script>