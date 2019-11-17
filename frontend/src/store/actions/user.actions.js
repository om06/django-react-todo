export const USER = 'USER'

export function storeUser (user) {
    return {type : USER, user}
}