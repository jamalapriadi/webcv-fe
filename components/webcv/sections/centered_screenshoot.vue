<template>
    <div>
        <div class="px-4 pt-5 text-center border-bottom bg-white">
            <h1 class="display-4 fw-bold">{{ title }}</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4" v-html="description"></p>
                <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                    <button type="button" class="btn btn-primary btn-lg px-4 me-sm-3">Primary button</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                </div> -->
            </div>
            <div class="overflow-hidden" style="max-height: 30vh;">
                <div class="container px-5">
                    <img :src="img" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default{
    props:{
        img:{
            type:String,
            default:'https://cdn-prod.medicalnewstoday.com/content/images/articles/266/266749/aging-man.jpg'
        },
        title:{
            type:String,
            default:''
        },
        description:{
            type:String,
            default:''
        }
    }
}
</script>