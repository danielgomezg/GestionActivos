<script>
  import { onMount } from "svelte";
    import { user, sideNavigationLinks, menu } from "../stores/store";
    import { Link, Router } from "svelte-routing";

    export let props = {}

    let menuProfile = []
    let drawerList, selected = '';

    const checkPermisionMenu = (user) => {
        if (user?.profileActions == undefined) return false
       
        menu = $sideNavigationLinks.filter(navLink => user.profileActions.includes(navLink.action))
        
    }

    const displayMenu = (menu) => {
        if (user == null) return

        let mnu_filter = menu.filter(mnu => mnu.profiles.includes($user.profile_id))
        menuProfile = [...mnu_filter]
    }

    onMount(() => {
        console.log()
        selected = window.location.pathname
    })

    // $: checkPermisionMenu($user);
    $: if($user != {}) displayMenu($menu)

</script>
<aside class="mdc-drawer mdc-drawer--modal" class:open={ props.open } class:mobile={ props.isMobile }>
    <div class="mdc-drawer__content">
    <nav bind:this={drawerList} class="mdc-list">
        <Router>
            {#each menuProfile as navigation }
                <!-- {#if checkPermision(navigation.action) } -->
                <Link 
                    to="{navigation.path}" 
                    style="color: inherit; text-decoration: none;" 
                    on:click={() => {
                        // props.open = false
                        selected = navigation.path
                    } }>
                    <div class="mdc-list-item" class:mdc-list-item--activated={ selected == navigation.path } >
                        <span class="mdc-list-item__ripple"></span>
                        <!-- <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i> -->
                        <span class="mdc-list-item__text">{navigation.name}</span>
                    </div>
                </Link>
                <!-- {/if} -->
            {/each}

        </Router>   
    </nav>
    </div>
</aside>

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
        z-index: 1;
    }

    .mobile {
        width: 100%;
    }

    .mdc-list-item__text {
        text-transform: capitalize;
    }

</style>
  