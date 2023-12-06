<script>
    import { onMount } from "svelte";
    import Login from "../login/login.svelte";
    import { Router, Route } from "svelte-routing";
    import { user } from "../../stores/store";


    // @ts-ignore
    import { TopAppBar, NavigationDrawer, Snackbar } from "$lib";

    import UserAccount from "../../components/userAccount/userAccount.svelte";
    import ContentCompany from "../../components/company/contentCompany.svelte";
    import ContentArticle from "../../components/articles/contentArticle.svelte";
    import ContentUsuarios from "../../components/usuarios/contentUsuarios.svelte";

    let isMobile = false, open = true;

    onMount(() => {
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        open = !isMobile


        let userSession = localStorage.getItem("user")
        console.log('local storage user: ', JSON.parse(userSession))
        if (user != null) {
            user.set(JSON.parse(userSession))
        }
        console.log($user)
    })

</script>

{#if $user}
    <TopAppBar {isMobile} on:openNav={ () => open = !open }  >
        <div slot="account" class="flex-row align-center">
            <UserAccount />
        </div>
    </TopAppBar>
{/if}
<main class="main" class:main-mobile={isMobile}>
        {#if $user}
            <NavigationDrawer     
                props={ { open, isMobile } } 
            />
        {/if}
        <div class="main-content" >
            <Snackbar />
            <Router>  
                <Route path="/login" component={Login} />
                <Route path="/empresas" component={ContentCompany} />
                <Route path="/articulos" component={ContentArticle} />
                <Route path="/usuarios" component={ContentUsuarios} />
            </Router>
        </div>
</main>

<style>
    .main {
        position: relative;
        top: 64px;
    }

    .main-mobile {
        top: 57px;
    }
    .main-content {
        max-width: 1230px;
        margin: 0px auto;
        padding: 0 16px;
    }



</style>