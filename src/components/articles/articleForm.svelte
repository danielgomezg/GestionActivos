<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { TextField, Button, FileInput } from "$lib";

    export let article = {}, companyId = 0, isEdit = false;

    function validForm() {
        if (article.name == ''){
            message = "Falta agregar el nombre del articulo."
            return false;
        } 
        
        
        return true
    }

    const saveArticle = async () => {
        if (!validForm()) return;

        article.company_id = companyId;
        article.photo = '';
        let body = JSON.stringify(article);
        console.log(body)
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
        accept={ ['png', 'jpg'] }
        trailing="image"
        helperText="Imagen con formato png o jpg"
    />

    <br>
    <Button 
        label="Guardar"
        custom
        on:click={ saveArticle }
    />

</div>