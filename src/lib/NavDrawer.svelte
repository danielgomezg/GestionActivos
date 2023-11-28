<script>
    import { MDCList } from "@material/list";
    import { Link, Router } from "svelte-routing";
    import { user } from "../stores/user";

    export let props = {}

    let drawerList, selected = '';

    const linkSelected = (to = '') => {
        // event.preventDefault();
        selected = to
    }

    $: console.log($user)


</script>
{#if $user}
<aside class="mdc-drawer mdc-drawer--modal" class:open={ props.open } class:mobile={ props.isMobile }>
    <div class="mdc-drawer__content">
    <nav bind:this={drawerList} class="mdc-list">
        <!-- <a class="mdc-list-item mdc-list-item--activated" href="/empresas" aria-current="page" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
            <span class="mdc-list-item__text">Empresas</span>
        </a> -->
        <Router>
            <Link class="link" to="/empresas" style="color: inherit; text-decoration: none;" on:click={() => selected = '/empresas'}>
                <div class="mdc-list-item mdc-list-item--activated" class:mdc-list-item--activated={selected == '/empresas'} >

                    <span class="mdc-list-item__ripple"></span>
                    <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                    <span class="mdc-list-item__text">Empresas</span>
                </div>
            </Link>
            <Link  to="/articulos" style="color: inherit; text-decoration: none;" on:click={() => linkSelected('/articulos')}>
                <div class="mdc-list-item" class:mdc-list-item--activated={selected == '/articulos'} >
                    <span class="mdc-list-item__ripple"></span>
                    <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                    <span class="mdc-list-item__text">Articulos</span>
                </div>
            </Link>
            <Link  to="/sucursales" style="color: inherit; text-decoration: none;" on:click={() => linkSelected('/sucursales')}>
                <div class="mdc-list-item" class:mdc-list-item--activated={selected == '/sucursales'}>
                    <span class="mdc-list-item__ripple"></span>
                    <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                    <span class="mdc-list-item__text">Sucursales</span>
                </div>
            </Link>
            <Link  to="/reportes" style="color: inherit; text-decoration: none;" on:click={() => linkSelected('/reportes')}>
                <div class="mdc-list-item" class:mdc-list-item--activated={selected == '/reportes'}>
                    <span class="mdc-list-item__ripple"></span>
                    <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                    <span class="mdc-list-item__text">Reportes</span>
                </div>
            </Link>

        </Router>   
    </nav>
    </div>
</aside>
{/if}

<style>
    .open {
        display: block;
    }

    .mdc-list-item {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .mdc-drawer--modal{
        box-shadow: none;
        /* top: 64px; */
    }

    .mobile {
        width: 100%;
    }

</style>
  