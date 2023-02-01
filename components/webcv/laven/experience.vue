<template>
    <div v-if="person" class="mt-4">
        <div v-if="person.pengalaman">
            <div class="block-title">
                <h2>{{ title }}</h2>
            </div>

            <div v-if="person.pengalaman.data" id="timeline_2" class="timeline clearfix">
                <div v-for="(l,idx) in person.pengalaman.data" :key="idx" class="timeline-item clearfix">
                    <h5 class="item-period current">{{ l.periode }}</h5>
                    <span class="item-company">{{ l.lama }}</span>
                    <h4 class="item-title">
                        {{ l.posisi_kerja }}
                        <br>
                        <div class="text-muted">{{ l.perusahaan }}</div>
                    </h4>
                    <p v-html="l.description"></p>
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