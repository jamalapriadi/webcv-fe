<template>
    <div>

        <div class="row">
            <div class="col-xs-12 col-sm-12">
                <div class="p-20"></div>
                <!-- Testimonials -->
                <div class="block-title">
                    <h2>{{ title }}</h2>
                </div>

                <div id="clients_1" class="clients owl-carousel" data-mobile-items="1" data-tablet-items="3" data-items="6">
                    <div class="client-block" v-for="(l,idx) in list" :key="idx">
                        <a :href="l.website" target="_blank" :title="l.title">
                            <img :src="l.file_preview" :alt="l.title">
                        </a>
                    </div>
                </div>
                <!-- /Clients Slider -->
                <div class="p-40"></div>
            </div>
        </div>

    </div>
</template>

<script>
export default{
    props:['title','list']
}
</script>