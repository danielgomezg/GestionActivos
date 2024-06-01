<script>
    import { TextField, Divider } from "$lib";
    
    export let active = {};
    export let values = {};

    let inputVidaUtil;
    let inputValorReal;
    let inputValorAdquisicion;

    const updateValue = (id, amount, value) => {
        amount = amount.toString().replace(/\./g, '').replace('$', '');

        console.log('updateValue')
        console.log('id', id)
        console.log('amount', amount)
        console.log('value', value)
    }

    const createValue = (id, amount, value = '') => {
        amount = amount.toString().replace(/\./g, '').replace('$', '');

        console.log('createValue')
        console.log('id', id)
        console.log('amount', amount)
        console.log('value', value)

        if (value == 'valor_real') {
            inputValorReal.setFeefback('success')
        }

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
    $: values.useful_life = values.useful_life.toString().replace(/[^0-9]/g, '');
    

</script>
<div class="row-active__value">
    <div>{ active.bar_code || active.virtual_code }</div>

    <TextField 
        label="Valor real" 
        bind:this={inputValorReal}
        bind:value={ values.real_value }  
        on:blur={() => {
            if (values.id == 0) createValue(values.id, values.real_value, 'real_value') 
            else updateValue(values.id, values.real_value, 'real_value')
        }}

    />

    <TextField 
        label="Valor adquisición" 
        bind:this={inputValorAdquisicion}
        bind:value={ values.adq_value } 
        on:blur={() => {
            if (values.id == 0) createValue(values.id, values.adq_value, 'adq_value') 
            else updateValue(values.id, values.adq_value, 'adq_value')
        }}
    />
    
    <TextField 
        label="Vida útil" 
        bind:this={inputVidaUtil}
        bind:value={ values.useful_life } 
        on:blur={() => {
            if (values.id == 0) createValue(values.id, values.useful_life, 'useful_life') 
            else updateValue(values.id, values.useful_life, 'useful_life')
        }}
    />

</div>
<Divider margin={10} />

<style>
    .row-active__value {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
        align-items: center;
    }
</style>