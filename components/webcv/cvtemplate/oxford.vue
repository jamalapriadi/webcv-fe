<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h1>Curiculum vitae</h1>

                <div class="mt-4">
                    <h2>Pribadi</h2>
                    <hr>
                    <table style="width:100%">
                        <tr>
                            <td width="25%">Nama</td>
                            <td>{{ person.nama_depan }} {{ person.nama_belakang }}</td>
                        </tr>
                        <tr>
                            <td>Alamat</td>
                            <td>{{ person.alamat }}</td>
                        </tr>
                        <tr>
                            <td>Nomor telepon</td>
                            <td>{{ person.telp }}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{{ person.email }}</td>
                        </tr>
                        <tr v-if="person.tempat_lahir && person.tanggal_lahir">
                            <td>Tempat, Tanggal Lahir</td>
                            <td>{{ person.tempat_lahir }}, {{ person.tanggal_lahir }}</td>
                        </tr>
                        <tr v-if="person.jk">
                            <td>Jenis Kelamin</td>
                            <td>{{ person.jk }}</td>
                        </tr>
                        <tr v-if="person.kebangsaan">
                            <td>Kebangsaan</td>
                            <td>{{ person.kebangsaan }}</td>
                        </tr>
                        <tr v-if="person.status_pernikahan">
                            <td>Status Pernikahan</td>
                            <td>{{ person.status_pernikahan }}</td>
                        </tr>
                        <tr v-if="person.sim">
                            <td>SIM</td>
                            <td>{{ person.sim }}</td>
                        </tr>
                        <tr v-if="person.linkedin">
                            <td>Linkedin</td>
                            <td>{{ person.linkedin }}</td>
                        </tr>
                        <tr v-if="person.website">
                            <td>Website</td>
                            <td>{{ person.website }}</td>
                        </tr>
                    </table>
                </div>

                <div class="mt-4" v-if="person.description">
                    <h2>Profil</h2>
                    <hr>
                    <div v-html="person.description"></div>
                </div>

                <div class="mt-4" v-if="person.pengalaman && person.pengalaman.length > 0">
                    <h2>Pengalaman Kerja</h2>
                    <hr>
                    <table style="width:50%">
                        <tr v-for="(l,idx) in person.pengalaman.data" :key="idx">
                            <td>{{ l.periode }}</td>
                            <td>
                                <div class="text-truncate">
                                    <strong>{{ l.posisi_kerja }}</strong>
                                </div>
                                <div class="text-muted">{{ l.perusahaan }}</div>
                                <div class="text-muted" v-html="l.description"></div>
                            </td>
                        </tr>
                    </table>
                </div>

                <div class="mt-4" v-if="person.keahlian && person.keahlian.length > 0">
                    <h2>Skill</h2>
                    <hr>
                    <div class="row">
                        <div v-for="(l,idx) in person.keahlian.data" :key="idx" class="col-auto">
                            <a href="#" class="btn btn-default">{{ l.keahlian }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <pre>{{ person }}</pre>
        </div>
        
    </div>
</template>

<script>
export default{
    props:['person']
}
</script>