<script>
    import SelectV2 from "../../../lib/version2/SelectV2.svelte";
    import Api from "../../../../helpers/ApiCall";
    import Button from "../../../lib/Button.svelte";
    import { lockOffice, lockStore } from "../../../stores/store";
    import { onMount, createEventDispatcher, tick } from "svelte";
    import ActivoCard from "../../activos/activoCard.svelte";

    export let companyId = 0;
    export let custom = false;
    export let isEdit = false;
    export let required = false;
    export let cleanStore = false;
    export let selectedOffice = 0;
    export let selectedSucursal = 0;  
    export let show = ['sucursal', 'office'];
    export { setValidOffice, setValidStore }

    let selectStore;
    let selectOffice;
    let offices = [];
    let sucursales = [];
    let sucursalesResult = [];
    let disabledKeep = true;
    let disabledOffice = false;
    let keepOfficeIcon = false;
    let disabledSucursal = false;


    let limit  = 20;
    
    let offsetSucursal = 0;
    let countSucursal = 0;
    let offsetOffice = 0;
    let countOffice = 0;

    let request = false;

    // Variables para detectar final del scroll
    let endScrollStore = false;
    let endScrollOffice = false;

    // Función general para manejar evento scroll
    function handleScroll() {
        console.log('Final del scroll alcanzado');
        // Aquí puedes manejar el evento scrollEnd
    }

     // Función general para manejar evento scroll
     function handleScrollEnd(selectComponent) {

        // Determinar el select específico
        if (selectComponent === "sucursal") {
            // Detección del final del scroll en selectStore (con un margen de 5 píxeles)
            console.log('Final del scroll de selectStore alcanzado');
            console.log("endScrollStore " + endScrollStore)
            endScrollStore = true; // Cambiar a true cuando se llegue al final del scroll
            console.log("endScrollStore " + endScrollStore)
        } else if (selectComponent === "oficina") {
            // Detección del final del scroll en selectOffice (con un margen de 5 píxeles)
            console.log('Final del scroll de selectOffice alcanzado');
            endScrollOffice = true; // Cambiar a true cuando se llegue al final del scroll
        }
    }


    let dispatch = createEventDispatcher();

    const setValidOffice = (status) => {
        selectOffice.setValid(status);
    }

    const setValidStore = (status) => {
        selectStore.setValid(status);
    }

    const getSucursales = async () => {

        console.log("offset Sucu " + offsetSucursal + " " + request)
        console.log("count Sucu " + countSucursal)
        if (request) return;

        console.log("offset S " + offsetSucursal)
        console.log("count S " + countSucursal)

        if (companyId == 0) {
            sucursales = [];
            return;
        }; 

        if(offsetSucursal > countSucursal) return;
        console.log("offset " + offsetSucursal)
        console.log("count " + countSucursal)
        
        request = true;
        let response = await Api.call(`/sucursalPorCompany/${companyId}?limit=${limit}&offset=${offsetSucursal}`, 'GET');
        console.log('RESPONSE GET SUCURSALES --> ', response);
        if (response.success && response.statusCode === '200') {
            countSucursal = response.data.count;
            if(countSucursal > 0){
                sucursalesResult = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
                sucursales = [...sucursales, ...sucursalesResult]
                //sucursales.push(...sucursalesResult)
                console.log(sucursalesResult)
                console.log(sucursales)
                console.log("endSucursal " + endScrollStore)
                endScrollStore = false
                console.log("endSucursal " + endScrollStore)
            }
            
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
            if ($lockOffice > 0 && !cleanStore) {
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

    onMount(async () => {
        
        await getSucursales();
        
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

    $: if (selectedSucursal) {
        getOfficesBySucursal(selectedSucursal);
    }

    $: if (companyId) {
        sucursales = [];
        getSucursales();
    }

    const updateOffset = (end, type) => {
        if (!end) return
        if(type == "sucursal") offsetSucursal += limit;
        else offsetOffice += limit;
    }

    $: updateOffset(endScrollStore, "sucursal")
    $: updateOffset(endScrollOffice, "office")
    $: if(offsetSucursal != 0) {
        getSucursales();
    }

</script>

{#if show.includes('sucursal')}
    {#key sucursales}
    <SelectV2
        bind:this={ selectStore }
        {required}
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
        on:scrollEnd={() => handleScrollEnd("sucursal")}
    />
    {/key}
{/if}

{#if show.includes('office')}
    {#key offices}
    <SelectV2
        bind:this={ selectOffice }
        {required}
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
        on:scrollEnd={() => handleScrollEnd("oficina")}
    />
    {/key}
{/if}
