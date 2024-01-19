<script>
    import { onMount } from 'svelte';
    import Chip from './chip.svelte';
    import IconButton from './IconButton.svelte';
    import { MDCDataTable } from '@material/data-table';
  
    export let data = [];
    export let headers = [];
    export let filters = {};

    let dataTableComponent;

    onMount(() => {
        const dataTable = new MDCDataTable(dataTableComponent);
        // dataTable.listen('MDCDataTable:rowSelectionChanged', (event) => {
        //     console.log(event.detail);
        // });
    });

    $: console.log('filters > ', filters)

</script>

<div bind:this={dataTableComponent} class="mdc-data-table">
    <div class="mdc-data-table__table-container">
        
      <table class="mdc-data-table__table" aria-label="Dessert calories">
        <thead>
            <tr class="mdc-data-table__header-row">
                <th class="mdc-data-table__header-cell" >
                    <span class="material-symbols-rounded">filter_list</span>
                </th>
                <th 
                    class="mdc-data-table__header-cell" 
                    colspan={ headers.length - 1} 
                    role="columnheader" 
                    scope="col"
                >
                    
                    {#each Object.entries(filters) as [key, value] (key)}
                       
                        <Chip chip={ value } />
                    {/each}
                    
                </th>
            </tr>
            <tr class="mdc-data-table__header-row">
            {#each headers as header}
                <th 
                    class="mdc-data-table__header-cell" 
                    class:mdc-data-table__header-cell--numeric={ header.numeric }
                    role="columnheader" 
                    scope="col">{ header.label }</th>
            {/each}

            <!-- <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Dessert</th>
            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Carbs (g)</th>
            <th class="mdc-data-table__header-cell mdc-data-table__header-cell--numeric" role="columnheader" scope="col">Protein (g)</th>
            <th class="mdc-data-table__header-cell" role="columnheader" scope="col">Comments</th> -->
          </tr>
        </thead>
        <tbody class="mdc-data-table__content">
            {#each data as row}
                <tr class="mdc-data-table__row">
                    {#each Object.entries(row) as [key, value] (key)}
                        {#if key == 'document'}
                            <td
                                class="mdc-data-table__cell"
                            >
                                <IconButton icon="description" on:click={ () => console.log('download document', row) } />
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
          <!-- <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">Frozen yogurt</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.0</td>
            <td class="mdc-data-table__cell">Super tasty</td>
          </tr>
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">Ice cream sandwich</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">37</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">4.33333333333</td>
            <td class="mdc-data-table__cell">I like ice cream more</td>
          </tr>
          <tr class="mdc-data-table__row">
            <th class="mdc-data-table__cell" scope="row">Eclair</th>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">24</td>
            <td class="mdc-data-table__cell mdc-data-table__cell--numeric">6.0</td>
            <td class="mdc-data-table__cell">New filing flavor</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  
    <div class="mdc-data-table__pagination">
      <div class="mdc-data-table__pagination-trailing">
        <div class="mdc-data-table__pagination-rows-per-page">
          <div class="mdc-data-table__pagination-rows-per-page-label">
            Rows per page
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
                <li class="mdc-list-item" role="option" data-value="100">
                  <span class="mdc-list-item__text">100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="mdc-data-table__pagination-navigation">
          <div class="mdc-data-table__pagination-total">
            1‑10 of 100
          </div>
          <IconButton icon="first_page" on:click={ () => console.log('first page') } />

          <IconButton icon="chevron_left" on:click={ () => console.log('first page') } />

          <IconButton icon="chevron_right" on:click={ () => console.log('first page') } />

          <IconButton icon="last_page" on:click={ () => console.log('first page') } />


          <!-- <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-first-page="true" disabled>
            <div class="mdc-button__icon">first_page</div>
          </button>
          <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-prev-page="true" disabled>
            <div class="mdc-button__icon">chevron_left</div>
          </button>
          <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-next-page="true">
            <div class="mdc-button__icon">chevron_right</div>
          </button>
          <button class="mdc-icon-button material-icons mdc-data-table__pagination-button" data-last-page="true">
            <div class="mdc-button__icon">last_page</div>
          </button> -->
        </div>
      </div>
    </div>
</div>