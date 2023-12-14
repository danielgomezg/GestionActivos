<script>
    // @ts-nocheck
    import { TextField, Button, Select } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { onMount } from "svelte";
    import FormCompany from "../company/formCompany.svelte";
    import { snackbar } from "../../stores/store";
    
    export let usuario = {}, companies = {}, accion = '', showPassword = false
    let message= '', token = ''
    let disabledSave = false
    let accionBtn = ''
    let perfilUser = ''
    let password = ''

    //variables para que el select guarde eñ valor
    let usuarioCompanyId, usuarioProfileId

    let perfil = [
        {
            label: 'Admin',
            value: 1
        },
        {
            label: 'Empresa',
            value: 2
        }
    ]


    function formatRut(code) {
        if (code == undefined) return ''
        if (code.length >= 13) return code.slice(0, -1);
        
        let rut = code.replace(/[^\dkK]/g, '')

        if (rut.length > 1) {
            rut = rut.slice(0, -1) + '-' + rut.charAt(rut.length - 1);
        }

        if (rut.length > 5) {
            rut = rut.slice(0, -5) + '.' + rut.slice(-5);
        }

        if (rut.length > 9) {
            rut = rut.slice(0, -9) + '.' + rut.slice(-9);
        }

        return rut
        
        // return code
    }

    function obtenerRut(cadena) {
    // Elimina guiones y puntos usando expresiones regulares
        const soloDigitos = cadena.replace(/[-.]/g, '');
        const sinUltimoDigito = soloDigitos.slice(0, -1);
        console.log(sinUltimoDigito)
        return sinUltimoDigito;
    }

    function validForm() {
        if (usuario.firstName == ''){
            message = "Falta agregar el nombre al usuario."
            return false;
        }
        if (usuario.lastName == ''){
            message = "Falta agregar el apellido al usuario."
            return false;
        } 
        if (usuario.email == ''){
            message = "Falta agregar el correo al usuario."
            return false; 
        }
        if (usuario.rut == ''){
            message = "Falta agregar el rut al usuario."
            return false; 
        } 
        if (usuario.profile_id == ''){
            message = "Falta agregarle un perfil al usuario."
            return false; 
        }   
        return true
    }

    function getTokenFromLocalStorage() {
        return localStorage.getItem('accessToken');
    }

    token = getTokenFromLocalStorage()


    const saveUser = async () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }
        
        //loading = true;

        usuario.password = obtenerRut(usuario.rut)
        usuario.company_id = parseInt(usuarioCompanyId, 10)
        usuario.profile_id = parseInt(usuarioProfileId, 10)
        // Peticion
        console.log(usuario)   
        let body = JSON.stringify(usuario)  
        let response = (await Api.call('http://127.0.0.1:9000/user', 'POST', { body }, token))
        console.log('RESPONSE SAVE USER --> ', response)
        if (response.success) {
            if (response.data.code == 201) {
                message = "Usuario agregado"
                usuario.firstName = ''
                usuario.secondName = ''
                usuario.lastName = ''
                usuario.secondLastName = ''
                usuario.email = ''
                usuario.password = ''
                usuario.rut = ''
                usuario.company_id = ''
                usuario.profile_id = ''

                //aviso
                snackbar.update(snk => {
                snk.open = true;
                snk.message = "Usuario creado con éxito."
                return snk
                })
            }else{
                //aviso
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Error al crear usuario."
                    return snk
                })
            }
        }else{
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al crear usuario."
                return snk
            })
        }
        //loading = false
    }

    const editUser = async () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        //usuario.password = obtenerRut(usuario.rut)
        usuario.company_id = parseInt(usuarioCompanyId, 10)
        usuario.profile_id = parseInt(usuarioProfileId, 10)
        // Peticion
        console.log(usuario)
        console.log(usuarioProfileId)
        console.log(usuarioCompanyId)
        let body;
        if(password == ""){
            body = JSON.stringify({
            firstName: usuario.firstName,
            secondName: usuario.secondName,
            lastName: usuario.lastName,
            secondLastName: usuario.secondLastName,
            email: usuario.email,
            company_id : usuario.company_id,
            profile_id : usuario.profile_id
            }) 
        }else{
            body = JSON.stringify({
            firstName: usuario.firstName,
            secondName: usuario.secondName,
            lastName: usuario.lastName,
            secondLastName: usuario.secondLastName,
            email: usuario.email,
            company_id : usuario.company_id,
            profile_id : usuario.profile_id
            }) 
        }   
         
        let response = (await Api.call(`http://127.0.0.1:9000/user/${usuario.id}`, 'PUT', { body }, token))
        console.log('RESPONSE EDIT USER --> ', response)
        if (response.success) {
            if (response.data.code == 201) {
                //aviso
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Usuario actualizado con éxito."
                    return snk
                })
            }else{
                //aviso
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Error al editar usuario."
                    return snk
                })
            }
        }else{
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al editar usuario."
                return snk
            })
        }
    }
    
    onMount(async () => {
        //funcion que determina que accion se hara, crear o editar;
        if(accion == 'create'){
            accionBtn = saveUser
        }else{
            accionBtn = editUser
            perfilUser = usuario.profile_id 
            
        }

    })

    $: usuario.rut = formatRut(usuario.rut)
    $: console.log(usuario.company_id)
    $: console.log(usuario.profile_id)

</script>

<div class="form">

    <TextField 
        version=2
        id="name-company"
        required 
        type="text"
        label="Nombre" 
        bind:value={usuario.firstName}
    />

    <TextField 
        version=2
        id="name-company"
        required 
        type="text"
        label="Segundo nombre" 
        bind:value={usuario.secondName}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Apellido" 
        bind:value={usuario.lastName}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Segundo apellido" 
        bind:value={usuario.secondLastName}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Correo" 
        bind:value={usuario.email}
    />

    {#if showPassword}
        <TextField 
            version=2
            required 
            type="password"
            label="contraseña" 
            bind:value={ password }
        />
    {/if}

    {#if accion == 'create'}
        <TextField 
            version=2
            required 
            type="text"
            label="Rut" 
            bind:value={usuario.rut}
        />
    {/if}

    <Select 
        label="Perfil"
        selected={ usuario.profile_id }
        options={perfil}
        on:change={ (event) => usuarioProfileId = event.detail }
    />

    <Select 
        label="Compañias"
        selected={ usuario.company_id }
        options={companies}
        on:change={ (event) => usuarioCompanyId = event.detail }
    />

    <br>
    <div class="grid-col-span-1">
        <Button 
            trailing
            disabled={disabledSave}
            icon="save"
            label="Guardar"
            on:click={ accionBtn }
        />
        <!-- <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        /> -->
    </div>


</div>