<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { TextField, Button, FileInput } from "$lib";

    export let article = {}, companyId = 0, isEdit = false;
    let image = null;

    function validForm() {
        if (article.name == ''){
            message = "Falta agregar el nombre del articulo."
            return false;
        } 
        
        
        return true
    }

    // FUNCION QUE SUBE LA IMAGEN AL SERVIDOR
    const uploadImage = async (image) => {
        if (image == null) return null;

        let formData = new FormData();
        formData.append('file', image);
        let response = await Api.call('http://127.0.0.1:9000/image_article', 'POST', { body: formData }, 'file');
        console.log(response)
        if (response.success && response.statusCode == "201") {
            return response.data.result;
        }
        else {
            return null;
        }
    }

    const saveArticle = async () => {
        if (!validForm()) return;

        let imageUrl = await uploadImage(image)
        
        article.company_id = companyId;
        article.photo = imageUrl == null ? '' : imageUrl;
        let body = JSON.stringify(article);
        
        let response = (await Api.call('http://127.0.0.1:9000/article', 'POST', { body }))
        console.log(response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Articulo agregado con éxito."
                return snk
            })
            
        }
        else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al agregar el articulo."
                return snk
            })
        }

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
        type="text"
        label="Descripción" 
        bind:value={ article.description }
    />
 
    <FileInput 
        label="Imagen"
        trailing="image"
        accept={ ['png', 'jpg'] }
        helperText="Imagen con formato png o jpg"
        on:change={ (e) => image = e.detail }
    />

    <br>
    <Button 
        label="Guardar"
        custom
        on:click={ saveArticle }
    />

</div>