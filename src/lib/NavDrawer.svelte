<script>
  import { onMount } from "svelte";
    import { user, sideNavigationLinks } from "../stores/store";
    import { Link, Router } from "svelte-routing";

    export let props = {}

    let drawerList, selected = '';

    onMount(() => {
        console.log()
        selected = window.location.pathname
    })



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

            {#each $sideNavigationLinks as navigation }
                <Link 
                    to="/{navigation.link}" 
                    style="color: inherit; text-decoration: none;" 
                    on:click={() => {
                        props.open = false
                        selected = '/' + navigation.link
                    } }>
                    <div class="mdc-list-item" class:mdc-list-item--activated={ selected == '/' + navigation.link } >
                        <span class="mdc-list-item__ripple"></span>
                        <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                        <span class="mdc-list-item__text">{navigation.link}</span>
                    </div>
                </Link>
            {/each}

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

    .mdc-list-item__text {
        text-transform: capitalize;
    }

</style>
  