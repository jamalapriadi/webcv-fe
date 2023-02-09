<template>
    <div v-if="person">
        <div class="card" style="border:none">
            <div class="card-body" style="border:none">
                <h1>{{ person.nama_depan }} {{ person.nama_belakang }}</h1>
                <h3>{{ person.profesi }}</h3>

                <p class="mt-1" v-html="person.description"></p>

                <div class="row mt-1">
                    <div class="col-3">
                        <div>
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showLabel({label:'Detail Pribadi',negara:person.cv_bahasa}) }}</h3>
                            <p class="mt-1">
                                <strong>{{ $bahasa.showCardLabel({label:'Alamat',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                {{ person.alamat }}
                                <br>
                                <span v-if="person.kota">{{ person.kota }}</span>
                            </p>
                            <p>
                                <strong>{{ $bahasa.showCardLabel({label:'Telepon',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                {{ person.telp }}
                            </p>
                            <p>
                                <strong>{{ $bahasa.showCardLabel({label:'Email',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                {{ person.email }}
                            </p>
                            <p v-if="person.jk">
                                <strong>{{ $bahasa.showCardLabel({label:'Jenis Kelamin',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                <span v-if="person.jk == 'L'">{{ $bahasa.showCardLabel({label:'Laki-Laki',negara:person.cv_bahasa}) }}</span>
                                <span v-if="person.jk == 'P'">{{ $bahasa.showCardLabel({label:'Perempuan',negara:person.cv_bahasa}) }}</span>
                            </p>
                            <p v-if="person.tempat_lahir || person.tanggal_lahir">
                                <strong>{{ $bahasa.showCardLabel({label:'Tempat, Tanggal Lahir',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                <span v-if="person.tempat_lahir">{{ person.tempat_lahir }}</span>
                                <br>
                                <span v-if="person.tanggal_lahir">{{ person.tanggal_lahir }}</span>
                            </p>
                            <p v-if="person.status_pernikahan">
                                <strong>{{ $bahasa.showCardLabel({label:'Status Pernikahan',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                {{ person.status_pernikahan }}
                            </p>
                            <p v-if="person.kebangsaan">
                                <strong>{{ $bahasa.showCardLabel({label:'Kebangsaan',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                {{ person.kebangsaan }}
                            </p>
                            <p v-if="person.linkedin">
                                <strong>{{ $bahasa.showLabel({label:'Linkedin',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                <a :href="person.linkedin" target="_blank">{{ person.linkedin }}</a>
                            </p>
                            <p v-if="person.website">
                                <strong>{{ $bahasa.showLabel({label:'Website',negara:person.cv_bahasa}) }}</strong>
                                <br>
                                <a :href="person.website" target="_blank">{{ person.website }}</a>
                            </p>
                            
                        </div>

                        <div class="mt-1" v-if="person.keahlian && person.keahlian.data.length > 0">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Keahlian',negara:person.cv_bahasa}) }}</h3>
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.keahlian.data" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate"><strong>{{ l.keahlian }}</strong></a>
                                    <div class="text-muted text-truncate mt-11">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-1" v-if="person.bahasa && person.bahasa.data.length > 0">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Bahasa',negara:person.cv_bahasa}) }}</h3>
                            
                            <div class="row g-3 align-items-center mb-3" v-for="(l,idx) in person.bahasa.data" :key="idx">
                                <div class="col text-truncate">
                                    <a href="#" class="text-reset d-block text-truncate"><strong>{{ l.bahasa }}</strong></a>
                                    <div class="text-muted text-truncate mt-11">Level : {{ l.nama_level }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-9">
                        <div v-if="person.pengalaman && person.pengalaman.data.length > 0">
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Pengalaman Kerja',negara:person.cv_bahasa}) }}</h3>
                            <div class="row" v-for="(l,idx) in person.pengalaman.data" :key="idx">
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
                            <h3 style="border-bottom:1px solid lightgray; padding-bottom:10px;">{{ $bahasa.showCardLabel({label:'Kursus',negara:person.cv_bahasa}) }}</h3>
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