<script>
    import { onMount } from 'svelte';
    import { MDCTextField } from '@material/textfield';
    import '@material/web/textfield/outlined-text-field.js';

    export let version = 2
    export let placeholder = '', required = false, type = 'text', value, label = "", id = ''

    let textfield

    onMount(() => {
        if (version == 2) {   
            new MDCTextField(textfield) 
            textfield.addEventListener('input', function() {
                // Acceder al valor del input
                // console.log(textfield)
                var valorInput = textfield.querySelector('input') //textfield.value;

                // Hacer algo con el valor, como imprimirlo en la consola
                // console.log('Texto ingresado:', valorInput.value);
                value = valorInput.value
            });
        }
    })


</script>

{#if version == 2}
<label bind:this={textfield} class="mdc-text-field mdc-text-field--outlined textfield-custom">
    <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
            <span class="mdc-floating-label" id="my-label-id">{label}</span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
    </span>
    <input 
        {id}
        {type} 
        {value}
        {required}
        {placeholder}
        class="mdc-text-field__input" 
        aria-labelledby="my-label-id" 
        >
</label>
{:else}

    <md-outlined-text-field 
        {label} 
        {value}
        {required}
        {type} 
    >
        <!-- <md-icon-button toggle slot="trailing-icon">
            <md-icon class="material-symbols-outlined">visibility</md-icon>
            <md-icon class="material-symbols-outlined" slot="selected">visibility_off</md-icon>
        </md-icon-button> -->
    </md-outlined-text-field>
{/if}
