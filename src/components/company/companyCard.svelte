<script>
    import { createEventDispatcher } from "svelte";
    // @ts-ignore
    import { Card, IconButton, Button } from "$lib";

    export let company = {}
    let dispath = createEventDispatcher();

    // $: console.log('company => ', company)

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div class="card-title">{ company.name }</div>
            <IconButton icon="edit" on:click={ dispath("edit", company) } />
        </div>
        <div class="card-content">
            <div>🆔 { company.rut }</div>
            <div>
                <img src="/ChileFlag.png" style="width: 20px;" alt="flag" />
                { company.country }
            </div>
            <div class="store-info">
                <span class="material-symbols-outlined">store</span>
                <div> { company.count_sucursal } sucursales</div>
            </div>
        </div>
        <div class="card-actions">
            <Button label="ver sucursales" type="outlined" color="" on:click={ dispath("showStores", company) } />
            <Button label="agregar sucursal" on:click={ dispath("newStore", company) } />
        </div>
    </div>
</Card>

<style>
  .store-info {
    display: flex;
    align-items: center;
  }
</style>