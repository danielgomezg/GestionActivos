import { writable } from 'svelte/store'

const createUser = () => {
    const { subscribe, set } = writable(localStorage.user ? JSON.parse(localStorage.getItem("user")): null)

    return {
        subscribe,
        setUser: (user) => {
            set(user)
        }
    }
}

export const user = createUser()

/*
export const user = writable(
    localStorage.user ? JSON.parse(localStorage.getItem("user")): null
)*/

export const empresas = writable([])