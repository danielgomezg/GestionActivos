<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import Chip from './chip.svelte';
    import IconButton from './IconButton.svelte';
    import { MDCDataTable } from '@material/data-table';
    import Checkbox from './Checkbox.svelte';
    
  
    export let count = 0;
    export let data = [];
    export let headers = [];
    export let filters = {};

    let dataTableComponent;
    let dispatch = createEventDispatcher();

    onMount(() => {
      // const checkbox = new MDCCheckbox(checkboxComponent);
      const dataTable = new MDCDataTable(dataTableComponent);
        // dataTable.listen('MDCDataTable:rowSelectionChanged', (event) => {
        //     console.log(event.detail);
        // });
    });

    $: console.log('filters > ', filters)

</script>

<div bind:this={dataTableComponent} class="mdc-data-table">
    <div class="mdc-data-table__table-container">
        
      <table class="mdc-data-table__table" aria-label="">
        <thead>
            <tr class="mdc-data-table__row">
              <td class="mdc-data-table__cell" >
                <span class="material-symbols-rounded">filter_list</span>
              </td>
              <td class="mdc-data-table__cell" colspan={ headers.length  - 1}>
                <Chip chips={ filters } on:deleteFilter />
              </td>
            </tr>
            <tr class="mdc-data-table__header-row">
              <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                <Checkbox />
              </th>
              {#each headers as header}
                <th 
                    class="mdc-data-table__header-cell" 
                    class:mdc-data-table__header-cell--numeric={ header.numeric }
                    role="columnheader" 
                    scope="col">{ header.label }</th>
              {/each}
            </tr>
        </thead>
        <tbody class="mdc-data-table__content">
            {#each data as row}
              <tr class="mdc-data-table__row">
                <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                  <Checkbox />
                </td>
                {#each Object.entries(row) as [key, value] (key)}
                  {#if key == 'document'}
                    <td
                        class="mdc-data-table__cell"
                    >
                      {#if value != ''}
                        <IconButton icon="description" on:click={ dispatch('getDocument', value) } />
                      {/if}
                    </td>
                  {:else}
                    <td 
                        class="mdc-data-table__cell"
                    >
                        { value }
                    </td>
                  {/if}
                {/each}                   
              </tr>
            {/each}
        </tbody>
      </table>
    </div>
  
    <div class="mdc-data-table__pagination">
      <div class="mdc-data-table__pagination-trailing">
        <div class="mdc-data-table__pagination-rows-per-page">
          <div class="mdc-data-table__pagination-rows-per-page-label">
            Activos por pagina
          </div>
  
          <div class="mdc-select mdc-select--outlined mdc-select--no-label mdc-data-table__pagination-rows-per-page-select">
            <div class="mdc-select__anchor" role="button" aria-haspopup="listbox"
                  aria-labelledby="demo-pagination-select" tabindex="0">
              <span class="mdc-select__selected-text-container">
                <span id="demo-pagination-select" class="mdc-select__selected-text">10</span>
              </span>
              <span class="mdc-select__dropdown-icon">
                <svg
                    class="mdc-select__dropdown-icon-graphic"
                    viewBox="7 10 10 5">
                  <polygon
                      class="mdc-select__dropdown-icon-inactive"
                      stroke="none"
                      fill-rule="evenodd"
                      points="7 10 12 15 17 10">
                  </polygon>
                  <polygon
                      class="mdc-select__dropdown-icon-active"
                      stroke="none"
                      fill-rule="evenodd"
                      points="7 15 12 10 17 15">
                  </polygon>
                </svg>
              </span>
              <span class="mdc-notched-outline mdc-notched-outline--notched">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__trailing"></span>
              </span>
            </div>
  
            <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" role="listbox">
              <ul class="mdc-list">
                <li class="mdc-list-item mdc-list-item--selected" aria-selected="true" role="option" data-value="10">
                  <span class="mdc-list-item__text">10</span>
                </li>
                <li class="mdc-list-item" role="option" data-value="25">
                  <span class="mdc-list-item__text">25</span>
                </li>
                <li class="mdc-list-item" role="option" data-value={  count }>
                  <span class="mdc-list-item__text">{ count }</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="mdc-data-table__pagination-navigation">
          <div class="mdc-data-table__pagination-total">
            1‑{ data.length } of { count }
          </div>
          <IconButton icon="first_page" on:click={ () => console.log('first page') } />

          <IconButton icon="chevron_left" on:click={ () => console.log('first page') } />

          <IconButton icon="chevron_right" on:click={ () => console.log('first page') } />

          <IconButton icon="last_page" on:click={ () => console.log('first page') } />

        </div>
      </div>
    </div>
</div>