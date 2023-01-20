<template>
    <div v-if="fields" class="bg-white">
        <div class="accordion" role="tablist">
            <b-card v-for="(l,idx) in fields" :key="idx" no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle="'accordion-'+idx" variant="info">{{ l.title }}</b-button>
                </b-card-header>
                <b-collapse :id="'accordion-'+idx" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-card-text>{{ l.description }}</b-card-text>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </div>
    </div>
</template>


<script>
export default{
    props:['fields'],
}
</script>