<script>
    import IconButton from './IconButton.svelte';
    import { MDCTextField } from '@material/textfield';
    import { onMount, createEventDispatcher, tick } from 'svelte';
    import '@material/web/textfield/outlined-text-field.js';

    export let placeholder = ''
    export let required = false
    export let type = 'text'
    export let value = ''
    export let id = ''
    export let trailing = ''
    export let leading = 'search'

    let search;
    let textfield;
    let isFocused = false;
    let dispatch = createEventDispatcher()

    async function handleFocus() {
        isFocused = true;

        await tick();

        search = new MDCTextField(textfield) 
        textfield.addEventListener('input', function() {
            var valorInput = textfield.querySelector('input')
            value = valorInput.value
        });
        search.focus();
        
    }

    function handleBlur() {
        if (value.trim() === '') {
            isFocused = false;
        }
    }

    const clickTrailing = () => {
        console.log('click')
        dispatch('click', value)
    }

    const removeText = () => {
        value = ''
        console.log('remove text')
        dispatch('removeSearch')
    }

    onMount(() => {
        // new MDCTextField(textfield) 
        // textfield.addEventListener('input', function() {
        //     var valorInput = textfield.querySelector('input')
        //     value = valorInput.value
        // });
        
    })

    $: if (value != '') {
        trailing = 'close'
    } else {
        trailing = ''
    }

</script>
{#if isFocused}
<label 
    bind:this={textfield} 
    class="mdc-text-field mdc-text-field--outlined mdc-text-field--search mdc-text-field--no-label"    
    >

    
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__notch">
                <!-- <span class="mdc-floating-label" id="my-label-id">{label}</span> -->
            </span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>

        {#if leading.trim()}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <i
                class="material-symbols-rounded mdc-text-field__icon mdc-text-field__icon--leading"
                tabindex="0"
                role="button"
                on:click={ clickTrailing }
            >
                {leading}
            </i>
        {/if}

        <input 
            {id}
            {type} 
            {value}
            {required}
            {placeholder}
            on:blur={handleBlur}
            class="mdc-text-field__input" 
            aria-labelledby="my-label-id" 
        >
    
        {#if trailing != ''}
            <!-- <span style="margin: auto; padding: 10px" > -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <i class="material-symbols-rounded mdc-text-field__icon mdc-text-field__icon--trailing" tabindex="0"
                role="button" on:click={ removeText } >{trailing}</i>
            <!-- </span> -->
        {/if}
</label>
{/if}
{#if !isFocused}
    <IconButton icon="search" on:click={ handleFocus } />
{/if}

<style>
    .mdc-text-field__icon--leading {
        margin-left: auto;
    }

    .mdc-text-field__icon--trailing {
        cursor: pointer;
    }

</style>