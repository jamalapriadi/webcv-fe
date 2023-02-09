<template>
    <div v-if="person" id="home_content" class="home-content third-style">
        <div class="start-page-full-width">
            <div class="row">
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="inner-content">
                        <div class="fill-block">
                            <img :src="person.foto" alt="">
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-6">
                    <div class="inner-content inner-text-block">
                        <div class="hp-text-block">
                            <div class="owl-carousel text-rotation">                                    
                                <!-- <div class="item">
                                    <div class="sp-subtitle">Web Designer</div>
                                </div> -->
                                <div class="item">
                                    <div class="sp-subtitle">{{ person.profesi }}</div>
                                </div>
                            </div>
                            
                            <h2 class="hp-main-title">{{ person.nama_depan }} {{ person.nama_belakang }}</h2>
                            <p style="text-align:justify" v-html="person.description"></p>

                            <div class="hp-buttons" v-if="ijin_download_cv == 'Y'">
                                <a href="#" @click.prevent="downloadCv" target="_blank" class="btn btn-primary">Download CV</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:{
        person:{
            type:Object
        },
        ijin_download_cv:{
            type:String,
            default:'Y'
        }
    },
    methods:{
        downloadCv(){
            this.$emit('downloadCv')
        }
    }
}
</script>