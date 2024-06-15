<script>
    import { TextField, Divider } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { companySelect } from "../../stores/store";
    
    export let active = {};
    export let values = {};
    export let hideCode = false;

    let copyValues = { ...values }
    let inputVidaUtil;
    let inputValorReal;
    let inputValorAdquisicion;

    const updateValue = async (id, amount, value) => {
        // amount = amount.toString().replace(/\./g, '').replace('$', '');

        console.log('new values => ', values);
        console.log('old values => ', copyValues);

        let body = {
            adq_value: values.adq_value.toString().replace(/\./g, '').replace('$', ''),
            real_value: values.real_value.toString().replace(/\./g, '').replace('$', ''),
            useful_life: values.useful_life || 0
        };

        body = JSON.stringify(body);

        console.log('updateValue => ', body);
        let response = await Api.call(`/active/values/${id}`, 'PUT', { body }, 'json', $companySelect);
        console.log('RESPONSE PUT ACTIVOS VALUES --> ', response)
        if (response.success && response.statusCode == "201") {
            if (value == 'real_value') inputValorReal.setFeefback('success')
            else if (value == 'adq_value') inputValorAdquisicion.setFeefback('success')
            else if (value == 'useful_life') inputVidaUtil.setFeefback('success')
        } 
        else {
            if (value == 'real_value') {
                values.real_value = copyValues.real_value
                inputValorReal.setFeefback('error')
            } 
            else if (value == 'adq_value') {
                values.adq_value = copyValues.adq_value
                inputValorAdquisicion.setFeefback('error')
            } 
            else if (value == 'useful_life') {
                values.useful_life = copyValues.useful_life
                inputVidaUtil.setFeefback('error')
            } 
        }
        
    }

    const createValue = async (amount, value = '') => {
        amount = amount.toString().replace(/\./g, '').replace('$', '');

        console.log('new values => ', values);
        console.log('old values => ', copyValues);

        console.log(active)
        let body = {
            adq_value: 0,
            real_value: 0,
            useful_life: 0,
            active_id: 0
        };
        body[value] = amount;
        body.active_id = active.id;
        body = JSON.stringify(body);

        console.log('createValue => ', body);
        let response = await Api.call(`/active/values`, 'POST', { body }, 'json', $companySelect);
        console.log('RESPONSE POST ACTIVOS VALUES --> ', response)
        if (response.success && response.statusCode == "201") {
            values.id = response.data.result.id
            copyValues = { ...values }
            if (value == 'real_value') inputValorReal.setFeefback('success')
            else if (value == 'adq_value') inputValorAdquisicion.setFeefback('success')
            else if (value == 'useful_life') inputVidaUtil.setFeefback('success')
        } 
        else {
            if (value == 'real_value') {
                values.real_value = copyValues.real_value
                inputValorReal.setFeefback('error')
            } 
            else if (value == 'adq_value') {
                values.adq_value = copyValues.adq_value
                inputValorAdquisicion.setFeefback('error')
            } 
            else if (value == 'useful_life') {
                values.useful_life = copyValues.useful_life
                inputVidaUtil.setFeefback('error')
            } 
        }

    }

    const formatLifetime = (lifetime) => {
        // Quitar caracteres no numericos
        lifetime = lifetime.toString().replace(/[^0-9]/g, '');

        // Quitar 0 a la izquierda
        lifetime = lifetime.replace(/^0+/, '');

        return lifetime
    }

    const formatNumber = (number) => {
        // Quitar caracteres no numericos
        number = number.toString().replace(/[^0-9]/g, '');


        // Quitar puntos y signo de pesos
        number = number.toString().replace(/\./g, '').replace('$', '');
        
        const fomatter = Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        });
        
        return fomatter.format(number)
    }

    $: values.real_value = formatNumber(values.real_value)
    $: values.adq_value = formatNumber(values.adq_value)
    $: values.useful_life = formatLifetime(values.useful_life)
    

</script>
<div class="row-active__value" class:hide-code={hideCode}>
    {#if !hideCode}
        <div>{ active.bar_code || active.virtual_code }</div>
    {/if}	

    <TextField 
        label="Valor real" 
        bind:this={inputValorReal}
        bind:value={ values.real_value }  
        on:blur={() => {
            if (values.id == 0) createValue(values.real_value, 'real_value') 
            else updateValue(values.id, values.real_value, 'real_value')
        }}

    />

    <TextField 
        label="Valor adquisición" 
        bind:this={inputValorAdquisicion}
        bind:value={ values.adq_value } 
        on:blur={() => {
            if (values.id == 0) createValue(values.adq_value, 'adq_value') 
            else updateValue(values.id, values.adq_value, 'adq_value')
        }}
    />
    
    <TextField 
        label="Vida útil" 
        bind:this={inputVidaUtil}
        bind:value={ values.useful_life } 
        on:blur={() => {
            if (values.id == 0) createValue(values.useful_life, 'useful_life') 
            else updateValue(values.id, values.useful_life, 'useful_life')
        }}
    />

</div>