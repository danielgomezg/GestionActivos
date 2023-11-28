<script>
    import { onMount, createEventDispatcher  } from 'svelte';
    import { MDCMenu } from '@material/menu';
    import { MDCSelect } from '@material/select';

    export let label = '', options = [], value = ''

    let dispatch = createEventDispatcher()

    let selectComponent;
    let menuComponent;

    onMount(() => {
        const select = new MDCSelect(selectComponent);
        select.listen('MDCSelect:change', () => {
            // alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
            
            dispatch("change", {
                value: select.value,
                index: select.selectedIndex
            })
        });
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
        <ul class="mdc-list">
          
            {#each options as option}
                <li class="mdc-list-item" aria-selected="false" data-value="grains" role="option">
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">
                        { option.name }
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
        /* max-height: 250px; */
    }
</style>
