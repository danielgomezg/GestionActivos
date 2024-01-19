<script>
    import { Select } from "$lib";
    import { onMount, createEventDispatcher } from "svelte";
    import Api from "../../../helpers/ApiCall";

  
    export let companyId = 0;
    export let selectedOffice = '';
    export let selectedSucursal = '';  
    export let isEdit = false;
    export let show = ['sucursal', 'office'];
    export let custom = false

    let sucursales = [];
    let offices = [];

    let dispatch = createEventDispatcher();

    const getSucursales = async () => {
        if (companyId == 0) {
            sucursales = [];
            return;
        }; 
        let response = await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES --> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
        }
        else {
            sucursales = [];
        }
    };

    const getOfficesBySucursal = async (sucursalId) => {
        let response = await Api.call(`http://127.0.0.1:9000/officePorSucursal/${sucursalId}`, 'GET');
        console.log('RESPONSE GET OFFICES --> ', response);
        if (response.success && response.statusCode === '200') {
            offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
        }else{
            offices = []
        }
    };

    const getOffice = async (selectedOffice)=>{
        let response = await Api.call(`http://127.0.0.1:9000/office/${selectedOffice}`,'GET')
        console.log('RESPONSE GET OFFICE --> ', response);
        if (response.success && response.statusCode === '200') {
            console.log("200")
            return response.data.result
        }
        return;
    }

    onMount(async () => {
        await getSucursales();
        
        if(isEdit){
            let office = await getOffice(selectedOffice)
            if(office){
                selectedSucursal = office.sucursal_id
                await getOfficesBySucursal(office.sucursal_id)
                selectedOffice = office.id
            }
        }
        
    });

    $: if (selectedSucursal) {
        getOfficesBySucursal(selectedSucursal);
    }

    $: if (companyId) getSucursales();

</script>

{#if show.includes('sucursal')}
    {#key sucursales}
    <Select
        label="Sucursal"
        customHeight={custom}
        selected={selectedSucursal}
        options={sucursales}
        on:change={(event) => {
            console.log('CHANGE SUCURSAL -> ', event.detail)
            selectedSucursal = event.detail;
            selectedOffice = ''; // Resetear el valor de la oficina al cambiar la sucursal
            //getOfficesBySucursal(selectedSucursal);
            let store = sucursales.find(sucursal => sucursal.value == event.detail)
            dispatch('changeStore', { selectedSucursal, store })
        }}
    />
    {/key}
{/if}

{#if show.includes('office')}
    {#key offices}
    <Select
        customHeight={custom}
        label="Oficina"
        selected={selectedOffice}
        options={offices}
        on:change={(event) => {
            selectedOffice = event.detail
            // console.log('CHANGE OFFICE -> ', event.detail)
            let office = offices.find(office => office.value == event.detail)
            dispatch('changeOffice', { selectedOffice, office })    
        }}
    />
    {/key}
{/if}

<!-- {#key sucursales}
    {#key offices}
    <Select
        label="Sucursal"
        selected={selectedSucursal}
        options={sucursales}
        on:change={(event) => {
            selectedSucursal = event.detail;
            selectedOffice = ''; // Resetear el valor de la oficina al cambiar la sucursal
            //getOfficesBySucursal(selectedSucursal);
        }}
    />
    {/key}
{/key} -->

<!-- {#key offices}
    <Select
        label="Oficina"
        selected={selectedOffice}
        options={offices}
        on:change={(event) => selectedOffice = event.detail}
    />
{/key} -->
