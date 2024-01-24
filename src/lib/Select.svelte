<script>
    import { onMount, createEventDispatcher, onDestroy  } from 'svelte';
    import { MDCSelect } from '@material/select';

    export let label = ''
    export let options = []
    export let selected = ''
    export let disabled = false
    export let customHeight = false

    let dispatch = createEventDispatcher()

    let selectComponent;
    let menuComponent;
    let select

    const updateValue = (selected) => {
        if (options.length  == 0) return;
        if (!select) return;
        if(selected == null) return;
        
        select.value = selected.toString();
        dispatch("change", select.value)

        // selectedIndex = select.selectedIndex = options.findIndex(option => option.value == selectedValue);
    }

    const setDispatch = () => {
            
        dispatch("change", select.value)
    }

    onMount(() => {
        
        select = new MDCSelect(selectComponent);
        if (selected != '') updateValue(selected)
       
        select.listen('MDCSelect:change', setDispatch);

    })

    $: updateValue(selected)

    onDestroy(() => {
        
        if (select != undefined) {
            select.unlisten("MDCSelect:change", setDispatch)
        }
    })

</script>
<div bind:this={selectComponent} class="mdc-select mdc-select--outlined mdc-select-custom"
    class:mdc-select--disabled={disabled}
    >
    <div class="mdc-select__anchor mdc-select-custom" aria-labelledby="outlined-select-label" class:custom-height={customHeight}>
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__notch">
                <span id="outlined-select-label" class="mdc-floating-label">{label}</span>
            </span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        <span class="mdc-select__selected-text-container">
            <span id="demo-selected-text" class="mdc-select__selected-text"></span>
        </span>
        <span class="mdc-select__dropdown-icon">
            <svg
                class="mdc-select__dropdown-icon-graphic"
                viewBox="7 10 10 5" focusable="false">
                <polygon
                    class="mdc-select__dropdown-icon-inactive"
                    stroke="none"
                    fill-rule="evenodd"
                    points="7 10 12 15 17 10">
                </polygon>
                <polygon
                    class="mdc-select__dropdown-icon-active"
                    stroke="none"
                    fill-rule="evenodd"
                    points="7 15 12 10 17 15">
                </polygon>
            </svg>
        </span>
    </div>

    <!-- Other elements from the select remain. -->
    <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul class="mdc-list " role="listbox" aria-label="">
            {#each options as option }
                <li 
                    class="mdc-list-item" 
                    aria-selected={option.selected} 
                    data-value={option.value} 
                    role="option"
                >
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">
                        {option.label}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .mdc-list-item {
        padding: 6px 16px;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .mdc-list {
        text-transform: capitalize;
    }
    
    .custom-height {
        height: 40px;
    }
</style>
