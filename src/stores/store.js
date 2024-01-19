import { writable } from 'svelte/store'

export const companyBackup = writable([])
export const snackbar = writable({
    id: '',
    open: false,
    message: '',
    click: false,
    type: 'dismiss'
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
        id: 7,
        name: 'Activos',
        path: '/activos',
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


export const headerTableActivos = writable([
    {
        name: 'barcode',
        label: 'Codigo de Barras',
        numeric: false
    },
    {
        name: 'serie',
        label: 'Serie',
        numeric: false
    },
    {
        name: 'model',
        label: 'Modelo',
        numeric: false
    },
    {
        name: 'aq_date',
        label: 'Adquirido',
        numeric: false
    },
    {
        name: 'create_date',
        label: 'Creado',
        numeric: false
    },
    {
        name: 'state',
        label: 'Estado',
        numeric: false
    },
    {
        name: 'comment',
        label: 'Comentario',
        numeric: false
    },
    {
        name: 'responsable',
        label: 'Responsable',
        numeric: false
    },
    {
        name: 'num_register',
        label: 'N Registro',
        numeric: false
    },
    {
        name: 'document',
        label: 'Documento',
        numeric: false
    }
]);