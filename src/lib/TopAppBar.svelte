<script>
    // @ts-ignore
    import { IconButton } from "$lib";
    import Api from "../../helpers/ApiCall";
    // import { user } from "../stores/store";
    import { MDCTopAppBar } from '@material/top-app-bar';
    import { createEventDispatcher, onMount } from 'svelte';

    export let isMobile = false
    let topAppBarComponent
    let nameCompany = ''

    let dispatch = createEventDispatcher();

    const getNameCompany = async (companyId) => {
      
      const response = await Api.call(`/company/${companyId}`, 'GET');
      console.log("company name", response);
      if (response.success && response.statusCode == '200') {
        nameCompany = response.data.result.name;
      }
    }

    onMount(() => {  
      if (topAppBarComponent == undefined) return;   
      const topAppBar = new MDCTopAppBar(topAppBarComponent);

      let user = sessionStorage.getItem("user");
      user = JSON.parse(user);
      console.log("top app bar user", user);
      if (user.profile_id == 2) {
        getNameCompany(user.company_id)
      }
    })


</script>

<!-- {#if $user} -->
<header bind:this={topAppBarComponent} class="mdc-top-app-bar mdc-top-app-bar--fixed">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <!-- <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" aria-label="Open navigation menu">menu</button> -->
        <!-- <span class="mdc-top-app-bar__title">Page title</span> -->
        {#if isMobile}
          <IconButton icon="menu" on:click={ () => dispatch("openNav") } />
        {/if}
        <div class="img-container">
          <img
            src="/sca_logo_3.png"
            alt="logo"
          />
        </div>
        <!-- <div class="company-name"> -->
          {#if nameCompany != ''}
            <h1 class="company-name">{nameCompany}</h1>
          {/if}
        <!-- </div> -->

      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <!-- <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button> -->
        <slot name="account" />
      </section>
    </div>
</header>
<!-- {/if} -->

<style>
  .img-container {
    height: 100%;
  }

  img {
    height: 100%;
  }

  .company-name {
    margin: 0;
    margin-left: 20px;
    border-left: solid 1px white;
    padding-left: 20px;
  }

</style>