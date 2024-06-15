<script>
    
    import { MDCChipSet } from '@material/chips';
    import { onMount, createEventDispatcher } from 'svelte';

    export let chips = []
    export let action = 'remove'
    export let type = 'filled'

    let chipset
    let chipsetComponent

    let dispatch = createEventDispatcher();

    onMount(() => {
        chipset = new MDCChipSet(chipsetComponent);
    })

</script>
<span 
  bind:this={chipsetComponent} 
  class="mdc-evolution-chip-set" 
  role="listbox" 
  aria-orientation="horizontal">
    <span class="mdc-evolution-chip-set__chips" role="presentation">
      {#each chips as chip }
        <span 
          id={chip.id} 
          role="presentation" 
          class="mdc-evolution-chip chip-{chip.color}" 
          class:mdc-chip--outlined={type === 'outlined'} 
        >
          <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
            <!-- {#if chip?.action } -->
              <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="0" data-mdc-deletable="true" on:click>
                <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
                <span class="mdc-evolution-chip__text-label">{chip.label}</span>
              </button>
            <!-- {/if} -->
          </span>
          {#if action != ''}
            <button 
              class="mdc-evolution-chip__action mdc-evolution-chip__action--trailing" 
              type="button" 
              tabindex="-1" 
              data-mdc-deletable="true" 
              aria-hidden="true"
              on:click={ () => {
                // Eliminar el chip de chips
                if (action === 'remove') dispatch('deleteFilter', chip)
                else dispatch(chip.dispatch, chip)
              } }
            >
              <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"></span>
              <span class="mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing material-symbols-rounded">{ action == 'remove' ? 'close' : chip.icon }</span>
              <!-- <span class="material-symbols-rounded">close</span> -->

            </button>
          {/if}
        </span>
      {/each}
    </span>
</span>

<style>
    .mdc-evolution-chip__action {
      margin-right: 8px;
    }

    .mdc-chip--outlined {
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    .red {
      border-color: red;
    }

    .green {
      border-color: green;
    }

    .yellow {
      border-color: yellow;}

</style>