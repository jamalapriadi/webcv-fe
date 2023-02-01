<template>
    <div class="row" v-if="person">
        <div class=" col-xs-12 col-sm-12">
            <div class="home-content">
                <div class="row flex-v-align">
                    
                    <div class="col-sm-12 col-md-5 col-lg-5">
                        <div class="home-photo">
                            <div class="hp-inner" v-bind:style="{
                                backgroundImage:'url('+person.foto+')'
                            }"></div>
                        </div>
                    </div>

                    <div class="col-sm-12 col-md-7 col-lg-7">
                        <div class="home-text hp-left">
                            <div class="owl-carousel text-rotation">                                    
                                <div class="item">
                                    <h4>{{ person.profesi }}</h4>
                                </div>
                            </div>
                            
                            <h1>{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                            <p style="text-align:justify" v-html="person.description"></p>
                                
                            <h1>{{ person.ijin_download_cv }}</h1>
                            <div class="home-buttons">
                                <a href="#" v-if="ijin_download_cv == 'Y'" @click.prevent="downloadCv" target="_blank" class="btn btn-primary">Download CV</a>
                                <a href="#" target="_self" class="btn btn-secondary">Contact</a>
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