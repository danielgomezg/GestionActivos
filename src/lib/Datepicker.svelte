<script>
    import { MDCTextField } from '@material/textfield';
    import { createEventDispatcher, onMount } from 'svelte';

    export let placeholder = ''
    export let required = false
    export let value
    export let label = ""
    export let id = ''
    export let disabled = false

    let dispatch = createEventDispatcher();

    let textfield

    function showDatePicker() {
        document.querySelector("#datepicker").showPicker();
        // inputDate.showPicker();
    }
    
    // Funcion que borre lo que se ingresa al input
    function clearInput() {
        var valorInput = textfield.querySelector('input')
        valorInput.value = ''
    }

    // Funcion que quita el focus del input
    function blurInput() {
        if (textfield == undefined) return
        var valorInput = textfield.querySelector('input')
        valorInput.blur()
    }

    const formatDate = (date) => {
        // si date tiene el formato yyyy-mm-dd
        if (date.length == 10 && date.includes('-')) {
            return date.slice(8) + '/' + date.slice(5, 7) + '/' + date.slice(0, 4)
        }
        
        if (date.length > 10) return date.slice(0, -1)
        
        // Quitar a todos los caracteres que no sean numeros
        let fecha = date.replace(/\D/g, '')
        
        if (fecha.length > 2) {
            
            fecha = fecha.slice(0, 2) + '/' + fecha.slice(2)
        }

        if (fecha.length > 5) {
            fecha = fecha.slice(0, 5) + '/' + fecha.slice(5)
        }

        return fecha
    }

    onMount(() => { 
        new MDCTextField(textfield) 
        textfield.addEventListener('input', function() {
            var valorInput = textfield.querySelector('input') 
            value = valorInput.value
        });
       
    })

    // $: blurInput(value)
    $: value = formatDate(value)


</script>

<label 
    bind:this={textfield} 
    class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom mdc-text-field--with-trailing-ico"
    class:mdc-text-field--disabled={disabled}
    >
    <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
            <span class="mdc-floating-label" id="my-label-id">{label}</span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
    </span>
    <input 
        {id}
        type="text"
        {value}
        {required}
        {placeholder}
        {disabled}
        class="mdc-text-field__input" 
        aria-labelledby="my-label-id" 
        on:focus
        >
        <span style="margin: auto; padding: 10px">
            <i class="material-symbols-rounded">calendar_month</i>
        </span>
</label>

<!-- <div style="position: relative">
    <input id="datepicker" bind:value={value} type="date" class="custom-date" >
    <label 
        bind:this={textfield} 
        class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom mdc-text-field--with-trailing-icon"
        class:mdc-text-field--disabled={disabled}
        class:mdc-text-field--label-floating={value != ''}
        >
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__notch">
                <span class="mdc-floating-label" id="my-label-id">{label}</span>
            </span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input 
            {id}
            {value}
            {required}
            {placeholder}
            {disabled}
            type="text"	
            class="mdc-text-field__input" 
            aria-labelledby="my-label-id" 
            on:focus={ showDatePicker }
            on:change={ clearInput }
            on:blur={ () => console.log('blur') }
            on:click={ showDatePicker }
            >
            <span style="margin: auto; padding: 10px">
                <i class="material-symbols-rounded" on:click={ showDatePicker } >calendar_month</i>
            </span>
        
    </label>
</div> -->

<style>
    .custom-date {
        position: absolute;
        bottom: 0;
        z-index: 0;
        opacity: 0;
    }
</style>