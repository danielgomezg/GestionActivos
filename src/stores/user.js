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

export const user = writable(null) //createUser()
export const session = writable({
    user: {},
    company: {}
})
/*
export const user = writable(
    localStorage.user ? JSON.parse(localStorage.getItem("user")): null
)*/

export const empresas = writable([
    {
        id: 1,
        name: 'Adidas',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12 
    },
    {
        id: 2,
        name: 'Nike',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 3,
        name: 'Coca-Cola',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 4,
        name: 'OpenIA',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 5,
        name: 'Amazon',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 6,
        name: 'Google',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 7,
        name: 'Wom',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 8,
        name: 'Entel',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 9,
        name: 'Samsung',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 10,
        name: 'Apple',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    },
    {
        id: 11,
        name: 'Microsoft',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12
    }
])