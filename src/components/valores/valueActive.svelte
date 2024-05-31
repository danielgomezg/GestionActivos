<script>
    import { TextField, Divider } from "$lib";

    export let activeValue = {};

</script>
<div class="row-active__value">
    <div>{ activeValue.activo.barcode || activeValue.activo.codigo_virtual }</div>

    <TextField label="Valor real" value={ activeValue.valor_real }  />
    <TextField label="Valor adquisición" value={ activeValue.valor_adquisicion } />
    <TextField label="Vida útil" value={ activeValue.vida_util } />

</div>
<Divider margin={10} />

<style>
    .row-active__value {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 20px;
        align-items: center;
    }
</style>