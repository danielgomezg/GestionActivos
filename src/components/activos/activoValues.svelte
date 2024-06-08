<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { companySelect } from "../../stores/store";
    import ValueActive from "../valores/valueActive.svelte";

    export let activo = {};

    let values = { 
        id: 0, 
        useful_life: 0, 
        real_value: 0, 
        adq_value: 0 
    };

    const getActivoValues = async (id) => {

        let response = await Api.call(`/active/values/${id}`, 'GET', {}, 'json', $companySelect);
        console.log('RESPONSE GET ACTIVOS VALUES --> ', response)
        if (response.success && response.statusCode == "200") {
            values = { ...response.data.result }
        } 

    }

    onMount(() => {
        console.log('activoValues', activo);
        getActivoValues(activo.id);
    });

</script>

<ValueActive active={activo} {values} hideCode />
