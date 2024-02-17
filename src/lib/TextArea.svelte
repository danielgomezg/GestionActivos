<script>
    import { MDCTextField } from '@material/textfield';
    import { onMount } from 'svelte';

    export let value = '';
    export let label = ''

    let textfield

    onMount(() => {
        new MDCTextField(textfield)
        textfield.addEventListener('input', function() {
            // var valorInput = textfield.querySelector('input')
            // value = valorInput.value
        });
    })

</script>
<label bind:this={textfield} class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--custom">
    <span class="mdc-notched-outline">
      <span class="mdc-notched-outline__leading"></span>
      <span class="mdc-notched-outline__notch">
        <span class="mdc-floating-label" id="my-label-id">{label}</span>
      </span>
      <span class="mdc-notched-outline__trailing"></span>
    </span>
    <span class="">
      <textarea 
        class="mdc-text-field__input" 
        {value}
        cols="40" 
        aria-label="Label"
    ></textarea>
    </span>
</label>

<style>
  .mdc-text-field--textarea {
    height: 100%;
  }
</style>