<template>
    <div v-if="person" class="mt-3">
        <div class="block-title">
            <h2>Certificates</h2>
        </div>

        <div class="row" v-if="person.kursus">
            <div class=" col-xs-12 col-sm-6" v-for="(l,idx) in person.kursus.data" :key="idx">
                <a href="#" class="lightbox">
                    <div class="certificate-item clearfix">
                        <!-- <div class="certi-logo">
                            <img src="./img/clients/client-7.png" alt="logo">
                        </div> -->

                        <div class="certi-content">
                            <div class="certi-title">
                                <h4>{{ l.kursus }}</h4>
                            </div>

                            <div class="certi-id">
                                <span v-html="l.description"></span>
                            </div>
                            <div class="certi-date">
                                <span>{{ l.periode }}</span>
                            </div>

                            <div class="certi-company">
                                <span>{{ l.institusi }}</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['person']
}
</script>