<template>
    <div v-if="person" class="mt-4">
        <div v-if="person.pendidikan">
            <div class="block-title">
                <h2>{{ title }}</h2>
            </div>

            <div v-if="person.pendidikan.data" id="timeline_2" class="timeline clearfix">
                <div v-for="(l,idx) in person.pendidikan.data" :key="idx" class="timeline-item clearfix">
                    <h5 class="item-period current">{{ l.periode }}</h5>
                    <span class="item-company">{{ l.lama }}</span>
                    <h4 class="item-title">
                        {{ l.gelar }}
                        <br>
                        <div class="text-muted">{{ l.sekolah }}</div>
                    </h4>
                    <p v-if="l.description" v-html="l.description"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['title','person']
}
</script>