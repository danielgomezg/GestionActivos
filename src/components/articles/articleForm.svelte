<script>
    import Api from "../../../helpers/ApiCall";
    import { TextField, Button, FileInput } from "$lib";

    export let article = {}, isEdit = false;

    const saveArticle = () => {

    }

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

    <FileInput 
        label="Imagen"
        accept={ ['png', 'jpg'] }
        trailing="image"
        helperText="Imagen con formato png o jpg"
    />

    <br>
    <Button 
        label="Guardar"
        on:click={ saveArticle }
    />

</div>