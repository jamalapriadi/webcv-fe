<template>
    <div v-if="person">
        <div class="card" v-bind:style="{
                background:'#373d48',
                border:'none',
                'box-shadow':'none',
                'border-radius':'0',
            }">
            <div class="">
                <div v-bind:style="{
                    background:'#373d48',
                    color:'white',
                    border:'none',
                    paddingLeft:'20px',
                    paddingTop:'20px'
                }">
                    <h1 class="title_cv">{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                    <h3 class="subtitle_cv">{{ person.profesi }}</h3>

                    <div class="row mt-1">
                        <div class="col-6">
                            <p class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Telepon',negara:person.cv_bahasa}) }}</strong> :  <br>{{ person.telp }}
                            </p>
                            <p class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Email',negara:person.cv_bahasa}) }}</strong> :  <br>{{ person.email }}
                            </p>
                        </div>

                        <div class="col-6">
                            <p v-if="person.linkedin" class="desc_cv">
                                <strong>{{ $bahasa.showLabel({label:'Linkedin',negara:person.cv_bahasa}) }}</strong> :  <br><a :href="person.linkedin" target="_blank">{{ person.linkedin }}</a>
                            </p>
                            <p v-if="person.website" class="desc_cv">
                                <strong>{{ $bahasa.showLabel({label:'Website',negara:person.cv_bahasa}) }}</strong> :  <br><a :href="person.website" target="_blank">{{ person.website }}</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="card example" v-bind:style="{
            height:'300px',
            overflow:'scroll'
        }">
            <div class="card-body" v-bind:style="{
                background:'white !important',
                border:'none'
            }">
                <p class="mt-1 desc_cv" v-html="person.description"></p>

                <div class="row mt-1 bg-white">
                    <div class="col-12">
                        <div v-if="person.pengalaman && person.pengalaman.data.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pengalaman Kerja',negara:person.cv_bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.pengalaman.data" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.periode }}</strong>
                                    <div class="text-muted desc_cv">{{ l.lama }}</div>
                                </div>
                                <div class="col-6">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.posisi_kerja }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.perusahaan }}</div>
                                    <div class="text-muted desc_cv" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.project && person.project.data.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Project',negara:person.cv_bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.project.data" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.periode }}</strong>
                                    <!-- <div class="text-muted desc_cv">{{ l.lama }}</div> -->
                                </div>
                                <div class="col-6">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.nama_project }}</strong>
                                    </div>
                                    <!-- <div class="text-muted desc_cv">{{ l.perusahaan }}</div> -->
                                    <div class="text-muted desc_cv" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.pendidikan && person.pendidikan.data.length > 0" class="mt-1 bg-white">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pendidikan',negara:person.cv_bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.pendidikan.data" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.periode }}</strong>
                                </div>
                                <div class="col-auto">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.gelar }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.sekolah }}</div>
                                    <div class="text-muted desc_cv" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.kursus && person.kursus.data.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Kursus',negara:person.cv_bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.kursus.data" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.periode }}</strong>
                                </div>
                                <div class="col-auto">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.kursus }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.institusi }}</div>
                                    <div class="text-muted desc_cv" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.publikasi && person.publikasi.data.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Publikasi',negara:person.cv_bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.publikasi.data" :key="idx">
                                    <span class="desc_cv" v-html="l.publikasi"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.pencapaian && person.pencapaian.data.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pencapaian',negara:person.cv_bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.pencapaian.data" :key="idx">
                                    <span class="desc_cv" v-html="l.pencapaian"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.minat && person.minat.data.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Hobi',negara:person.cv_bahasa}) }}</h3>
                            <div class="row">
                                <div class="col-auto" v-for="(l,idx) in person.minat.data" :key="idx">
                                    <a href="#" class="btn desc_cv" style="border:none">
                                        {{ l.hobi }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.sosmed && person.sosmed.data.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Links /  Social Media</h3>
                            
                            <div class="row g-3 align-items-center" v-for="(l,idx) in person.sosmed.data" :key="idx">
                                <div class="col-auto" v-if="l.sosmed.data">
                                    <span class="avatar" style="width:20px; height:20px" v-html="l.sosmed.data.icon"></span>
                                </div>
                                <div class="col text-truncate">
                                    <span class="text-reset d-block text-truncate desc_cv" v-if="l.sosmed.data">{{ l.sosmed.data.nama }}</span>
                                    <div class="text-muted text-truncate desc_cv">
                                        <a href="#" :href="l.link_social_media" target="_blank">{{ l.link_social_media }}</a>
                                    </div>
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
    props:['person']
}
</script>

<style>
h1.title_cv{
    font-size: 14px;
    line-height: 10px;
}

.subtitle_cv{
    font-size: 10px;
    font-weight: bold;
    line-height: 10px;
}

.desc_cv{
    font-size:7px !important;
    line-height: 10px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>