<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 bg-white">
                <a class="btn btn-dark btn-block">
                    Add Display
                </a>

                <div class="accordion mt-2" id="accordion-example" v-if="sections">
                    <div class="accordion-item" v-for="(k,ix) in sections.data" :key="ix">
                        <h2 class="accordion-header" id="heading-1">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-'+ix" aria-expanded="false">
                                {{ k.nama }}
                            </button>
                        </h2>
                        <div :id="'collapse-'+ix" class="accordion-collapse collapse" data-bs-parent="#accordion-example" style="">
                            <div class="accordion-body pt-0" v-if="k.section">
                                <div class="col-auto" v-if="k.section.data" v-for="(l,idx) in k.section.data">
                                    <div class="card card-sm" style="margin-bottom: 10px;">
                                        <div class="card-body">
                                            <a href="#" style="border:none" :class="getClassActive(l.title)" @click.prevent="addNewSection(l)">
                                                <div class="row align-items-center">
                                                    <div class="col-auto">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-mist" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M5 5h3m4 0h9"></path>
                                                            <path d="M3 10h11m4 0h1"></path>
                                                            <path d="M5 15h5m4 0h7"></path>
                                                            <path d="M3 20h9m4 0h3"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="col">
                                                        <div class="font-weight-medium">
                                                            {{ l.title }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-9">
                <div v-if="list" class="bg-white" style="background:white">
                    <div v-if="list.data">
                        <div v-if="list.data.sections">
                            <div v-if="list.data.sections.data" v-for="(l,idx) in list.data.sections.data" :key="idx">
                                <div v-if="l.section">
                                    <div v-if="l.section.data">
                                        
                                        <div v-if="l.section.data.title == 'centered_hero'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <centered_hero :title="l.json_fields.title" :description="l.json_fields.description" :img="l.json_fields.img"></centered_hero>
                                        </div>

                                        <div v-if="l.section.data.title == 'centered_screenshoot'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <centered_screenshoot :title="l.json_fields.title" :description="l.json_fields.description" :img="l.json_fields.img"></centered_screenshoot>
                                        </div>

                                        <div v-if="l.section.data.title == 'responsive_left_alignment'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <responsive_left_alignment :title="l.json_fields.title" :description="l.json_fields.description" :img="l.json_fields.img"></responsive_left_alignment>
                                        </div>

                                        <div v-if="l.section.data.title == 'border_hero'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <border_hero :title="l.json_fields.title" :description="l.json_fields.description" :img="l.json_fields.img"></border_hero>
                                        </div>

                                        <div v-if="l.section.data.title == 'dark_hero_mode'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <dark_hero_mode :title="l.json_fields.title" :description="l.json_fields.description" :img="l.json_fields.img"></dark_hero_mode>
                                        </div>

                                        <div v-if="l.section.data.title == 'hanging_icons'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <hanging_icons :title="l.json_fields.title" :lists="l.json_fields.forms"></hanging_icons>
                                        </div>

                                        <div v-if="l.section.data.title == 'accordion'" class="mt-2">
                                            <div class="editbox">
                                                <a href="#" class="btn btn-warning btn-sm btn-icon" @click.prevent="editSection(l.id, l.section.data.title, l.json_fields)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                                                    </svg>
                                                </a>

                                                <a href="#" class="btn btn-danger btn-sm btn-icon" @click.prevent="deleteSection(l.id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <line x1="4" y1="7" x2="20" y2="7"></line>
                                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </a>
                                            </div>

                                            <accordionVue :fields="l.json_fields"></accordionVue>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>

        <b-modal
            :ref="'modal-section'"
            :id="'modal-section'"
            size="xl"
            no-close-on-backdrop
            hide-footer
            :modal-class="'modal modal-blur fade'" 
            :dialog-class="'modal-dialog modal-dialog-centered'"
            title="Create new Section"
        >
            <form v-if="section" @submit.prevent="saveSection">
                <div v-if="section.title == 'centered_hero'">
                    <input_centered_hero v-if="show_preview == false" @simpan="handleAddsingle"></input_centered_hero>
                    <div class="mt-2" v-if="show_preview == true">
                        <centered_hero :title="section_preview.json_fields.title" :description="section_preview.json_fields.description" :img="section_preview.json_fields.img"></centered_hero>
                    </div>
                </div> 

                <div v-if="section.title == 'centered_screenshoot'">
                    <input_centered_hero v-if="show_preview == false" @simpan="handleAddsingle"></input_centered_hero>
                    <div class="mt-2" v-if="show_preview == true">
                        <centered_screenshoot :title="section_preview.json_fields.title" :description="section_preview.json_fields.description" :img="section_preview.json_fields.img"></centered_screenshoot>
                    </div>
                </div> 

                <div v-if="section.title == 'responsive_left_alignment'">
                    <input_centered_hero v-if="show_preview == false" @simpan="handleAddsingle"></input_centered_hero>
                    <div class="mt-2" v-if="show_preview == true">
                        <responsive_left_alignment :title="section_preview.json_fields.title" :description="section_preview.json_fields.description" :img="section_preview.json_fields.img"></responsive_left_alignment>
                    </div>
                </div> 

                <div v-if="section.title == 'border_hero'">
                    <input_centered_hero v-if="show_preview == false" @simpan="handleAddsingle"></input_centered_hero>
                    <div class="mt-2" v-if="show_preview == true">
                        <border_hero :title="section_preview.json_fields.title" :description="section_preview.json_fields.description" :img="section_preview.json_fields.img"></border_hero>
                    </div>
                </div>
                
                <div v-if="section.title == 'dark_hero_mode'">
                    <input_centered_hero v-if="show_preview == false" @simpan="handleAddsingle"></input_centered_hero>
                    <div class="mt-2" v-if="show_preview == true">
                        <dark_hero_mode :title="section_preview.json_fields.title" :description="section_preview.json_fields.description" :img="section_preview.json_fields.img"></dark_hero_mode>
                    </div>
                </div>

                <div v-if="section.title == 'hanging_icons'">
                    <input_hanging_iconsVue v-if="show_preview == false" @simpan="handleAddsingle" @batal="batal"></input_hanging_iconsVue>
                    <div class="mt-2" v-if="show_preview == true">
                        <hanging_icons :title="section_preview.json_fields.title" :lists="section_preview.json_fields.forms"></hanging_icons>
                    </div>
                </div>

                <div v-if="section.title == 'accordion'">
                    <inputDataAccordion @addAccordion="handleaddAccordion"></inputDataAccordion>
                    <div class="mt-2">
                        <accordionVue :fields="section_preview.json_fields"></accordionVue>
                    </div>
                </div> 

                <hr>

                <div class="card-footer text-end" v-if="show_preview == true">
                    <div class="d-flex">
                        <a href="#" class="btn btn-link" @click.prevent="batal">Cancel</a>
                        <button type="submit" class="btn btn-primary ms-auto">Save</button>
                    </div>
                </div>
            </form>
        </b-modal>

        <b-modal
            :ref="'modal-edit-section'"
            :id="'modal-edit-section'"
            size="lg"
            no-close-on-backdrop
            hide-footer
            :modal-class="'modal modal-blur fade'" 
            :dialog-class="'modal-dialog modal-dialog-centered'"
            title="Update Section"
        >
            <form v-if="section" @submit.prevent="updateSection">
                <div v-if="editsection.title == 'centered_hero'">
                    <update_centered_hero v-if="show_preview_edit == false" :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img" @simpan="handleUpdateSection"></update_centered_hero>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <centered_hero :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img"></centered_hero>
                    </div>
                </div>

                <div v-if="editsection.title == 'centered_screenshoot'">
                    <update_centered_hero v-if="show_preview_edit == false" :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img" @simpan="handleUpdateSection"></update_centered_hero>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <centered_screenshoot :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img"></centered_screenshoot>
                    </div>
                </div>

                <div v-if="editsection.title == 'responsive_left_alignment'">
                    <update_centered_hero v-if="show_preview_edit == false" :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img" @simpan="handleUpdateSection"></update_centered_hero>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <responsive_left_alignment :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img"></responsive_left_alignment>
                    </div>
                </div>

                <div v-if="editsection.title == 'border_hero'">
                    <update_centered_hero v-if="show_preview_edit == false" :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img" @simpan="handleUpdateSection"></update_centered_hero>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <border_hero :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img"></border_hero>
                    </div>
                </div>

                <div v-if="editsection.title == 'dark_hero_mode'">
                    <update_centered_hero v-if="show_preview_edit == false" :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img" @simpan="handleUpdateSection"></update_centered_hero>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <dark_hero_mode :title="editsection.fields.title" :description="editsection.fields.description" :img="editsection.fields.img"></dark_hero_mode>
                    </div>
                </div>

                <div v-if="editsection.title == 'hanging_icons'">
                    <update_hanging_iconsVue v-if="show_preview_edit == false" :title="editsection.fields.title" :lists="editsection.fields.forms" @simpan="handleUpdateSection"></update_hanging_iconsVue>
                    <div class="mt-2" v-if="show_preview_edit == true">
                        <hanging_icons :title="editsection.fields.title" :lists="editsection.fields.forms"></hanging_icons>
                    </div>
                </div>

                <hr>

                <div class="card-footer text-end" v-if="show_preview_edit == true">
                    <div class="d-flex">
                        <a href="#" class="btn btn-link" @click.prevent="batalUpdate">Cancel</a>
                        <button type="submit" class="btn btn-primary ms-auto">Save</button>
                    </div>
                </div>
            </form>
        </b-modal>


    </div>
</template>

<script>
import centered_hero from '~/components/webcv/sections/centered_hero.vue'
import centered_screenshoot from '~/components/webcv/sections/centered_screenshoot.vue'
import responsive_left_alignment from "~/components/webcv/sections/responsive_left_alignment.vue"
import border_hero from '~/components/webcv/sections/border_hero.vue'
import dark_hero_mode from '~/components/webcv/sections/dark_hero_mode.vue'
import hanging_icons from "~/components/webcv/sections/hanging_icons.vue"

import accordionVue from '~/components/webcv/sections/accordion.vue'
import inputDataAccordion from '~/components/webcv/sections/inputDataAccordion.vue'
import input_centered_hero from '~/components/webcv/sections/forms/input_centered_hero.vue'
import update_centered_hero from '~/components/webcv/sections/forms/update_centered_hero.vue'

import input_hanging_iconsVue from '~/components/webcv/sections/forms/input_hanging_icons.vue'
import update_hanging_iconsVue from "~/components/webcv/sections/forms/update_hanging_icons.vue"

export default{
    layout:'fluid_tabler',
    components:{
        centered_hero,
        centered_screenshoot,
        responsive_left_alignment,
        border_hero,
        dark_hero_mode,
        hanging_icons,
        accordionVue,
        inputDataAccordion,
        input_centered_hero,
        update_centered_hero,
        input_hanging_iconsVue,
        update_hanging_iconsVue
    },
    data(){
        return {
            kode:'',
            list: {},
            selected_type:'',
            sections:[],
            section:{},
            section_preview:{
                webcv_id:'',
                menu_id:'',
                section_id:'',
                json_fields:[],
            },
            loading:false,
            message:'',
            messageclass:'',
            categories:['heros','features'],
            show_preview:false,
            show_preview_edit:false,
            editsection:{
                kode:'',
                title:'',
                fields:[]
            }
        }
    },
    mounted(){
        this.getData()
        this.getSection()
    },
    methods:{
        getData(){
            let app=this;
            let id= app.$route.params.id;
            this.kode = id;

            this.$axios.get('/auth/webcv-menu/'+id)
                .then(resp => {
                    this.list = resp.data

                    if(this.list)
                    {
                        if(this.list.data)
                        {
                            this.section_preview = {
                                webcv_id:this.list.data.webcv_id,
                                menu_id: this.list.data.id,
                                section_id:'',
                                json_fields: [],
                            }
                        }
                    }

                    
                })
        },

        getSection(){
            this.$axios.get('/auth/section-category-list')
                .then(resp => {
                    this.sections = resp.data
                })
        },  

        getClassActive(type){
            var asli = 'list-group-item list-group-item-action'

            if(this.selected_type == type){
                asli = 'list-group-item list-group-item-action active'
            }

            return asli
        },

        addNewSection(l){
            this.section = l
            this.section_preview.section_id = l.id
            this.section_preview.json_fields =  []
            this.show_preview = false

            this.$bvModal.show("modal-section");
        },

        batal(){
            this.section = {}

            this.reset()
            this.$bvModal.hide("modal-section");
        },

        reset(){
            this.section_preview = {
                webcv_id:this.list.data.webcv_id,
                menu_id: this.list.data.id,
                section_id:'',
                json_fields:[],
            }
            this.show_preview = false
        },

        inputText(e, idx){
            for(var a=0; a<this.section_preview.json_fields.length; a++)
            {
                if(a == idx)
                {
                    this.section_preview.json_fields[a].value = e.target.value
                }
            }

        },

        handleaddAccordion(data){
            this.show_preview = true
            this.section_preview.json_fields.push(data)
        },

        handleAddsingle(data){
            this.show_preview = true
            this.section_preview.json_fields = data
        },

        saveSection(){
            this.loading = true

            this.$axios.post('/auth/save-menu-section', this.section_preview)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$swal('Success', resp.data.message , 'info');
                        this.getData()
                        this.batal()
                    }else{
                        this.$swal('Warning', resp.data.message , 'warning');
                    }
                })
        },

        editSection(kode,title, fields){
            this.show_preview_edit = false
            this.editsection = {
                kode:kode,
                title:title,
                fields:fields
            }

            this.$bvModal.show("modal-edit-section");
        },

        batalUpdate(){
            this.show_preview_edit = false
            this.editsection = {
                kode:'',
                title:'',
                fields:[]
            }

            this.$bvModal.hide("modal-edit-section");
        },

        handleUpdateSection(data){
            this.editsection.fields = data
            this.show_preview_edit = true
        },

        updateSection(){
            this.loading = true

            this.$axios.post('/auth/update-menu-section/'+this.editsection.kode, this.editsection)
                .then(resp => {
                    if(resp.data.success == true)
                    {
                        this.$swal('Success', resp.data.message , 'info');
                        this.getData()
                        this.batalUpdate()
                    }else{
                        this.$swal('Warning', resp.data.message , 'warning');
                    }
                })
        },

        deleteSection(id){
            this.$swal({
                title: 'Delete Section?',
                text: 'Apakah anda yakin ingin menghapus data ini!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ya, Lanjutkan!',
                cancelButtonText: 'Tidak',
                showCloseButton: true,
                showLoaderOnConfirm: true
            })
            .then((result) => {
                if(result.value) {
                    this.$axios.delete('/auth/delete-menu-section/'+id)
                        .then(response => {
                            if(response.data.success==true){
                                this.$swal('Non Aktif', 'Delete Section berhasil' , 'success');
                            }else{
                                this.$swal('Non Aktif', 'Delete Section gagal' , 'error');
                            }

                            this.getData()
                        })
                } else {
                    this.$swal('Cancelled', 'Aksi dibatalkan', 'info')
                }
            })
        }
    }
}
</script>