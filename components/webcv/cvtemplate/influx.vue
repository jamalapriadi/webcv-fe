<template>
    <div v-if="person">
        <div class="card" v-bind:style="{
                background:'#373d48',
                border:'none',
                'box-shadow':'none',
                'border-radius':'0'
            }">
            <div class="card-body">
                <div v-bind:style="{
                    background:'#373d48',
                    color:'white',
                    border:'none'
                }">
                    <h1>{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                    <h3>{{ person.profesi }}</h3>

                    <div class="row mt-1">
                        <div class="col-6">
                            <p>
                                <strong>{{ $bahasa.showCardLabel({label:'Telepon',negara:person.cv_bahasa}) }}</strong> :  {{ person.telp }}
                            </p>
                            <p>
                                <strong>{{ $bahasa.showCardLabel({label:'Email',negara:person.cv_bahasa}) }}</strong> :  {{ person.email }}
                            </p>
                        </div>

                        <div class="col-6">
                            <p v-if="person.linkedin">
                                <strong>{{ $bahasa.showLabel({label:'Linkedin',negara:person.cv_bahasa}) }}</strong> :  <a :href="person.linkedin" target="_blank">{{ person.linkedin }}</a>
                            </p>
                            <p v-if="person.website">
                                <strong>{{ $bahasa.showLabel({label:'Website',negara:person.cv_bahasa}) }}</strong> :  <a :href="person.website" target="_blank">{{ person.website }}</a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div class="card-body" v-bind:style="{
                background:'white',
                border:'none'
            }">
                <p class="mt-1" v-html="person.description"></p>

                <div class="row mt-1">
                    <div class="col-12">
                        <div v-if="person.pengalaman && person.pengalaman.data.length > 0">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pengalaman Kerja',negara:person.cv_bahasa}) }}</h3>
                            <div class="row mb-2" v-for="(l,idx) in person.pengalaman.data" :key="idx">
                                <div class="col-4">
                                    <strong>{{ l.periode }}</strong>
                                    <div class="text-muted">{{ l.lama }}</div>
                                </div>
                                <div class="col-8">
                                    <div class="text-truncate">
                                        <strong>{{ l.posisi_kerja }}</strong>
                                    </div>
                                    <div class="text-muted">{{ l.perusahaan }}</div>
                                    <div class="text-muted" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.pendidikan && person.pendidikan.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pendidikan',negara:person.cv_bahasa}) }}</h3>
                            <div class="row mb-2" v-for="(l,idx) in person.pendidikan.data" :key="idx">
                                <div class="col-4">
                                    <strong>{{ l.periode }}</strong>
                                </div>
                                <div class="col-8">
                                    <div class="text-truncate">
                                        <strong>{{ l.gelar }}</strong>
                                    </div>
                                    <div class="text-muted">{{ l.sekolah }}</div>
                                    <div class="text-muted" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.kursus && person.kursus.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Kursus',negara:person.cv_bahasa}) }}</h3>
                            <div class="row mb-2" v-for="(l,idx) in person.kursus.data" :key="idx">
                                <div class="col-4">
                                    <strong>{{ l.periode }}</strong>
                                </div>
                                <div class="col-8">
                                    <div class="text-truncate">
                                        <strong>{{ l.kursus }}</strong>
                                    </div>
                                    <div class="text-muted">{{ l.institusi }}</div>
                                    <div class="text-muted" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.publikasi && person.publikasi.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Publikasi',negara:person.cv_bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.publikasi.data" :key="idx">
                                    <span v-html="l.publikasi"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.pencapaian && person.pencapaian.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pencapaian',negara:person.cv_bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.pencapaian.data" :key="idx">
                                    <span v-html="l.pencapaian"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.minat && person.minat.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Hobi',negara:person.cv_bahasa}) }}</h3>
                            <div class="row">
                                <div class="col-auto" v-for="(l,idx) in person.minat.data" :key="idx">
                                    <a href="#" class="btn" style="border:none">
                                        {{ l.hobi }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.sosmed && person.sosmed.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Links /  Social Media</h3>
                            
                            <div class="row g-3 align-items-center" v-for="(l,idx) in person.sosmed.data" :key="idx">
                                <div class="col-auto" v-if="l.sosmed.data">
                                    <span class="avatar" v-html="l.sosmed.data.icon"></span>
                                </div>
                                <div class="col text-truncate">
                                    <span class="text-reset d-block text-truncate" v-if="l.sosmed.data">{{ l.sosmed.data.nama }}</span>
                                    <div class="text-muted text-truncate mt-11">
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