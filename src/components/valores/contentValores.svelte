<script>
    import { onMount } from "svelte";
    import { Button, Fab } from "$lib";
    import ValueActive from "./valueActive.svelte";

    let response = [];

    const getActivosValues = () => {
        response = [
            {
                id: 1,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 1,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 2,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 2,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 3,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 3,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 4,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 4,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 5,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 5,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 6,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 6,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 7,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 7,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
            },
            {
                id: 8,
                valor_real: 0,
                valor_adquisicion: 0,
                vida_util: 0,
                activo: {
                    id: 8,
                    barcode: '1903213',
                    codigo_virtual: '',
                }
                
            }
        ]
    }

    onMount(() => {
        getActivosValues();
    });

</script>

<div class="mobile-only" style="position: fixed; bottom: 10px; right: 10px; z-index: 10">
    <!-- <Fab on:click={ () => console.log('fab') } /> -->
</div>
<div style="position: relative">
    <div class="header-content" style="position: sticky; top: 40px; z-index: 3; background-color: #f0f0f0; padding: 34px 0 10px">
        <div class="desktop-only">
            <h2>Valores activos</h2>
        </div>
        <!-- <Search value="" /> -->
        <div>
        <!-- <CompanySearch 
            bind:empresas={empresas} 
            on:startSearch={ () => {
                offset = 0;
            } }
            on:removeSearch={ () => {
                console.log('REMOVE SEARCH')
                offset = 0
                empresas = []
                getCompanies()
            } }
            on:notFound={ () => {
                empresas = []
            } }
        /> -->
        </div>
    </div>

    <div class="flex-column gap-8 mt-8" style="padding: 44px 0 10px;">
        {#each response as activeValue }
            <ValueActive {activeValue} />
        {/each}
        
    </div>
</div>