<script>
  import { Menu, IconButton, Checkbox } from "$lib";
  import { MDCList } from "@material/list";
  import { MDCRipple } from "@material/ripple";
  import { onMount, createEventDispatcher } from "svelte";

  export let options = [];
  export let level = 0;
  export let parent_id = 0;
  export let customClass = '';
  export let origin = 0;
  export let actions = false;

  let list;
  let listComponent;
  let openActions = [];
  let dispatch = createEventDispatcher();
  
  onMount(() => {
    // list = new MDCList(listComponent);
    // list.singleSelection = true;
    // const listItemRipples = list.listElements.map(
    //   (listItemEl) => new MDCRipple(listItemEl)
    // );
  });

</script>

{#if options.length > 0}
<ul
  data-level={ level }
  data-parent={ parent_id }
  data-root={origin}
  bind:this={listComponent}
  class="mdc-list mdc-list-main {customClass}"
  data-evolution="true"
  role="listbox"
  aria-label="List with caterogies"
>
  {#each options as option, index}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-role-has-required-aria-props -->
    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->   
    <li 
      id={option.id}
      class:list-active={option.active}
      class="mdc-list-item__custom" 
      tabindex={option.parent_id}
      on:click|self={ (e) => {
        console.log('CLICK LI')
        e.stopPropagation();
        e.preventDefault();
        // e.preventDefault();
        // if (option.active) {
        //   option.children = []
        //   return;
        // }
        option.active = !option.active;

        let actives = document.querySelectorAll(`ul.${customClass}:not([data-level='0']):not([data-parent='${option.parent_id}'])`);
        console.log('actives ul -> ', actives)
        // Se eliminan los ul que no tenga el mismo parent_id
        actives.forEach((ul) => {
          // ul.remove();
          if (ul.getAttribute('data-root') != origin) {
            // ul.remove();
            // dispatch('delete', ul.getAttribute('data-parent'))
          }
        })

        dispatch('select', option.id)

      } }
    >
      <span class="mdc-list-item__ripple"></span>
      <span class="mdc-list-item__text">{option.description}</span>
      {#if actions}
        <span class="mdc-list-item__meta">
          <!-- <div class="menu-container"> -->
            <Menu
                  bind:open={openActions[index]}
                  options={
                      [
                        { label: "Añadir", dispatch: "add" },
                        { label: "Editar", dispatch: "edit"},
                        { label: "Eliminar", dispatch: "delete" }
                      ]  
                  }
                  on:add={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch("add", option)
                  }}
                  on:edit={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch("edit", { ...option }) 
                  }}
                  on:delete={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch("delete", option)
                  }}
              >
                
            </Menu>
            <IconButton 
              icon="more_vert" 
              on:click={(e) => {
                e.stopPropagation();
                e.preventDefault();
                openActions[index] = !openActions[index]
              } } 
            />
          <!-- </div> -->
        </span>
      {/if}
    </li>
    <!-- <li role="separator" class="mdc-list-divider"></li> -->
    {#if option.children}
      <svelte:self
        origin={ level == 0 ? option.id : origin }
        {customClass}
        level={level + 1} 
        parent_id={option.id}
        options={option.children} 
        actions={actions}
        on:select 
        on:edit
        on:delete
        on:add
      />
    {/if}

  {/each}
</ul>
{/if}
<style>
  .mdc-list {
    /* border-radius: 3px; */
    background-color: #FFF;
    padding: 0;
  }
  
  .mdc-list-main {
    border: 1px solid #e5e5e5;
  }


  .mdc-list-item__custom {
    height: 50px;
    display: flex;
    align-items: center;
    /* position: relative; */
    overflow: hidden;
    cursor: pointer;
    padding: 0px 10px;
  }

  .mdc-list-item__meta {
    margin-left: auto;
  }

  .menu-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .has-children {
    padding-left: 20px; /* Ajusta este valor a lo que necesites */
    background-color: gray;
  }
</style>