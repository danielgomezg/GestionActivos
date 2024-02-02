<script>
    // @ts-ignore
    import { Button, IconButton, Loading } from "$lib"
    import { setContext, onMount } from "svelte";
    import SheetHandler from "../SheetsHandler/sheetHandler.svelte";
    //import { usuarios } from "../../stores/store";
    import CardUsuario from "./cardUsuario.svelte";
    import FormUsuarios from "./formUsuarios.svelte";
    import Api from "../../../helpers/ApiCall";
    

    let openModal = false, backButton = false;
    let modalTitle = ''
    let modalContent;  
    let props;
    let previusComponent, previusProps;
    let usuarios = []
    let loading = false;

    //companies recibe id y name del getcompany, y en company se guardan los datos como label y value para usarlos en el select  
    let companiesDB= [], companiesSelect = []
    let perfilesDB = [], perfilesSelect = []

    setContext('backModalContent', (e) => {
        e.preventDefault();
    
    })

    setContext('addUsuario', (usuario) => {
        console.log('in add User')
        usuarios = [usuario, ...usuarios]
    })

    setContext('editUsuario', (usuario) => {
        console.log('in edit User')
        const index = usuarios.findIndex(user => user.id === usuario.id);
        usuarios = [...usuarios.slice(0, index), usuario, ...usuarios.slice(index + 1)];
    })

    setContext('removeUsuario', (usuarioId) => {
        console.log('in remove User')
        usuarios = usuarios.filter(usuario => usuario.id !== usuarioId);
    })

    const createUser = () => {
        modalTitle = 'Nuevo usuario'
        modalContent = FormUsuarios
        props = { usuario: {
            firstName: '',
            secondName: '',
            lastName: '',
            secondLastName: '',
            email: '',
            password: '',
            rut: '',
            company_id: '',
            profile_id: ''
        }, 
        companies: companiesSelect,
        perfiles: perfilesSelect,
        accion: 'create' }
        openModal = true

    }

    const editUser = (usuario) => {
        modalTitle = 'Editar usuario'
        modalContent = FormUsuarios
        props = { usuario,
                companies: companiesSelect,
                accion: 'edit' }
        openModal = true
    }

    const getUsers = async () => {
        loading = true;
        let response = (await Api.call('http://127.0.0.1:9000/users', 'GET'))
        console.log('RESPONSE GET USERS --> ', response)
        if (response.success && response.statusCode == '200') {
            usuarios = response.data.result
        } 
        loading = false;
    }

    //Se obtiene las companias con el id y nombre solamente
    const getCompanyNameId= async () => {
        let response = (await Api.call('http://127.0.0.1:9000/companiesIdName', 'GET'))
        console.log('RESPONSE GET COMPANIES --> ', response)
        if (response.success) {
            companiesDB = response.data.result
            for (let i = 0; i < companiesDB.length; i++) {
                let company = {
                    label: companiesDB[i].name,
                    value: companiesDB[i].id
                };
                companiesSelect.push(company);
            }
            console.log(companiesSelect)
        } 
    }

    //Se obtiene las companias con el id y nombre solamente
    const getPerfiles= async () => {
        let response = (await Api.call('http://127.0.0.1:9000/profiles', 'GET'))
        console.log('RESPONSE GET PROFILES --> ', response)
        if (response.success) {
            perfilesDB = response.data.result
            for (let i = 0; i < perfilesDB.length; i++) {
                let perfil = {
                    label: perfilesDB[i].name,
                    value: perfilesDB[i].id
                };
                perfilesSelect.push(perfil);
            }
            console.log(perfilesSelect)
        } 
    }


    onMount(async () => {
        getUsers()
        getCompanyNameId()
        getPerfiles()
    })


</script>

<div style="padding-top: 20px;">
    <div class="header-content">
        <Button label="Nuevo usuario" custom on:click={ createUser } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="body-content grid-columns-3">
        {#if loading}
            <Loading />
        {/if}
        {#each usuarios as usuario }    
            <CardUsuario 
                {usuario} 
                on:edit={ (event) => editUser(event.detail) } 
            />
        {/each}
    </div>
</div>

<SheetHandler
    {props}
    {modalTitle}
    {backButton}
    {modalContent}
    bind:openModal={openModal}
/>