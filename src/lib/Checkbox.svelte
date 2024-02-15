<script>
    import { onMount } from 'svelte';
    import { MDCCheckbox } from '@material/checkbox';

    export let id = 0
    export let checked = false;

    let checkboxComponent

    onMount(() => {
        const checkbox = new MDCCheckbox(checkboxComponent);
    });

</script>

<div class="mdc-touch-target-wrapper">
    <div bind:this={ checkboxComponent } class="mdc-checkbox mdc-checkbox--touch">
      <input 
        type="checkbox"
        {checked}
        class="mdc-checkbox__native-control"
        {id}
        aria-labelledby={id}
      />
      <div class="mdc-checkbox__background">
        <svg class="mdc-checkbox__checkmark"
             viewBox="0 0 24 24">
          <path class="mdc-checkbox__checkmark-path"
                fill="none"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
        </svg>
        <div class="mdc-checkbox__mixedmark"></div>
      </div>
      <div class="mdc-checkbox__ripple"></div>
    </div>
</div>