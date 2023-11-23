<script>
    // @ts-ignore
    import { Card, Button, TextField, Snackbar, Loading } from "$lib";
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";
  
    let email = "", password = ""

    function ingresar() {
        console.log('navigate to')
        navigate("/home", {replace: true})
    }

    onMount(() => {
        // CHECK IF IS LOGGED.

        // SI ESTA LOGGEADO REDIRECCIONAR A /home
    })

</script>
<Card>
    <div class="logo-container theme-dark">
        <img
            src="/sca-logo-1.png"
            alt="logo"
        />
    </div>
    <div class="login-content">
        <h3>Ingreso usuarios</h3>
        <TextField 
            required 
            type="email"
            label="Correo" 
            bind:value={email} 
        />
        <TextField 
            required 
            type="password"
            label="Contraseña" 
            bind:value={password} 
        />
        <br>
        <Snackbar type="error" message="Un error ha ocurrido" />
        <Button label="Ingresar" on:click={ ingresar } />
    </div>

</Card>

<style>
    .login-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
    }

    .logo-container {
        background-color: var(--mdc-theme-primary);
        border-radius: 12px 12px 0 0;
        padding: 16px;
    }

</style>