<script>
    import { onMount } from 'svelte';
    import { MDCCheckbox } from '@material/checkbox';
    import {MDCFormField} from '@material/form-field';

    let checkboxComponent
    let formFieldComponent

    onMount(() => {
        const checkbox = new MDCCheckbox(checkboxComponent);
        // const formField = new MDCFormField(formFieldComponent);
    });

</script>
<!-- <div bind:this={ formFieldComponent } class="mdc-form-field">
    <div bind:this={ checkboxComponent } class="mdc-checkbox">
      <input type="checkbox"
             class="mdc-checkbox__native-control"
             id="checkbox-1"/>
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
    <label for="checkbox-1">Checkbox 1</label>
</div> -->

<div class="mdc-touch-target-wrapper">
    <div bind:this={ checkboxComponent } class="mdc-checkbox mdc-checkbox--touch">
      <input type="checkbox"
             class="mdc-checkbox__native-control"
             id="checkbox-1"/>
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