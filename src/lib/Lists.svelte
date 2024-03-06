<script>
  import { Menu, IconButton, Checkbox } from "$lib";
  import { MDCList } from "@material/list";
  import { MDCRipple } from "@material/ripple";
  import { onMount, createEventDispatcher } from "svelte";

  export let options = [];
  
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


<ul
  data=""
  bind:this={listComponent}
  class="mdc-list mdc-list-main"
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
      class="mdc-list-item__custom" 
      tabindex={option.parent_id}
      on:click|self={ (e) => {
        console.log('CLICK LI')
        e.stopPropagation();
        e.preventDefault();
        
        document.querySelectorAll('.list-active').forEach((el, i) => {
          console.log('ELEMENTO -> ', el)
          el.classList.remove('list-active')
          // buscar el padre que tenga tabindex = 0, con javascrip


        })
        e.target.classList.add('list-active')
        
        // if (option.active) {

          dispatch('select', option.id)
        // } 
          
        

      } }
    >
      <span class="mdc-list-item__ripple"></span>
      <span class="mdc-list-item__text">{option.description}</span>
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
                on:add={() => {
                  console.log('CLICK ADD')
                  dispatch("add", option)
                }}
                on:edit={(e) => {
                  console.log('CLICK EDIT')
                  e.stopPropagation();
                  e.preventDefault();
                  dispatch("edit", { ...option }) 
                }}
                on:delete={() => {
                  console.log('CLICK DELETE')
                  dispatch("delete", option)
                }}
            >
              
          </Menu>
          <IconButton 
            icon="more_vert" 
            on:click={(e) => {
              console.log('CLICK ICON')
              e.stopPropagation();
              e.preventDefault();
              openActions[index] = !openActions[index]
            } } 
          />
        <!-- </div> -->
      </span>
    </li>
    <!-- <li role="separator" class="mdc-list-divider"></li> -->
    {#if option.children}
      <svelte:self 
        options={option.children} 
        on:select 
        on:edit
        on:delete
        on:add
      />
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