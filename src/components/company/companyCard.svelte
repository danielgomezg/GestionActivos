<script>
    import { createEventDispatcher } from "svelte";
    // @ts-ignore
    import { Card, IconButton, Button } from "$lib";

    export let company = {}
    let dispath = createEventDispatcher();

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // $: console.log('company => ', company)

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div class="card-title">{ company.name }</div>
            <IconButton icon="edit" on:click={ dispath("edit", company) } />
        </div>
        <div class="card-content">
            <div>{ company.rut }</div>
            <div>
                <img src={ '/flags/' + normalizeText(company.country) + '.png' } class="flag" alt="flag" />
                { company.country }
            </div>
            <div class="store-info">
                <span class="material-symbols-outlined">store</span>
                <!-- Muestra la cantidad de sucursales -->
                <div>{ company.count_sucursal || 0 } sucursales</div>
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

  .flag {
    width: 25px;
    border-radius: 3px;
  }
</style>