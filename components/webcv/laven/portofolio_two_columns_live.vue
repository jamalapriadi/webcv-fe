<template>
    <div>

        <!-- Portfolio Grid -->
        <div class="row">
            <div class=" col-xs-12 col-sm-12 ">
                <!-- Portfolio Content -->
                <div id="portfolio_content_q" class="portfolio-content">
                    
                    <div :class="class_title" v-if="lists">

                        <!-- Portfolio Item 1 -->
                        <figure v-for="(l,idx) in lists.data" :key="idx" class="item standard mb-5">
                            <div class="portfolio-item-img">
                                <img :src="l.featured_image" :alt="l.title" :title="l.title"
                                v-bind:style="[
                                    title == 'portofolio_two_columns'
                                    ?
                                        {
                                            width:'574px',
                                            height:'382px'
                                        }
                                    :
                                        title == 'portofolio_three_columns'
                                        ?
                                            {
                                                width:'377px',
                                                height:'251px'
                                            }
                                        :

                                            title == 'portofolio_four_columns'
                                            ?
                                                {
                                                    width:'279px',
                                                    height:'186px'
                                                }
                                            :
                                                title == 'portofolio_five_columns'
                                                ?
                                                    {
                                                        width:'220px',
                                                        height:'147px'
                                                    }
                                                :
                                                    {
                                                        width:'auto',
                                                        height:'auto'
                                                    }
                                ]" />
                            </div>

                            <i class="far fa-file-alt"></i>
                            <nuxt-link :to="'/u/'+profile.slug+'/portofolio/'+l.slug">
                                <h4 class="name">{{ l.title }}</h4>
                            </nuxt-link>
                            
                            <span class="category">Detailed</span>
                        </figure>
                        <!-- /Portfolio Item 1 -->

                    </div>

                    <div class="text-center" v-if="meta">
                        <div v-if="meta.pagination">
                            <div v-if="meta.pagination.links">
                                <div class="flex justify-center mt-6">
                                    <a href="#" v-if="meta.pagination.links.next" 
                                        class="btn btn-primary"
                                        @click.prevent="selanjutnya"
                                    >
                                        Load more ..
                                    </a>
                                </div>
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
    props:['user_id','class_title','title','profile'],
    data(){
        return {
            lists:[],
            detail:{},
            meta:{},
            current_page:1,
            per_page:6,
            search:'',
            sortBy:'created_at',
            sortByDesc:false,
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
        getData(){
            var params = {
                per_page: this.per_page,
                page: this.current_page,
                q: this.search,
                sortby: this.sortBy,
                sortbydesc: this.sortByDesc ? 'DESC':'ASC',
                user_id: this.user_id,
                type:'portofolio'
            }

            this.$axios.get('/post-by-user/'+this.user_id,{params})
                .then(resp => {
                    this.lists = resp.data

                    if(resp.data.meta)
                    {
                        this.meta = resp.data.meta
                    }
                })
        },

        selanjutnya(){
            this.per_page = parseInt(this.per_page)+6

            this.getData()
        },

        detailNews(l){
            this.detail = l
        },
    }
}
</script>