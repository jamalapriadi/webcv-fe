<template>
    <div v-if="person">
        <div class="card example" style="height:430px;overflow:scroll">
            <div class="card-body">
                <h1 class="title_cv">{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                <h3 class="subtitle_cv">{{ person.profesi }}</h3>

                <p class="mt-1 desc_cv" v-html="person.description"></p>

                <div class="row mt-1">
                    <div class="col-4" style="padding-right: 5px;">
                        <div>
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showLabel({label:'Detail Pribadi',negara:person.bahasa}) }}</h3>
                            <p class="mt-1 desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Alamat',negara:person.bahasa}) }}</strong>
                                <br>
                                {{ person.alamat }}
                                <br>
                                <span v-if="person.kota">{{ person.kota }}</span>
                            </p>
                            <p class="desc_cv" v-if="person.phone">
                                <strong>{{ $bahasa.showCardLabel({label:'Telepon',negara:person.bahasa}) }}</strong>
                                <br>
                                {{ person.phone }}
                            </p>
                            <p class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Email',negara:person.bahasa}) }}</strong>
                                <br>
                                {{ person.email }}
                            </p>
                            <p v-if="person.jk" class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Jenis Kelamin',negara:person.bahasa}) }}</strong>
                                <br>
                                <span v-if="person.jk == 'L'">{{ $bahasa.showCardLabel({label:'Laki-Laki',negara:person.bahasa}) }}</span>
                                <span v-if="person.jk == 'P'">{{ $bahasa.showCardLabel({label:'Perempuan',negara:person.bahasa}) }}</span>
                            </p>
                            <p v-if="person.tempat_lahir || person.tanggal_lahir" class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Tempat, Tanggal Lahir',negara:person.bahasa}) }}</strong>
                                <br>
                                <span v-if="person.tempat_lahir">{{ person.tempat_lahir }}</span>
                                <br>
                                <span v-if="person.tanggal_lahir">{{ person.tanggal_lahir }}</span>
                            </p>
                            <p v-if="person.status_pernikahan" class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Status Pernikahan',negara:person.bahasa}) }}</strong>
                                <br>
                                {{ person.status_pernikahan }}
                            </p>
                            <p v-if="person.kebangsaan" class="desc_cv">
                                <strong>{{ $bahasa.showCardLabel({label:'Kebangsaan',negara:person.bahasa}) }}</strong>
                                <br>
                                {{ person.kebangsaan }}
                            </p>
                            <p v-if="person.linkedin" class="desc_cv">
                                <strong>{{ $bahasa.showLabel({label:'Linkedin',negara:person.bahasa}) }}</strong>
                                <br>
                                <a :href="person.linkedin" target="_blank">{{ person.linkedin }}</a>
                            </p>
                            <p v-if="person.website" class="desc_cv">
                                <strong>{{ $bahasa.showLabel({label:'Website',negara:person.bahasa}) }}</strong>
                                <br>
                                <a :href="person.website" target="_blank">{{ person.website }}</a>
                            </p>
                            
                        </div>

                        <div class="mt-1" v-if="person.keahlian && person.keahlian.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Keahlian',negara:person.bahasa}) }}</h3>
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.keahlian" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate desc_cv"><strong>{{ l.keahlian }}</strong></a>
                                    <div class="text-muted text-truncate mt-11 desc_cv">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-1" v-if="person.bahasa && person.bahasa.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Bahasa',negara:person.bahasa}) }}</h3>
                            
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.bahasa" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate desc_cv"><strong>{{ l.bahasa }}</strong></a>
                                    <div class="text-muted text-truncate mt-11 desc_cv">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-8" style="padding-right: 5px;">
                        <div v-if="person.pengalaman && person.pengalaman.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pengalaman Kerja',negara:person.bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.pengalaman" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.tanggal_mulai }}</strong>
                                    <div class="text-muted desc_cv">{{ l.tanggal_selesai }}</div>
                                </div>
                                <div class="col-6">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.posisi }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.perusahaan }}</div>
                                    <div class="text-muted desc_cv" v-html="l.deskripsi"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.pendidikan && person.pendidikan.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pendidikan',negara:person.bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.pendidikan" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.tanggal_mulai }}</strong>
                                </div>
                                <div class="col-auto">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.gelar }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.sekolah }}</div>
                                    <div class="text-muted desc_cv" v-html="l.deskripsi"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.kursus && person.kursus.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Kursus',negara:person.bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.kursus" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.tanggal_mulai }}</strong>
                                </div>
                                <div class="col-auto">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.kursus }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.institusi }}</div>
                                    <div class="text-muted desc_cv" v-html="l.deskripsi"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.publikasi && person.publikasi.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Publikasi',negara:person.bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.publikasi" :key="idx">
                                    <span class="desc_cv" v-html="l.publikasi"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.pencapaian && person.pencapaian.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pencapaian',negara:person.bahasa}) }}</h3>
                            <ul>
                                <li v-for="(l,idx) in person.pencapaian" :key="idx">
                                    <span class="desc_cv" v-html="l.pencapaian"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.minat && person.minat.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Hobi',negara:person.bahasa}) }}</h3>
                            <div class="row">
                                <div class="col-auto" v-for="(l,idx) in person.minat" :key="idx">
                                    <a href="#" class="btn desc_cv" style="border:none">
                                        {{ l.hobi }}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.sosmed && person.sosmed.length > 0" class="mt-1">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Links /  Social Media</h3>
                            
                            <div class="row g-3 align-items-center" v-for="(l,idx) in person.sosmed" :key="idx">
                                <div class="col-auto" v-if="l.sosmed">
                                    <span class="avatar desc_cv" style="width:20px;height:20px" v-html="l.sosmed.icon"></span>
                                </div>
                                <div class="col text-truncate">
                                    <span class="text-reset d-block text-truncate desc_cv" v-if="l.sosmed">{{ l.sosmed.nama }}</span>
                                    <div class="text-muted text-truncate" style="line-height: 10px;">
                                        <a class="desc_cv" href="#" :href="l.link_social_media" target="_blank">{{ l.link_social_media }}</a>
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