<template>
    <div>
        <div class="bg-dark text-secondary px-4 py-5 text-center">
            <div class="py-5">
                <h1 class="display-5 fw-bold text-white">{{ title }}</h1>
                <div class="col-lg-6 mx-auto">
                    <p class="fs-5 mb-4" v-html="description"></p>
                    <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
                        <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
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