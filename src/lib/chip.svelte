<script>
    
    import {MDCChipSet} from '@material/chips';
    import { onMount } from 'svelte';

    export let chip = {}

    let chipset
    let chipsetComponent

    onMount(() => {
        chipset = new MDCChipSet(chipsetComponent);
    })

</script>
<span bind:this={chipsetComponent} class="mdc-evolution-chip-set chip-red" role="grid">
    <span class="mdc-evolution-chip-set__chips chip-red" role="presentation">
      <span class="mdc-evolution-chip chip-red { chip.color }" role="row" id={chip.id} >
        <span class="mdc-evolution-chip__cell hip-red  mdc-evolution-chip__cell--primary" role="gridcell">
          <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="0" on:click>
            <span class="mdc-evolution-chip__ripple chip-red mdc-evolution-chip__ripple--primary"></span>
            <span class="mdc-evolution-chip__text-label">{chip.label}</span>
          </button>
        </span>
      </span>

      <!-- <span class="mdc-evolution-chip" role="row" id="c1">
        <span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary" role="gridcell">
          <button class="mdc-evolution-chip__action mdc-evolution-chip__action--primary" type="button" tabindex="-1">
            <span class="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
            <span class="mdc-evolution-chip__text-label">Chip two</span>
          </button>
        </span>
      </span> -->

    </span>
</span>

<style>
    .update {
        background-color: #ffab91;
        color: #000;
    }

    .delete {
        background-color: #ff8a80; 
        color: #000;
    }

    .create {
        background-color: #81d4fa; 
        color: #000;
    }

    .get {
      background-color: #7fdc8a; 
      color: #000;
    }
</style>