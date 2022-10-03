import GuestRepository from "./GuestRepository"

export default ($axios) => ({
    guest: GuestRepository($axios),
})