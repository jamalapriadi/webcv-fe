<template>
    <div v-if="person">
        <div class="card">
            <div class="card-body">
                <h1 class="title_cv">{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                <h3 class="subtitle_cv">{{ person.profesi }}</h3>

                <p class="mt-1 desc_cv" v-html="person.description"></p>

                <div class="row mt-1">
                    <div class="col-4" style="padding-right: 5px;">
                        <div>
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Personal Info</h3>
                            <p class="mt-1 desc_cv">
                                <strong>Address</strong>
                                <br>
                                {{ person.alamat }}
                                <br>
                                <span v-if="person.kota">{{ person.kota }}</span>
                            </p>
                            <p class="desc_cv">
                                <strong>Phone</strong>
                                <br>
                                {{ person.telp }}
                            </p>
                            <p class="desc_cv">
                                <strong>E-mail</strong>
                                <br>
                                {{ person.email }}
                            </p>
                            <p v-if="person.jk" class="desc_cv">
                                <strong>Jenis Kelamin</strong>
                                <br>
                                <span v-if="person.jk == 'L'">Laki-Laki</span>
                                <span v-if="person.jk == 'P'">Perempuan</span>
                            </p>
                            <p v-if="person.tempat_lahir || person.tanggal_lahir" class="desc_cv">
                                <strong>Tempat, Tanggal Lahir</strong>
                                <br>
                                <span v-if="person.tempat_lahir">{{ person.tempat_lahir }}</span>
                                <br>
                                <span v-if="person.tanggal_lahir">{{ person.tanggal_lahir }}</span>
                            </p>
                            <p v-if="person.status_pernikahan" class="desc_cv">
                                <strong>Status Pernikahan</strong>
                                <br>
                                {{ person.status_pernikahan }}
                            </p>
                            <p v-if="person.kebangsaan" class="desc_cv">
                                <strong>Kebangsaan</strong>
                                <br>
                                {{ person.kebangsaan }}
                            </p>
                            <p v-if="person.linkedin" class="desc_cv">
                                <strong>Linkedin</strong>
                                <br>
                                <a :href="person.linkedin" target="_blank">{{ person.linkedin }}</a>
                            </p>
                            <p v-if="person.website" class="desc_cv">
                                <strong>Website</strong>
                                <br>
                                <a :href="person.website" target="_blank">{{ person.website }}</a>
                            </p>
                            
                        </div>

                        <div class="mt-1" v-if="person.keahlian && person.keahlian.data.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Skills</h3>
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.keahlian.data" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate desc_cv"><strong>{{ l.keahlian }}</strong></a>
                                    <div class="text-muted text-truncate mt-11 desc_cv">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-1" v-if="person.bahasa && person.bahasa.data.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Languages</h3>
                            
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.bahasa.data" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate desc_cv"><strong>{{ l.bahasa }}</strong></a>
                                    <div class="text-muted text-truncate mt-11 desc_cv">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-8" style="padding-right: 5px;">
                        <div v-if="person.pengalaman && person.pengalaman.data.length > 0">
                            <h3 class="subtitle_cv" style="border-bottom:1px solid lightgray; padding-bottom:10px;">Experience</h3>
                            <div class="row" v-for="(l,idx) in person.pengalaman.data" :key="idx">
                                <div class="col-auto">
                                    <strong class="desc_cv">{{ l.periode }}</strong>
                                    <div class="text-muted desc_cv">{{ l.lama }}</div>
                                </div>
                                <div class="col-auto">
                                    <div class="text-truncate">
                                        <strong class="desc_cv">{{ l.posisi_kerja }}</strong>
                                    </div>
                                    <div class="text-muted desc_cv">{{ l.perusahaan }}</div>
                                    <div class="text-muted desc_cv" v-html="l.description"></div>
                                </div>
                            </div>
                        </div>

                        <div v-if="person.pendidikan && person.pendidikan.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Education</h3>
                            <div class="row" v-for="(l,idx) in person.pendidikan.data" :key="idx">
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
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Certifications</h3>
                            <div class="row" v-for="(l,idx) in person.kursus.data" :key="idx">
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
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Publikasi</h3>
                            <ul>
                                <li v-for="(l,idx) in person.publikasi.data" :key="idx">
                                    <span v-html="l.publikasi"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.pencapaian && person.pencapaian.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Pencapaian</h3>
                            <ul>
                                <li v-for="(l,idx) in person.pencapaian.data" :key="idx">
                                    <span v-html="l.pencapaian"></span>
                                </li>
                            </ul>
                        </div>

                        <div v-if="person.minat && person.minat.data.length > 0" class="mt-1">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">Interests</h3>
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

<style>
h1.title_cv{
    font-size: 14px;
}

.subtitle_cv{
    font-size: 10px;
    font-weight: bold;
}

.desc_cv{
    font-size:7px !important;
}
</style>