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

    setContext('backModalContent', (e) => {
        e.preventDefault();
    
    })

    setContext('editStore', (store) => {

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
        companies: companiesSelect}
        openModal = true

    }

    const editUser = (usuario) => {
        modalTitle = 'Editar usuario'
        modalContent = FormUsuarios
        props = { usuario,
                companies: companiesSelect }
        openModal = true
    }

    function getTokenFromLocalStorage() {
        return localStorage.getItem('accessToken');
    }

    let token = getTokenFromLocalStorage()

    const getUsers = async () => {
        loading = true;
        let response = (await Api.call('http://127.0.0.1:9000/users', 'GET', {}, token))
        console.log('RESPONSE GET USERS --> ', response)
        if (response.success) {
            usuarios = response.data 
        } 
        loading = false;
    }

    //Se obtiene las companias con el id y nombre solamente
    const getCompanyNameId= async () => {
        //loading = true;
        let response = (await Api.call('http://127.0.0.1:9000/companiesIdName', 'GET', {}, token))
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

            //formatCompanyForSelect()  
        } 
        //loading = false;
    }


    const showStores = (company) => {

    }

    const newStore = (company) => {
        
    }

    const editStore = (sucursal) => {

    }

    onMount(async () => {
        getUsers()
        getCompanyNameId()
    })

    $: console.log('open modal: ', openModal)

</script>

<div style="padding-top: 20px;">
    <div class="header-company">
        <Button label="Nuevo usuario" on:click={ createUser } />
        <IconButton icon="tune" />
        <!-- <div class="title">Empresas</div> -->
    </div>
    <br>

    <div class="usuarios-content">
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

<style>
    .header-company {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .usuarios-content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
    }
</style>