<script>
  import { createEventDispatcher, onMount } from "svelte";
  import Chip from "./chip.svelte";
  import IconButton from "./IconButton.svelte";
  import { MDCDataTable } from "@material/data-table";
  import Checkbox from "./Checkbox.svelte";

  export let count = 0;
  export let data = [];
  export let headers = [];
  export let filters = {};

  let dataTable;
  let dataTableComponent;
  let dispatch = createEventDispatcher();

  const checkedRow = (event) => {
    console.log("checked row: ", event);
    let index = event.detail.rowIndex;
    let element = data[index];
    console.log("element: ", element);
  };

  onMount(() => {
    // const checkbox = new MDCCheckbox(checkboxComponent);
    dataTable = new MDCDataTable(dataTableComponent);
    dataTable.listen("MDCDataTable:rowSelectionChanged", checkedRow);
    // dataTable.listen('MDCDataTable:rowSelectionChanged', (event) => {
    //     console.log(event.detail);
    // });
  });

  $: if (data.length > 0 && dataTable != undefined) {
    console.log("re render: ", data.length)
    dataTable.layout();
  } 
  $: console.log("data table ", data);
</script>

<div bind:this={dataTableComponent} class="mdc-data-table">
  <div class="mdc-data-table__table-container">
    <div class="table-filters">
      <div>
        <span class="material-symbols-rounded">filter_list</span>
      </div>
      <div>
        <Chip chips={ filters } on:deleteFilter />
      </div>
      <div class="align-right">
        <IconButton icon="edit" on:click={ () => dispatch('clearFilters') } />
        <IconButton icon="delete" on:click={ () => dispatch('clearFilters') } />
      </div>
    </div>
    <table class="mdc-data-table__table" aria-label="activos">
      <thead>
        <tr class="mdc-data-table__header-row">
          <th
            class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox"
            role="columnheader"
            scope="col"
          >
            <div
              class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected"
            >
              <input
                type="checkbox"
                class="mdc-checkbox__native-control"
                aria-label="Toggle all rows"
              />
              <div class="mdc-checkbox__background">
                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                  <path
                    class="mdc-checkbox__checkmark-path"
                    fill="none"
                    d="M1.73,12.91 8.1,19.28 22.79,4.59"
                  />
                </svg>
                <div class="mdc-checkbox__mixedmark"></div>
              </div>
              <div class="mdc-checkbox__ripple"></div>
            </div>
          </th>
          {#each headers as header}
            <th 
              class="mdc-data-table__header-cell" 
              role="columnheader" 
              scope="col">{ header.label }
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class="mdc-data-table__content">

        {#each data as row, index}
          <tr data-row-id={ `u${index}` } class="mdc-data-table__row">
            <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
              <div class="mdc-checkbox mdc-data-table__row-checkbox">
                <input
                  type="checkbox"
                  class="mdc-checkbox__native-control"
                  aria-labelledby={ `u${index}` }
                />
                <div class="mdc-checkbox__background">
                  <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path
                      class="mdc-checkbox__checkmark-path"
                      fill="none"
                      d="M1.73,12.91 8.1,19.28 22.79,4.59"
                    />
                  </svg>
                  <div class="mdc-checkbox__mixedmark"></div>
                </div>
                <div class="mdc-checkbox__ripple"></div>
              </div>
            </td>

            {#each headers as header (header.name)}
              {#if row[header.name] !== undefined}
                {#if header.name == 'bar_code'}
                  <th class="mdc-data-table__cell" scope="row" id={ `u${index}` }
                    >{ row[header.name] }</th
                  >
                {:else if header.name == 'accounting_document'}
                  <td
                      class="mdc-data-table__cell"
                  >
                    {#if row[header.name] != ''}
                      <IconButton icon="description" on:click={ dispatch('getDocument', row[header.name]) } />
                    {/if}
                  </td>
                {:else}
                  <td 
                      class="mdc-data-table__cell"
                  >
                      { row[header.name] }
                  </td>
                {/if}
              {/if}
            {/each}

            
            <!-- {#each Object.entries(row) as [key, value] (key)}
            {#if headers.map(h => h.name).includes(key)}
              {#if key == 'bar_code'}
                <th class="mdc-data-table__cell" scope="row" id={ `u${index}` }
                  >{ value }</th
                >
              {:else if key == 'accounting_document'}
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
            {/if}
            {/each}               -->
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<style>
  .table-filters {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    border-bottom: #ccc 2px solid;
    gap: 24px;
  }
  .align-right {
    margin-left: auto;
  }
</style>