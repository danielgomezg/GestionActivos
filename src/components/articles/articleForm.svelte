<script>
    import Api from "../../../helpers/ApiCall";
    import { TextField, Button, Select, TextArea } from "$lib";

    export let article = {}, isEdit = false;
    let inputImage;
    let images = []

</script>

<div class="form">

    <TextField 
        version=2
        id="name-article"
        required 
        type="text"
        label="Nombre" 
        bind:value={ article.name }
    />

    <TextField 
        version=2
        id="descripcion-article"
        required 
        type="text"
        label="Descripción" 
        bind:value={ article.description }
    />

    <input bind:this={inputImage} type="file" id="seleccionarImagen" style="display:none">

    <Button 
        label="agregar imagen"
        on:click={ () => inputImage.click() }
    />

    <!-- <TextArea
        label="Descripción"
    /> -->

</div>