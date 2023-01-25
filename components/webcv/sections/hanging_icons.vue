<template>
    <div>
        <div class="container px-4 py-3 bg-white my-5" id="hanging-icons">
            <h2 class="pb-2 border-bottom">{{ title }}</h2>
            <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                <div class="col d-flex align-items-start" v-for="(l,idx) in lists" :key="idx">
                    <div class="icon-square bg-light text-dark flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
                    </div>
                    <div>
                        <h2>{{ l.title }}</h2>
                        <p v-html="l.description"></p>
                        <!-- <a href="#" class="btn btn-primary">
                            Primary button
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['title','lists']
}
</script>