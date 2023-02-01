<template>
    <div>
        <div class="row">
            <div class="col-xs-12 col-sm-12">
                <div class="p-50"></div>

                <div class="block-title">
                    <h2>{{ title }}</h2>
                </div>
            </div>
        </div>

        <div class="row" v-if="list">
            <div v-for="(l,idx) in list" :key="idx" class="col-xs-12 col-sm-6">
                <div class="info-list-w-icon">
                    <div class="info-block-w-icon">
                        <div class="ci-icon">
                            <i :class="l.icon"></i>
                        </div>

                        <div class="ci-text">
                            <h4>{{ l.title }}</h4>
                            <p v-html="l.description"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default{
    props:['title','list']
}
</script>