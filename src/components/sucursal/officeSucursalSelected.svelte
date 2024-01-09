<script>
    import { Select } from "$lib";
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";

    export let companyId = 0;
    export let selectedOffice = '';
    export let selectedSucursal = '';  
    export let isEdit = false;

    let sucursales = [];
    let offices = [];

    const getSucursales = async () => {
        let response = await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES --> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
        }
    };

    const getOfficesBySucursal = async (sucursalId) => {
        let response = await Api.call(`http://127.0.0.1:9000/officePorSucursal/${sucursalId}`, 'GET');
        console.log('RESPONSE GET OFFICES --> ', response);
        if (response.success && response.statusCode === '200') {
            offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
            console.log("aca")
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

    $:console.log(sucursales)
</script>

{#key sucursales}
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
{#key offices}
    <Select
        label="Oficina"
        selected={selectedOffice}
        options={offices}
        on:change={(event) => selectedOffice = event.detail}
    />
{/key}
