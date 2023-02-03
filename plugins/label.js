export default (context, inject) => {
    inject('bahasa',{
        showLabel({label = '', negara=''}){
            // console.log('disni content =='+label+' negara == '+negara)

            if(negara == 'ID')
            {
                if(label == 'Detail Pribadi')
                {
                    return 'Detail Pribadi'
                }else if(label == 'Nama Depan')
                {
                    return 'Nama Depan'
                }else if(label == 'Informasi Tambahan')
                {
                    return 'Informasi Tambahan'
                }else if(label == 'Langkah Selanjutnya')
                {
                    return 'Langkah Selanjutnya'
                }else if(label == 'Langkah Sebelumnya')
                {
                    return 'Langkah Sebelumnya'
                }else if(label == 'Profil')
                {
                    return 'Profil'
                }else if(label == 'Nama Belakang')
                {
                    return 'Nama Belakang'
                }else if(label == 'Profesi')
                {
                    return 'Profesi'
                }else if(label == 'Alamat Email')
                {
                    return 'Alamat Email'
                }else if(label == 'Nomor Telepon')
                {
                    return 'Nomor Telepon'
                }else if(label == 'Alamat')
                {
                    return 'Alamat'
                }else if(label == 'Kode Pos')
                {
                    return 'Kode Pos'
                }else if(label == 'Kota')
                {
                    return 'Kota'
                }else if(label == 'Tempat Lahir')
                {
                    return 'Tempat Lahir'
                }else if(label == 'Tanggal Lahir')
                {
                    return 'Tanggal Lahir'
                }else if(label == 'SIM')
                {
                    return 'SIM'
                }else if(label == 'Jenis Kelamin')
                {
                    return 'Jenis Kelamin'
                }else if(label == 'Kebangsaan')
                {
                    return 'Kebangsaan'
                }else if(label == 'Linkedin')
                {
                    return 'Linkedin'
                }else if(label == 'Website')
                {
                    return 'Website'
                }else if(label == 'Tambahkan bagian ekstra')
                {
                    return 'Tambahkan bagian ekstra'
                }

            }else if(negara == 'EN')
            {
                if(label == 'Detail Pribadi')
                {
                    return 'Personal Info'
                }else if(label == 'Detail Pengalaman')
                {
                    return "Experiences"
                }else if(label == 'Informasi Tambahan')
                {
                    return 'More Information'
                }else if(label == 'Langkah Selanjutnya')
                {
                    return 'Next Step'
                }else if(label == 'Langkah Sebelumnya')
                {
                    return 'Back'
                }else if(label == 'Profil')
                {
                    return 'Resume Objective'
                }else if(label == 'Nama Depan')
                {
                    return 'First Name'
                }else if(label == 'Nama Belakang')
                {
                    return 'Last Name'
                }else if(label == 'Profesi')
                {
                    return 'Profession'
                }else if(label == 'Alamat Email')
                {
                    return 'Email Address'
                }else if(label == 'Nomor Telepon')
                {
                    return 'Phone Number'
                }else if(label == 'Alamat')
                {
                    return 'Address'
                }else if(label == 'Kode Pos')
                {
                    return 'Postal Code'
                }else if(label == 'Kota')
                {
                    return 'City'
                }else if(label == 'Tanggal Lahir')
                {
                    return 'Date of birth'
                }else if(label == 'Tempat Lahir')
                {
                    return 'Place of birth'
                }else if(label == 'SIM')
                {
                    return 'SIM'
                }else if(label == 'Jenis Kelamin')
                {
                    return 'Gender'
                }else if(label == 'Kebangsaan')
                {
                    return 'Nationality'
                }else if(label == 'Linkedin')
                {
                    return 'Linkedin'
                }else if(label == 'Website')
                {
                    return 'Website'
                }else if(label == 'Tambahkan bagian ekstra')
                {
                    return 'Add extra sections'
                }
            }
        }
    })
}