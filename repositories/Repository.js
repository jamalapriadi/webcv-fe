import GuestRepository from "./GuestRepository"
import CategoryRepository from "./CategoryRepository"
import PostRepository from "./PostRepository"

export default ($axios) => ({
    guest: GuestRepository($axios),
    category: CategoryRepository($axios),
    post: PostRepository($axios)
})