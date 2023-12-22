<script>
    import { Select } from "$lib";
    import { createEventDispatcher, onMount } from "svelte";
    import { locationsPeru } from "../../../helpers/locations/peru.js";
    import { locationsChile } from "../../../helpers/locations/chile.js";

    export let country = "chile", selectedRegion = "", selectedComuna = ""

    let dispatch = createEventDispatcher()

    let comunas = []

</script>

{#if country == "chile"}

    <Select 
        label="Región"
        selected={ selectedRegion }
        options={ Object.keys(locationsChile).map(region => { return { label: region, value: region }})}
        on:change={ (event) => {
            dispatch("setRegion", event.detail);
            if (event.detail == "") return;
            comunas = locationsChile[event.detail].map(comuna => { return { label: comuna, value: comuna } })
        }}
    />

{:else}

    <Select 
        label="Provincia"
        selected={ selectedRegion }
        options={ Object.keys(locationsPeru).map(region => { return { label: region, value: region }})}
        on:change={ (event) => {
            dispatch("setRegion", event.detail);
            if (event.detail == "") return;
            comunas = locationsPeru[event.detail].map(distrito => { return { label: distrito, value: distrito } })
        }}
    />

{/if}



{#key comunas}

<Select 
    label="Comuna"
    selected={ selectedComuna }
    options={ comunas }
    on:change={ (event) =>  dispatch("setComuna", event.detail) }
/>

{/key}