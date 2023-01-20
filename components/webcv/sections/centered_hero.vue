<template>
    <div v-if="fields">
        <div class="px-4 py-5 text-center bg-white">
            <div v-for="(l,idx) in fields" :key="idx">
                <img v-if="l.type == 'image'" class="d-block mx-auto mb-4" :src="l.value" alt="" width="72" height="57">
                <h1 v-if="l.type == 'text'" class="display-5 fw-bold">{{ l.value }}</h1>
                <div class="col-lg-6 mx-auto">
                    <p v-if="l.type == 'textarea'" class="lead mb-4" v-html="l.value"></p>
                    <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    props:['fields']
}
</script>