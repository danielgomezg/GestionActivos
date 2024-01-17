<script>
    import { createEventDispatcher } from "svelte";
    import { Card, IconButton, Button } from "$lib";

    export let sucursal = {}
    let dispath = createEventDispatcher();

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div class="card-title">{ sucursal.number }</div>
            <IconButton icon="edit" on:click={ dispath("edit", sucursal) } />
        </div>
        <div class="card-content">
            <div class="store-info__address">
                { `${sucursal.address}.` }
                <strong>{ `${sucursal.commune}, ${sucursal.region}` }</strong>
            </div>
            <div>{ sucursal.description }</div>
        </div>
        <div class="card-actions">
            <Button label="Ver oficinas" type="outlined" color="" custom on:click={ dispath("showStores", sucursal) } />
            <Button label="Nueva oficina" custom on:click={ dispath("newStore", sucursal) } />
        </div>
    </div>
</Card>

<style>
  .store-info {
    display: flex;
    align-items: center;
  }

  .flag {
    width: 25px;
    border-radius: 3px;
  }
</style>