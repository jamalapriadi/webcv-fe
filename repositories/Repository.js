import GuestRepository from "./GuestRepository"
import CategoryRepository from "./CategoryRepository"
import PostRepository from "./PostRepository"
import TemplateRepository from "./TemplateRepository"
import SectionRepository from "./SectionRepository"

export default ($axios) => ({
    guest: GuestRepository($axios),
    category: CategoryRepository($axios),
    post: PostRepository($axios),
    template: TemplateRepository($axios),
    section: SectionRepository($axios)
})