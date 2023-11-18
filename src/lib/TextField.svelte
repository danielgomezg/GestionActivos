<script>
    import { onMount } from 'svelte';
    import { MDCTextField } from '@material/textfield';
    import '@material/web/textfield/outlined-text-field.js';

    export let version = 2
    export let placeholder = '', required = false, type = 'text', value, label = ""

    let textfield

    onMount(() => {
        if (version == 2) {   
            new MDCTextField(textfield) 
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
        <md-icon-button toggle slot="trailing-icon">
            <md-icon class="material-symbols-outlined">visibility</md-icon>
            <md-icon class="material-symbols-outlined" slot="selected">visibility_off</md-icon>
        </md-icon-button>
    </md-outlined-text-field>
{/if}
