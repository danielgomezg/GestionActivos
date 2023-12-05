<script>
    import { onMount, createEventDispatcher, onDestroy  } from 'svelte';
    import { MDCSelect } from '@material/select';

    export let label = '', options = [], selected = -1

    let dispatch = createEventDispatcher()

    let selectComponent;
    let menuComponent;
    let select

    const updateValue = (selected) => {
        if (options.length  == 0) return;
        if (!select) return;

        select.value = selected.toString();
        // selectedIndex = select.selectedIndex = options.findIndex(option => option.value == selectedValue);
    }

    const setDispatch = () => {
        console.log('set dispach')
        console.log(select)
        
            
        dispatch("change", select.value)
    }

    onMount(() => {
        console.log('mount select')
        select = new MDCSelect(selectComponent);
        console.log(select)
        // select.value = ''
        // select.menuItemValues = options
        select.listen('MDCSelect:change', setDispatch);


    })

    onDestroy(() => {
        if (select != undefined) {
            select.unlisten("MDCSelect:change", setDispatch)
        }
    })

</script>
<div bind:this={selectComponent} class="mdc-select mdc-select--outlined">
    <div class="mdc-select__anchor" aria-labelledby="outlined-select-label">
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
            
            <!-- svelte-ignore a11y-role-supports-aria-props -->
            <!-- {#each options as option, index}
                <li 
                    class="mdc-list-item"  
                    data-value={option.value.toString()} 
                    class:mdc-list-item--selected={ option.value == selected }
                    aria-selected={ option.value == selected }
                    role="option"
                >
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">{ option.name }</span>
                </li>
            {/each} -->
            <!-- <li class="mdc-list-item mdc-list-item--selected" aria-selected="true" data-value="" role="option">
                <span class="mdc-list-item__ripple"></span>
            </li> -->
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
            <!-- <li class="mdc-list-item" aria-selected="false" data-value="grains" role="option">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">
                    Bread, Cereal, Rice, and Pasta
                </span>
            </li>
            <li class="mdc-list-item " aria-selected="false" data-value="vegetables" role="option">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">
                    Vegetables
                </span>
            </li>
            <li class="mdc-list-item" aria-selected="false" data-value="fruit" role="option">
                <span class="mdc-list-item__ripple"></span>
                <span class="mdc-list-item__text">
                    Fruit
                </span>
            </li> -->

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
        /* max-height: 250px; */
    }
</style>
