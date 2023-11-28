<script>
    import { onMount } from "svelte";
    import Login from "../login/login.svelte";
    import { Router, Route } from "svelte-routing";

    // @ts-ignore
    import { TopAppBar, NavigationDrawer } from "$lib";

    import ContentCompany from "../../components/company/contentCompany.svelte";
    import ContentArticle from "../../components/articles/contentArticle.svelte";

    let isMobile = false, open = true;

    onMount(() => {
        isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        open = !isMobile
    })

</script>

<TopAppBar {isMobile} on:openNav={ () => open = !open }  />
<main class="main" class:main-mobile={isMobile}>
        <NavigationDrawer     
            props={ { open, isMobile } } 
        />
        <div class="main-content" >
            <Router>  
                <Route path="/login" component={Login} />
                <Route path="/empresas" component={ContentCompany} />
                <Route path="/articulos" component={ContentArticle} />
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