<template>
    <div>

        <div class="row" v-if="lists">
            <div class=" col-xs-12 col-sm-12 " v-if="lists.data">

                <div class="blog-masonry three-columns clearfix">
                    <!-- Blog Post 1 -->
                    <div v-for="(l,idx) in lists.data" :key="idx" class="item">
                        <div class="blog-card">
                            <div class="media-block">
                                <div class="category" v-if="l.category">
                                    <span v-if="l.category.data">
                                        <span v-for="(l,idx) in l.category.data" :key="idx">
                                            <a v-if="idx == 0" href="#" :title="l.name">{{ l.name }}</a>
                                        </span>
                                    </span>
                                </div>
                                <a href="#" v-if="l.featured_image" @click.prevent="detailNews(l)">
                                    <img :src="l.featured_image" :alt="l.title" :title="l.title" style="height:173px;width:369px">
                                    <div class="mask"></div>
                                </a>
                            </div>
                            <div class="post-info" style="height:100px">
                                <div class="post-date">{{ l.updated_at_human }}</div>
                                <a href="#" @click.prevent="detailNews(l)">
                                    <h4 class="blog-item-title">{{ l.title }}</h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-center" v-if="meta">
                    <div v-if="meta.pagination">
                        <div v-if="meta.pagination.links">
                            <a v-if="meta.pagination.links.next" @click.prevent="selanjutnya" class="btn btn-primary" href="#">Next</a>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['user_id'],
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
                type:'artikel'
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
        }
    }
}
</script>