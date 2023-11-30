import { writable } from 'svelte/store'

export const user = writable(null) //createUser()
export const session = writable({
    user: {},
    company: {}
})

export const usuarios = writable([
    {
        id: 1,
        nombre: "Mauricio",
        segundoNombre: "Alejandro",
        apellido: "Carvajal",
        segundoApellido: "Díaz",
        correo: "juan.perez@example.com",
        ciudad: "Ciudad A",
        comuna: "Comuna 1"
    },
    {
        id: 2,
        nombre: "Ana",
        segundoNombre: "Isabel",
        apellido: "Gómez",
        segundoApellido: "Martínez",
        correo: "ana.gomez@example.com",
        ciudad: "Ciudad B",
        comuna: "Comuna 2"
    },
    {
        id: 3,
        nombre: "Carlos",
        segundoNombre: "Miguel",
        apellido: "Rodríguez",
        segundoApellido: "Sánchez",
        correo: "carlos.rodriguez@example.com",
        ciudad: "Ciudad C",
        comuna: "Comuna 3"
    },
    {
        id: 4,
        nombre: "Liliana",
        segundoNombre: "Lisbet",
        apellido: "Huallcca",
        segundoApellido: "Aniceto",
        correo: "maria.lopez@example.com",
        ciudad: "Ciudad A",
        comuna: "Comuna 1"
    },
    {
        id: 5,
        nombre: "José",
        segundoNombre: "Antonio",
        apellido: "Martínez",
        segundoApellido: "Gómez",
        correo: "jose.martinez@example.com",
        ciudad: "Ciudad B",
        comuna: "Comuna 2"
    },
    {
        id: 6,
        nombre: "Daniel",
        segundoNombre: "Antonio",
        apellido: "Gomez",
        segundoApellido: "Giraldo",
        correo: "laura.hernandez@example.com",
        ciudad: "Ciudad C",
        comuna: "Comuna 3"
    },
    {
        id: 7,
        nombre: "Miguel",
        segundoNombre: "Ángel",
        apellido: "Sánchez",
        segundoApellido: "Pérez",
        correo: "miguel.sanchez@example.com",
        ciudad: "Ciudad A",
        comuna: "Comuna 1"
    },
    {
        id: 8,
        nombre: "Carmen",
        segundoNombre: "María",
        apellido: "Flores",
        segundoApellido: "Gómez",
        correo: "carmen.flores@example.com",
        ciudad: "Ciudad B",
        comuna: "Comuna 2"
    },
    {
        id: 9,
        nombre: "Pedro",
        segundoNombre: "José",
        apellido: "Díaz",
        segundoApellido: "Martínez",
        correo: "pedro.diaz@example.com",
        ciudad: "Ciudad C",
        comuna: "Comuna 3"
    },
    {
        id: 10,
        nombre: "Isabel",
        segundoNombre: "Elena",
        apellido: "Ruiz",
        segundoApellido: "Sánchez",
        correo: "isabel.ruiz@example.com",
        ciudad: "Ciudad A",
        comuna: "Comuna 1"
    }
]);
  
export const sideNavigationLinks = writable([
    {
        link: 'empresas'
    },
    {
        link: 'articulos'
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