<script>
    import { onMount } from 'svelte';
    import { MDCTextField } from '@material/textfield';

    export let placeholder = ''
    export let required = false
    export let value
    export let label = ""
    export let id = ''
    export let disabled = false

    let textfield

    function showDatePicker() {
        document.querySelector("input[type=date]").showPicker();
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

    onMount(() => { 
        new MDCTextField(textfield) 
        textfield.addEventListener('input', function() {
            var valorInput = textfield.querySelector('input') 
            value = valorInput.value
        });
       
    })

    // $: blurInput(value)


</script>

<div style="position: relative">
    <input bind:value={value} type="date" class="custom-date" >
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
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <i class="material-symbols-rounded" on:click={ showDatePicker } >calendar_month</i>
            </span>
        
    </label>
</div>

<style>
    .custom-date {
        position: absolute;
        bottom: 0;
        z-index: 0;
        opacity: 0;
    }
</style>