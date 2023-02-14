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
                }else if(label == 'Status Pernikahan')
                {
                    return 'Status Pernikahan'
                }else if(label == 'Linkedin')
                {
                    return 'Linkedin'
                }else if(label == 'Website')
                {
                    return 'Website'
                }else if(label == 'Tambahkan bagian ekstra')
                {
                    return 'Tambahkan bagian ekstra'
                }else if(label == 'Pengalaman kerja')
                {
                    return 'Pengalaman kerja'
                }else if(label == 'Posisi Kerja')
                {
                    return 'Posisi Kerja'
                }else if(label == 'misal. Manajer')
                {
                    return 'misal. Manajer'
                }else if(label == 'misal. Jakarta')
                {
                    return 'misal. Jakarta'
                }else if(label == 'Perusahaan')
                {
                    return 'Perusahaan'
                }else if(label == 'Tanggal Mulai')
                {
                    return 'Tanggal Mulai'
                }else if(label == 'Tanggal Selesai')
                {
                    return 'Tanggal Selesai'
                }else if(label == 'Sampai Sekarang?')
                {
                    return 'Sampai Sekarang?'
                }else if(label == 'Tugas/Tanggung Jawab Pekerjaan')
                {
                    return 'Tugas/Tanggung Jawab Pekerjaan'
                }else if(label == 'Simpan')
                {
                    return 'Simpan'
                }else if(label == 'Tambah pengalaman kerja lain')
                {
                    return 'Tambah pengalaman kerja lain'
                }else if(label == 'Pendidikan')
                {
                    return 'Pendidikan'
                }else if(label == 'Gelar')
                {
                    return 'Gelar'
                }else if(label == 'misal. S.Kom')
                {
                    return 'misal. S.Kom'
                }else if(label == 'misal. Jakarta')
                {
                    return 'misal. Jakarta'
                }else if(label == 'Sekolah')
                {
                    return 'Sekolah'
                }else if(label == 'misal. Universitas Indonesia')
                {
                    return 'misal. Universitas Indonesia'
                }else if(label == 'Deskripsi')
                {
                    return 'Deskripsi'
                }else if(label == 'Tambah pendidikan lain')
                {
                    return 'Tambah pendidikan lain'
                }else if(label == 'Minat')
                {
                    return 'Minat'
                }else if(label == 'Hobi')
                {
                    return 'Hobi'
                }else if(label == 'misal. Berenang')
                {
                    return 'misal. Berenang'
                }else if(label == 'Tambah Minat lain')
                {
                    return 'Tambah Minat lain'
                }else if(label == 'Keahlian')
                {
                    return 'Keahlian'
                }else if(label == 'Label Keahlian')
                {
                    return 'Keahlian'
                }else if(label == 'misal. Microsoft Word')
                {
                    return 'misal. Microsoft Word'
                }else if(label == 'Ahli')
                {
                    return 'Ahli'
                }else if(label == 'Berpengalaman')
                {
                    return 'Berpengalaman'
                }else if(label == 'Terampil')
                {
                    return 'Terampil'
                }else if(label == 'Menengah')
                {
                    return 'Menengah'
                }else if(label == 'Pemula')
                {
                    return 'Pemula'
                }else if(label == 'Tambah Skill lain')
                {
                    return 'Tambah Skill lain'
                }else if(label == 'Tambah Link / Social Media lain')
                {
                    return 'Tambah Link / Social Media lain'
                }else if(label == 'Project')
                {
                    return 'Project'
                }else if(label == 'Nama Project')
                {
                    return 'Nama Project'
                }else if(label == 'misal. Design')
                {
                    return 'misal. Design'
                }else if(label == 'Tambah Project lain')
                {
                    return 'Tambah Project lain'
                }else if(label == 'Bahasa')
                {
                    return 'Bahasa'
                }else if(label == 'Label Bahasa')
                {
                    return 'Bahasa'
                }else if(label == 'misal. Bahasa Inggris')
                {
                    return 'misal. Bahasa Inggris'
                }else if(label == 'Penutur asli')
                {
                    return 'Penutur asli'
                }else if(label == 'Sangat cakap berbicara dan menulis')
                {
                    return 'Sangat cakap berbicara dan menulis'
                }else if(label == 'Pemahaman bahasa yang sangat baik')
                {
                    return 'Pemahaman bahasa yang sangat baik'
                }else if(label == 'Pemahaman bahasa yang baik dalam pekerjaan')
                {
                    return 'Pemahaman bahasa yang baik dalam pekerjaan'
                }else if(label == 'Pemahaman bahasa standar dalam pekerjaan')
                {
                    return 'Pemahaman bahasa standar dalam pekerjaan'
                }else if(label == 'Pilih')
                {
                    return 'Pilih'
                }else if(label == 'Tambah Bahasa lain')
                {
                    return 'Tambah Bahasa lain'
                }else if(label == 'Kursus')
                {
                    return 'Kursus'
                }else if(label == 'Label Kursus')
                {
                    return 'Kursus'
                }else if(label == 'Institusi')
                {
                    return 'Institusi'
                }else if(label == 'misal. Manajemen Keuangan')
                {
                    return 'misal. Manajemen Keuangan'
                }else if(label == 'Tambah Kursus lain')
                {
                    return 'Tambah Kursus lain'
                }else if(label == 'Tambah Pencapaian lain')
                {
                    return 'Tambah Pencapaian lain'
                }else if(label == 'Pencapaian')
                {
                    return 'Pencapaian'
                }else if(label == 'Publikasi')
                {
                    return 'Publikasi'
                }else if(label == 'Tambah publikasi lain')
                {
                    return 'Tambah publikasi lain'
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
                    return 'City/Town'
                }else if(label == 'Tanggal Lahir')
                {
                    return 'Date of birth'
                }else if(label == 'Tempat Lahir')
                {
                    return 'Place of birth'
                }else if(label == 'SIM')
                {
                    return 'Driving licence'
                }else if(label == 'Jenis Kelamin')
                {
                    return 'Gender'
                }else if(label == 'Kebangsaan')
                {
                    return 'Nationality'
                }else if(label == 'Status Pernikahan')
                {
                    return 'Marital status'
                }else if(label == 'Linkedin')
                {
                    return 'Linkedin'
                }else if(label == 'Website')
                {
                    return 'Website'
                }else if(label == 'Tambahkan bagian ekstra')
                {
                    return 'Add extra sections'
                }else if(label == 'Pengalaman kerja')
                {
                    return 'Work Experience'
                }else if(label == 'Posisi Kerja')
                {
                    return 'Job Title'
                }else if(label == 'misal. Manajer')
                {
                    return 'e.g. Sales Manajer'
                }else if(label == 'misal. Jakarta')
                {
                    return 'e.g. Jakarta'
                }else if(label == 'Perusahaan')
                {
                    return 'Employer'
                }else if(label == 'Tanggal Mulai')
                {
                    return 'Start Date'
                }else if(label == 'Tanggal Selesai')
                {
                    return 'End Date'
                }else if(label == 'Sampai Sekarang?')
                {
                    return 'Present?'
                }else if(label == 'Tugas/Tanggung Jawab Pekerjaan')
                {
                    return 'Responsibility'
                }else if(label == 'Simpan')
                {
                    return 'Save'
                }else if(label == 'Tambah pengalaman kerja lain')
                {
                    return 'Add another work experience'
                }else if(label == 'Pendidikan')
                {
                    return 'Education and Qualifications'
                }else if(label == 'Gelar')
                {
                    return 'Degree'
                }else if(label == 'misal. S.Kom')
                {
                    return 'e.g. Benchelor of Science'
                }else if(label == 'misal. Jakarta')
                {
                    return 'e.g. Jakarta'
                }else if(label == 'Sekolah')
                {
                    return 'School'
                }else if(label == 'misal. Universitas Indonesia')
                {
                    return 'e.g. New York University'
                }else if(label == 'Deskripsi')
                {
                    return 'Description'
                }else if(label == 'Tambah pendidikan lain')
                {
                    return 'Add another education'
                }else if(label == 'Minat')
                {
                    return 'Interests'
                }else if(label == 'Hobi')
                {
                    return 'Hobby'
                }else if(label == 'misal. Berenang')
                {
                    return 'e.g. Swimming'
                }else if(label == 'Tambah Minat lain')
                {
                    return 'Add another hobby'
                }else if(label == 'Keahlian')
                {
                    return 'Skills'
                }else if(label == 'Label Keahlian')
                {
                    return 'Skill'
                }else if(label == 'misal. Microsoft Word')
                {
                    return 'e.g. Microsoft Word'
                }else if(label == 'Ahli')
                {
                    return 'Expert'
                }else if(label == 'Berpengalaman')
                {
                    return 'Experienced'
                }else if(label == 'Terampil')
                {
                    return 'Skilfull'
                }else if(label == 'Menengah')
                {
                    return 'Intermediate'
                }else if(label == 'Pemula')
                {
                    return 'Beginner'
                }else if(label == 'Tambah Skill lain')
                {
                    return 'Add another skill'
                }else if(label == 'Tambah Link / Social Media lain')
                {
                    return 'Add another Link / Social Media'
                }else if(label == 'Project')
                {
                    return 'Project'
                }else if(label == 'Nama Project')
                {
                    return 'Project Name'
                }else if(label == 'misal. Design')
                {
                    return 'e.g. Design'
                }else if(label == 'Tambah Project lain')
                {
                    return 'Add another Project'
                }else if(label == 'Bahasa')
                {
                    return 'Languages'
                }else if(label == 'Label Bahasa')
                {
                    return 'Language'
                }else if(label == 'misal. Bahasa Inggris')
                {
                    return 'e.g English'
                }else if(label == 'Penutur asli')
                {
                    return 'Native speaker'
                }else if(label == 'Sangat cakap berbicara dan menulis')
                {
                    return 'Highly proficient in speaking and writing'
                }else if(label == 'Pemahaman bahasa yang sangat baik')
                {
                    return 'Very good command'
                }else if(label == 'Pemahaman bahasa yang baik dalam pekerjaan')
                {
                    return 'Good working knowledge'
                }else if(label == 'Pemahaman bahasa standar dalam pekerjaan')
                {
                    return 'Working knowledge'
                }else if(label == 'Pilih')
                {
                    return 'Select'
                }else if(label == 'Tambah Bahasa lain')
                {
                    return 'Add another Language'
                }else if(label == 'Kursus')
                {
                    return 'Courses'
                }else if(label == 'Label Kursus')
                {
                    return 'Course'
                }else if(label == 'Institusi')
                {
                    return 'Institution'
                }else if(label == 'misal. Manajemen Keuangan')
                {
                    return 'e.g. Finance Management'
                }else if(label == 'misal. London Business School')
                {
                    return 'e.g. London Business School'
                }else if(label == 'Tambah Kursus lain')
                {
                    return 'Add another course'
                }else if(label == 'Pencapaian')
                {
                    return 'Achivements'
                }else if(label == 'Tambah Pencapaian lain')
                {
                    return 'Add another achivement'
                }else if(label == 'Publikasi')
                {
                    return 'Publications'
                }else if(label == 'Tambah publikasi lain')
                {
                    return 'Add another publication'
                }
            }
        },

        showLabelFields({label = '', negara = ''}){
            if(negara == 'ID'){
                if(label == 'CVAku'){
                    return 'CVAku'
                }else if(label == 'informasi_tambahan')
                {
                    return 'informasi_tambahan'
                }else if(label == 'description')
                {
                    return 'deskripsi'
                }else if(label == 'pengalaman')
                {
                    return 'pengalaman'
                }else if(label == 'keahlian')
                {
                    return 'keahlian'
                }else if(label == 'pendidikan')
                {
                    return 'pendidikan'
                }else if(label == 'minat')
                {
                    return 'minat'
                }else if(label == 'social media')
                {
                    return 'social media'
                }else if(label == 'project')
                {
                    return 'project'
                }else if(label == 'bahasa')
                {
                    return 'bahasa'
                }else if(label == 'kursus')
                {
                    return 'kursus'
                }else if(label == 'pencapaian')
                {
                    return 'pencapaian'
                }else if(label == 'publikasi')
                {
                    return 'publikasi'
                }else if(label == 'CV dan Web Builder')
                {
                    return 'CV dan Web Builder'
                }else if(label == 'Buat CV dan Web Profesional anda dengan cepat')
                {
                    return 'Buat CV dan Web Profesional anda dengan cepat'
                }else if(label == 'Buat CV Sekarang')
                {
                    return 'Buat CV dan Web Sekarang'
                }else if(label == 'Membuat CV dan Web bisa sangat melelahkan, terutama jika Anda harus melakukan semuanya sendiri. Kami membantu anda membuat CV dan Web profesional untuk anda. mari ungguli pesaing anda dan dapatkan pekerjan impian itu.')
                {
                    return 'Membuat CV dan Web bisa sangat melelahkan, terutama jika Anda harus melakukan semuanya sendiri. Kami membantu anda membuat CV dan Web profesional untuk anda. mari ungguli pesaing anda dan dapatkan pekerjan impian itu.'
                }
            }else if(negara == 'EN')
            {
                if(label == 'CVAku'){
                    return 'CVAku'
                }else if(label == 'informasi_tambahan')
                {
                    return 'another_information'
                }else if(label == 'description')
                {
                    return 'description'
                }else if(label == 'pengalaman')
                {
                    return 'experience'
                }else if(label == 'keahlian')
                {
                    return 'skills'
                }else if(label == 'pendidikan')
                {
                    return 'education'
                }else if(label == 'minat')
                {
                    return 'interests'
                }else if(label == 'social media')
                {
                    return 'social media'
                }else if(label == 'project')
                {
                    return 'project'
                }else if(label == 'bahasa')
                {
                    return 'language'
                }else if(label == 'kursus')
                {
                    return 'courses'
                }else if(label == 'pencapaian')
                {
                    return 'achivements'
                }else if(label == 'publikasi')
                {
                    return 'publications'
                }else if(label == 'CV dan Web Builder')
                {
                    return 'CV and Web Builder'
                }else if(label == 'Buat CV dan Web Profesional anda dengan cepat')
                {
                    return 'Create CV and Your Web Profesional faster'
                }else if(label == 'Buat CV Sekarang')
                {
                    return 'Create CV and Web Now'
                }else if(label == 'Membuat CV dan Web bisa sangat melelahkan, terutama jika Anda harus melakukan semuanya sendiri. Kami membantu anda membuat CV dan Web profesional untuk anda. mari ungguli pesaing anda dan dapatkan pekerjan impian itu.')
                {
                    return "Creating a CV and Web can be overwhelming, especially if you have to do everything yourself. We help you create a professional CV and website for you. let's get ahead of your competitors and get that dream job."
                }
            }
        },

        showCardLabel({label='', negara=''}){
            if(negara == 'ID')
            {
                if(label == 'Pengalaman Kerja')
                {
                    return 'Pengalaman Kerja'
                }else if(label == 'Pendidikan')
                {
                    return 'Pendidikan'
                }else if(label == 'Hobi')
                {
                    return 'Minat/Hobi'
                }else if(label == 'Kursus')
                {
                    return 'Kursus'
                }else if(label == 'Publikasi')
                {
                    return 'Publikasi'
                }else if(label == 'Pencapaian')
                {
                    return 'Pencapaian'
                }else if(label == 'Telepon')
                {
                    return 'Telepon'
                }else if(label == 'Email')
                {
                    return 'Email'
                }else if(label == 'Alamat')
                {
                    return 'Alamat'
                }else if(label == 'Jenis Kelamin')
                {
                    return 'Jenis Kelamin'
                }else if(label == 'Laki-Laki')
                {
                    return 'Laki-Laki'
                }else if(label == 'Perempuan')
                {
                    return 'Perempuan'
                }else if(label == 'Tempat, Tanggal Lahir')
                {
                    return 'Tempat, Tanggal Lahir'
                }else if(label == 'Status Pernikahan')
                {
                    return 'Status Pernikahan'
                }else if(label == 'Kebangsaan')
                {
                    return 'Kebangsaan'
                }else if(label == 'Keahlian')
                {
                    return 'Keahlian'
                }else if(label == 'Bahasa')
                {
                    return 'Bahasa'
                }
            }else if(negara == 'EN')
            {
                if(label == 'Pengalaman Kerja')
                {
                    return 'Work Experiences'
                }else if(label == 'Pendidikan')
                {
                    return 'Educations'
                }else if(label == 'Hobi')
                {
                    return 'Interests'
                }else if(label == 'Kursus')
                {
                    return 'Certifications'
                }else if(label == 'Publikasi')
                {
                    return 'Publications'
                }else if(label == 'Pencapaian')
                {
                    return 'Achivements'
                }else if(label == 'Telepon')
                {
                    return 'Phone'
                }else if(label == 'Email')
                {
                    return 'Email'
                }else if(label == 'Alamat')
                {
                    return 'Address'
                }else if(label == 'Jenis Kelamin')
                {
                    return 'Gender'
                }else if(label == 'Laki-Laki')
                {
                    return 'Male'
                }else if(label == 'Perempuan')
                {
                    return 'Female'
                }else if(label == 'Tempat, Tanggal Lahir')
                {
                    return 'Place and date of birth'
                }else if(label == 'Status Pernikahan')
                {
                    return 'Marital status'
                }else if(label == 'Kebangsaan')
                {
                    return 'Nationality'
                }else if(label == 'Keahlian')
                {
                    return 'Skills'
                }else if(label == 'Bahasa')
                {
                    return 'Languages'
                }
            }
        }
    })
}