<script>    
    import { createEventDispatcher } from 'svelte';

    export let accept = [];
    export let placeholder = ''
    export let required = false
    export let type = 'file'
    export let label = ""
    export let id = ''
    export let trailing = ''
    export let helperText = ''
    export { cleanValue }

    let value = '';
    let textfield;
    let invalid = false;
    let dispatch = createEventDispatcher();

    function cleanValue() {
        value = '';
        label = '';
    }
    
    function handleChange(event) {
        
        let file = event.target.files[0];
        console.log(file)
        let type = file.type.split('/')[1]
        if (!accept.includes(type)) {
            label = ''
            invalid = true;
            return;
        }

        invalid = false;
        label = file.name
        dispatch('change', file);
    }

</script>
<div>
    <label 
        bind:this={textfield} 
        class="mdc-text-field mdc-text-field--outlined mdc-text-field--custom "
        class:mdc-text-field--with-trailing-icon={trailing != ''}
        class:mdc-text-field--invalid={invalid}
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
            {type} 
            {required}
            {value}
            {placeholder}
            class="mdc-text-field__input" 
            aria-labelledby="my-label-id"
            aria-controls="my-helper-id"
            aria-describedby="my-helper-id" 
            on:change={ handleChange }
            >
            {#if trailing != ''}
                <span style="margin: auto; padding: 10px">
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <i class="material-symbols-rounded" on:click>{trailing}</i>
                </span>
            {/if}
            
    </label>    
    <div class="mdc-text-field-helper-line">
        <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent" id="my-helper-id" >{helperText}</div>
    </div>
</div>
<style>
    input{
        /* display: none; */
        visibility: hidden;
    }
</style>