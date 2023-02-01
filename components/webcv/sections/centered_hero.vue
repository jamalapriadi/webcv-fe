<template>
    <div>
        <div class="px-4 py-5 text-center bg-white">
            <img class="d-block mx-auto mb-4 mb-3 avatar-rounded" :src="img" alt="" style="width:174px;height:174px">
            <h1 class="display-5 fw-bold">{{ title }}</h1>
            <div class="col-lg-6 mx-auto">
                <p class="lead mb-4" v-html="description"></p>
                <!-- <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                    <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
                </div> -->
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