<script>
  import { MDCList } from "@material/list";
  import { MDCRipple } from "@material/ripple";
  import { onMount, createEventDispatcher } from "svelte";

  export let options = [];
  
  let list;
  let listComponent;
  let dispatch = createEventDispatcher();
  
  onMount(() => {
    list = new MDCList(listComponent);
    list.singleSelection = true;
    const listItemRipples = list.listElements.map(
      (listItemEl) => new MDCRipple(listItemEl)
    );
  });
</script>


<ul
  bind:this={listComponent}
  class="mdc-list mdc-list-main"
  data-evolution="true"
  role="listbox"
  aria-label="List with caterogies"
>
  {#each options as option}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <li class="mdc-list-item" tabindex="0" on:click={ dispatch('select', option.id) }>
      <span class="mdc-list-item__ripple"></span>
      <span class="mdc-list-item__text">{option.description}</span>
    </li>
    <!-- <li role="separator" class="mdc-list-divider"></li> -->
    {#if option.children}
      <svelte:self options={option.children} on:select />
      <!-- <ul class="mdc-list mdc-list-child">
        {#each option.children as child}
          <li class="mdc-list-item" tabindex="0" on:click={ dispatch('select', child.id) }>
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">{child.description}</span>
          </li>
          <li role="separator" class="mdc-list-divider"></li>
        {/each}
      </ul> -->
    {/if}

  {/each}
</ul>
<style>
  .mdc-list {
    /* border-radius: 3px; */
    background-color: #FFF;
    padding: 0;
  }
  
  .mdc-list-main {
    border: 1px solid #e5e5e5;
  }

  .mdc-list-child {
    padding-left: 20px;
    background-color: #f5f5f5;
  }

  .mdc-list-item {
    height: 50px;
    display: flex;
    align-items: center;
  }
</style>