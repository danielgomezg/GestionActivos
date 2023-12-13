import { writable } from 'svelte/store'

export const snackbar = writable({
    open: false,
    message: ''
})

export const user = writable(null) //createUser()
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
  
export const sideNavigationLinks = writable([
    {
        link: 'empresas',
        profile_sca: 1
    },
    {
        link: 'sucursales'
    },
    {
        link: 'articulos',
        profile_sca: [0, 1]
    },
    {
        link: 'usuarios'
    },
    {
        link: 'perfiles'
    },
    {
        link: 'reportes'
    }
]);

export const empresas = writable([
    {
        id: 1,
        name: 'Adidas',
        rut: '12.234.345-0',
        pais: 'Chile',
        totalSucursales: 12,
        offices: [
            {
                id: 1,
                piso: 1,
                descripcion: 'piso de tecnologia'
            },
            {
                id: 2,
                piso: 2,
                descripcion: 'ropa de mujer'
            },
            {
                id: 3,
                piso: 3,
                descripcion: 'ropa de hombre'
            }
        ]
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
]);