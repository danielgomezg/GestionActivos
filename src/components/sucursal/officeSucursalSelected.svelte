<script>
    import { Select } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import Button from "../../lib/Button.svelte";
    import { lockOffice, lockStore, lockArticle } from "../../stores/store";
    import { onMount, createEventDispatcher, tick, onDestroy } from "svelte";

    export let keep = false;
    export let companyId = 0;
    export let custom = false;
    export let isEdit = false;
    export let cleanStore = false;
    export let selectedOffice = 0;
    export let selectedSucursal = 0;  
    export let show = ['sucursal', 'office'];

    let offices = [];
    let sucursales = [];
    let disabledKeep = true;
    let disabledOffice = false;
    let keepOfficeIcon = false;
    let disabledSucursal = false;

    let request = false;

    let dispatch = createEventDispatcher();

    const keepOffice = () => {
        console.log('KEEP OFFICE')

        disabledSucursal = !disabledSucursal;
        disabledOffice = !disabledOffice;

        lockStore.set(selectedSucursal);
        lockOffice.set(selectedOffice);

        keepOfficeIcon = !keepOfficeIcon;
        
        dispatch('keep', keepOfficeIcon);
    };

    const getSucursales = async () => {
        if (request) return;
        if (companyId == 0) {
            sucursales = [];
            return;
        }; 
        request = true;
        let response = await Api.call(`/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES --> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
        }
        else {
            sucursales = [];
        }
        request = false;
    };

    const getOfficesBySucursal = async (sucursalId) => {
        let response = await Api.call(`/officePorSucursal/${sucursalId}`, 'GET', {}, 'json', companyId);
        console.log('RESPONSE GET OFFICES --> ', response);
        if (response.success && response.statusCode === '200') {
            offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
            await tick();
            if ($lockOffice > 0) {
                selectedOffice = $lockOffice;
            }
        }else{
            offices = []
        }
    };

    const getOffice = async (selectedOffice)=>{
        let response = await Api.call(`/office/${selectedOffice}`,'GET', {}, 'json', companyId)
        console.log('RESPONSE GET OFFICE --> ', response);
        if (response.success && response.statusCode === '200') {
            console.log("200")
            return response.data.result
        }
        return;
    }

    const setSaved = () => {
        selectedOffice = $lockOffice
        selectedSucursal = $lockStore
        article_id = $lockArticle
    }

    onMount(async () => {
        if (cleanStore) {
            lockStore.set(0);
            lockOffice.set(0);
        }   
        
        await getSucursales();
        
        if ($lockOffice > 0 && $lockStore > 0) {
            // await getOfficesBySucursal($lockStore)
            // // await getOffice($lockOffice)
            // await tick();
            
            // selectedSucursal = $lockStore;
            // selectedOffice = $lockOffice;
        }
        
        if(isEdit){
            disabledOffice = false;
            disabledSucursal = false;
            let office = await getOffice(selectedOffice)
            if(office){
                selectedSucursal = office.sucursal_id
                await getOfficesBySucursal(office.sucursal_id)
                selectedOffice = office.id
            }
        }
        
    });

    onDestroy(() => {
        if (!keepOfficeIcon) {
            // lockStore.set(0);
            // lockOffice.set(0);
        }
    })

    $: if (selectedSucursal) {
        getOfficesBySucursal(selectedSucursal);
    }

    $: if (companyId) getSucursales();

</script>

{#if show.includes('sucursal')}
    {#key sucursales}
    <Select
        label="Sucursal"
        options={sucursales}
        customHeight={custom}
        disabled={disabledSucursal}
        selected={selectedSucursal}
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
        label="Oficina"
        options={offices}
        customHeight={custom}
        selected={selectedOffice}
        disabled={disabledOffice}
        on:change={(event) => {
            selectedOffice = event.detail
            disabledKeep = false
            // console.log('CHANGE OFFICE -> ', event.detail)
            let office = offices.find(office => office.value == event.detail)
            dispatch('changeOffice', { selectedOffice, office })    
        }}
    />
    {/key}
{/if}

{#if keep}
    <div style="margin-left: auto; grid-column: 1 / -1;">
        <Button 
            disabled={disabledKeep}
            custom
            label={ keepOfficeIcon ? "Cambiar oficina" : "Mantener oficina"}
            trailing={ keepOfficeIcon ? 'lock' : 'lock_open'}
            on:click={ keepOffice }
        />
    </div>  
{/if}	
