<script>
    import { Select } from "$lib";
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";

    export let companyId = 0;
    export let selectedOffice = '';
    export let selectedSucursal = '';  // Inicializar con algún valor predeterminado

    let sucursales = [];
    let offices = [];

    const getSucursales = async () => {
        let response = await Api.call(`http://127.0.0.1:9000/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES --> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
        }
    };

    const getOffices = async (sucursalId) => {
        let response = await Api.call(`http://127.0.0.1:9000/officePorSucursal/${sucursalId}`, 'GET');
        console.log('RESPONSE GET OFFICES --> ', response);
        if (response.success && response.statusCode === '200') {
            offices = response.data.result.map(r => ({ label: `${r.floor} - ${r.description}`, value: r.id }));
            console.log("aca")
        }else{
            offices = []
        }
    };

    onMount(() => {
        getSucursales();
    });

    $: if (selectedSucursal) {
        getOffices(selectedSucursal);
    }
</script>

{#key sucursales}
    <Select
        label="Sucursal"
        selected={selectedSucursal}
        options={sucursales}
        on:change={(event) => {
            selectedSucursal = event.detail;
            selectedOffice = ''; // Resetear el valor de la oficina al cambiar la sucursal
            //getOffices(selectedSucursal);
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
