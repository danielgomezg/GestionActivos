<script>
    // @ts-ignore
    import { Card, Button, TextField, Snackbar } from "$lib";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
    import { empresas } from "../../stores/store";
    import { user } from "../../stores/store";
  
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

        if (usuario.password == "") {
            message = "Falta ingresar constraseña"
            error = true;
            return false;
        }

        error = false;
        return true;
    }

    function ingresar() {
        // let valid = validData()
        // console.log(valid)
        // console.log(error)
        // if (!valid) return;

        loading = true;

        setTimeout(() => {
            user.set({
                name: 'Admin',
                token: '',
                perfil: '',
                profile: {
                    name: 'admin',
                    actions: ['post', 'put', 'delete'] 
                }
            })
            navigate("/empresas", {replace: true})
            loading = false
        }, 1000)
    }

    onMount(() => {
        // CHECK IF IS LOGGED.

        // SI ESTA LOGGEADO REDIRECCIONAR A /home
    })

    // $: if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    //     error.message = ""
    //     error.show = false
    // }

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
                on:click={ ingresar } 
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