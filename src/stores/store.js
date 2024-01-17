import { writable } from 'svelte/store'

export const companyBackup = writable([])
export const snackbar = writable({
    open: false,
    message: '',
    type: 'dismiss',
    confirm: {
        id: '',
        action: false
    },
    context: ''
})

export const user = writable({}) //createUser()
export const session = writable({
    user: {},
    company: {}
})

export const usuarios = writable([]);
export const modulos = writable([
    "sucursal",
    "oficina",
    "activo",
    "articulo",
    "usuario",
    "empresa",
])

export const menu = writable([
    {
        id: 1,
        name: 'Empresas',
        path: '/empresas',
        profiles: [
            1
        ]
    },
    {
        id: 2,
        name: 'Sucursales',
        path: '/sucursales',
        profiles: [
            2
        ]
    },
    {
        id: 3,
        name: 'Articulos',
        path: '/articulos',
        profiles: [
            1,
            2,
            3
        ]
    },
    {
        id: 4,
        name: 'Usuarios',
        path: '/usuarios',
        profiles: [
            1
        ]
    },
    {
        id: 5,
        name: 'Perfiles',
        path: '/perfiles',
        profiles: [
            1
        ]
    },
    {
        id: 6,
        name: 'Reportes',
        path: '/reports',
        profiles: [
            1
        ]
    }
])
  
export const estadosActivo = writable([
    {
        label: 'Reparación',
        value: 'repare'
    },
    {
        label: 'Nuevo',
        value: 'new'
    },
    {
        label: 'Operativo',
        value: 'operativo'
    },
    {
        label: 'Perdida o Robo',
        value: 'lost'
    },
    {
        label: 'Dañado',
        value: 'damage'
    },
    {
        label: 'Obsoleto',
        value: 'deprecated'
    },
    {
        label: 'Otro',
        value: 'other'
    }
]);
