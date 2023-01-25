<template>
    <div>
        <div class="container col-xxl-8 px-4 py-5 bg-white">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <img :src="img" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
                </div>
                <div class="col-lg-6">
                    <h1 class="display-5 fw-bold lh-1 mb-3">{{ title }}</h1>
                    <p class="lead" v-html="description"></p>
                    <!-- <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                        <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                    </div> -->
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