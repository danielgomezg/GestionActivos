import { writable } from 'svelte/store'

export const companyBackup = writable([])
export const articleBackup = writable([])

export const snackbar = writable({
    id: 0,
    action: '',
    open: false,
    message: '',
    click: false,
    type: 'dismiss'
})

export const lockStore = writable(0);
export const lockOffice = writable(0);	



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
    // {
    //     id: 6,
    //     name: 'Reportes',
    //     path: '/reports',
    //     profiles: [
    //         1
    //     ]
    // }
])
  
export const estadosActivo = writable([
    {
        label: 'Reparación',
        value: 'Reparación'
    },
    {
        label: 'Nuevo',
        value: 'Nuevo'
    },
    {
        label: 'Operativo',
        value: 'Operativo'
    },
    {
        label: 'Perdida o Robo',
        value: 'Perdida o Robo'
    },
    {
        label: 'Dañado',
        value: 'Dañado'
    },
    {
        label: 'Obsoleto',
        value: 'Obsoleto'
    },
    {
        label: 'Otro',
        value: 'Otro'
    }
]);


export const headerTableActivos = writable([
    {
        name: 'bar_code',
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
        name: 'acquisition_date',
        label: 'Adquirido',
        numeric: false
    },
    {
        name: 'creation_date',
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
        name: 'name_in_charge_active',
        label: 'Responsable',
        numeric: false
    },
    {
        name: 'accounting_record_number',
        label: 'N Registro',
        numeric: false
    },
    {
        name: 'accounting_document',
        label: 'Documento',
        numeric: false
    }
]);