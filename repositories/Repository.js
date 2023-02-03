import PermissionRepository from "./PermissionRepository";
import RoleRepository from "./RoleRepository";
import UserRepository from "./UserRepository";

import GuestRepository from "./GuestRepository"
import CategoryRepository from "./CategoryRepository"
import PostRepository from "./PostRepository"
import TemplateRepository from "./TemplateRepository"
import SectionRepository from "./SectionRepository"
import SectioncategoryRepository from "./SectioncategoryRepository"
import WebcvRepository from "./WebcvRepository"

import PersonRepository from "./PersonRepository"
import CvtemplateRepository from "./CvtemplateRepository"
import SosmedRepository  from "./SosmedRepository"
import NegaraRepository from "./NegaraRepository"

export default ($axios) => ({
    permission: PermissionRepository($axios),
    role: RoleRepository($axios),
    user: UserRepository($axios),
    
    guest: GuestRepository($axios),
    category: CategoryRepository($axios),
    post: PostRepository($axios),
    template: TemplateRepository($axios),
    section: SectionRepository($axios),
    webcv: WebcvRepository($axios),
    sectioncategory: SectioncategoryRepository($axios),

    person: PersonRepository($axios),
    cvtemplate: CvtemplateRepository($axios),
    sosmed: SosmedRepository($axios),

    negara: NegaraRepository($axios)
})