<script>
    import { getContext } from "svelte";
    import { Divider, IconButton } from "$lib";

    export let article = {};

    let editActivo = getContext('editActivo')

    let activos = [
        {
            barcode: '001234817384929818200',
            createdAt: '21/12/2023',
            purchase: '20/12/2023',
            serie: 'al-09saiosui',
            model: 'green 256GB',
            name_in_charge: 'Cristiano Ronaldo',
            rut_in_charge: '11.111.111-1',
            numRegister: '',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ]
</script>
<div>
    {#each activos as activo}
        <div>
            <div class="info__title">
                <div>    
                    <strong>{ activo.barcode }</strong>
                    <h5>{ `Adquirido el ${activo.purchase} - Agregado el ${activo.createdAt}` }  </h5>
                </div>
                <div>
                    <IconButton icon="edit" on:click={ () => editActivo(activo, article) } />
                    <IconButton icon="delete" />
                </div>
            </div>
            <div>
                <li>{ `Serie: ${activo.serie}` }</li>
                <li>{ `Modelo: ${activo.model}` }</li>
                <li>{ `Responsable: ${activo.name_in_charge}, ${activo.rut_in_charge}` }</li>
                
            </div>
            <!-- <div class="info__description">
                {activo.description}
            </div> -->
        </div>  
        <Divider />  
    {:else}
        <p>El articulo no cuenta con activos.</p>
    {/each}

</div>

<style>
    .info__title {
        font-size: 16px;
        /* font-weight: bold;     */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info__description {
        font-size: 14px;
        font-weight: lighter;
    }

</style>