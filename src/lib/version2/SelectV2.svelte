<script>
    import { onMount, createEventDispatcher, onDestroy, tick } from 'svelte';
    import { MDCSelect } from '@material/select';

    export let label = '';
    export let options = [];
    export let selected = '';
    export let disabled = false;
    export let customHeight = false;
    export let required = false;

    let dispatch = createEventDispatcher();
    let select;
    let isValid;
    let menuComponent;
    let selectComponent;
    let wasMenuOpen = false;

    const setValid = (state) => {
        isValid = state;
        select.foundation.setValid(state);
    };

    const _updateValue = async (selected) => {
        await tick();
        if (!select || selected == null) return;
        select.setValue(selected.toString());
        if (select.value == '') {
            dispatch("empty");
        }
    };

    const setDispatch = () => {
        setValid(true);
        dispatch("change", select.value);
    };

    const layoutSelect = async () => {
        await tick();
        if (!select) {
            console.error('Select is not defined');
            return;
        }
        select.layout();
        select.layoutOptions();
        if (wasMenuOpen) {
            select.menuOpen = true; // Restaurar el estado del menú
        }
    };

    onMount(() => {
        select = new MDCSelect(selectComponent);
        select.listen('MDCSelect:change', setDispatch);
        select.required = required;

        // Observador para cambios en el componente
        const observer = new MutationObserver(() => {
            layoutSelect();
        });
        observer.observe(selectComponent, { attributes: true });

        // Manejo del evento de desplazamiento
        menuComponent.addEventListener('scroll', handleScroll);
    });

    $: _updateValue(selected);

    onDestroy(() => {
        if (select) {
            select.unlisten("MDCSelect:change", setDispatch);
        }
        menuComponent.removeEventListener('scroll', handleScroll);
    });

    // Manejo del evento de desplazamiento (scroll)
    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.target;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
            dispatch('scrollEnd');
        }
    };

    // Método para actualizar las opciones y mantener el select abierto
    const updateOptionsAndKeepMenuOpen = async (newOptions) => {
        // Guardar el estado actual del menú abierto
        wasMenuOpen = select.menuOpen || false;

        // Actualizar las opciones
        options = newOptions;

        // Layout select después de actualizar las opciones
        await tick();
        layoutSelect();
    };

</script>

<div bind:this={selectComponent} class="mdc-select mdc-select--outlined mdc-select-custom"
    class:mdc-select--disabled={disabled}
    class:mdc-select--no-label={label == ''}
    class:mdc-select--danger={isValid === false}
    >
    <div class="mdc-select__anchor mdc-select-custom" aria-labelledby="outlined-select-label" class:custom-height={customHeight}>
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__notch">
                {#if label != ''}
                    <span id="outlined-select-label" class="mdc-floating-label">{label}</span>
                {/if}
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
    <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth" bind:this={menuComponent}>
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
