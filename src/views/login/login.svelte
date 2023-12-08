<script>
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { user } from "../../stores/store";
    import Api from "../../../helpers/ApiCall";
    // @ts-ignore
    import { Card, Button, TextField, Snackbar } from "$lib";
    
    let usuario = {
        email: "",
        password: ""
    }
    let message = "", error = false, loading = false;

    const validData = () => {

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usuario.email)) {
            message = "Correo invalido"
            error = true
            return false;
        }

        if (usuario.email == "") {
            message = "Falta ingresar un correo"
            error = true;
            return false;
        }

        if (usuario.password == "") {
            message = "Falta ingresar constraseña"
            error = true;
            return false;
        }

        error = false;
        return true;
    }

    function saveTokenToLocalStorage(token) {
        localStorage.setItem('accessToken', token);
    }

    async function iniciarSesion(e){
        e.preventDefault()

        console.log("email: " + usuario.email + " password: " + usuario.password)

        let valid = validData()

        if(valid){
            let body = JSON.stringify(usuario) 
            let response = (await Api.call('http://127.0.0.1:9000/login', 'POST', { body }))
            console.log('RESPONSE LOGIN --> ', response)
            if (response.success) {
                // @ts-ignore
                if (response.data.code == 201) {
                    message = "Usuario ingresado correctamente"
                    usuario.email = '',
                    usuario.password = ''
                    user.set({
                        ...response.data.result.user
                    })
                    localStorage.setItem("user",  JSON.stringify($user))
                    saveTokenToLocalStorage(response.data.result.access_token)
                    navigate("/empresas", {replace: true})
                }
            } 
        
        }
    }

    onMount(() => {
        localStorage.removeItem("user")
        user.set(null)
    })

    $: console.log('user store > ', $user)

</script>
<div style="display: flex; justify-content: center;">
    <Card width="320px">
        <div class="logo-container theme-dark">
            <img
                src="/sca_logo_1.jpeg"
                alt="logo"
            />
        </div>
        <div class="login-content">
            <h3>Ingreso usuarios</h3>
            <TextField 
                required 
                type="email"
                label="Correo" 
                bind:value={usuario.email} 
            />
            <TextField 
                required 
                type="password"
                label="Contraseña" 
                bind:value={usuario.password} 
            />
            <br>
            {#if error}
                <Snackbar type="error" message={message} />
            {/if}
            <Button 
                label="Ingresar" 
                { loading } 
                on:click={ iniciarSesion } 
            />
        </div>

    </Card>
</div>

<style>
    h3 {
        text-align: center;
    }
    img {
        border-radius: 12px;
        width: 100%;
    }
    .login-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
    }

    .logo-container {
        /* background-color: var(--mdc-theme-primary); */
        border-radius: 12px 12px 0 0;
        /* padding: 16px; */
        border-bottom: #79747E solid 1px;
    }

</style>