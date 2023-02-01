<template>
    <div>

        <div class="row">
            <div class="col-xs-12 col-sm-12">
                <div class="p-20"></div>
                <!-- Testimonials -->
                <div class="block-title">
                    <h2>{{ title }}</h2>
                </div>

                <div v-if="list" id="testimonials_1" class="testimonials owl-carousel" data-mobile-items="1" data-tablet-items="2" data-items="2">
                    <!-- Testimonial 1 -->
                    <div class="testimonial-item" v-for="(l,idx) in list" :key="idx">
                        <!-- Testimonial Content -->
                        <div class="testimonial-content">
                            <!-- Picture -->
                            <div class="testimonial-picture">
                                <img :src="l.file_preview" :alt="l.fullname" style="width:80px;height:80px"/>
                            </div>              
                            <!-- /Picture -->

                            <!-- Testimonial Text -->
                            <div class="testimonial-text">
                                <p v-html="l.testimoni"></p>
                            </div>
                            <!-- /Testimonial Text -->

                            <!-- Testimonial author information -->
                            <div class="testimonial-author-info">
                                <h5 class="testimonial-author">{{ l.fullname }}</h5>
                                <p class="testimonial-firm">{{ l.title }}</p>
                            </div>
                            <!-- /Testimonial author information -->

                            <div class="testimonial-icon">
                                <i class="fa fa-quote-left"></i>
                            </div>

                            <div class="testimonial-icon-big">
                                <i class="fa fa-quote-right"></i>
                            </div>
                        </div>
                    <!-- /Testimonial Content -->
                    </div>
                    <!-- End of Testimonial 1 -->
                </div>
                <!-- /Testimonials -->

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