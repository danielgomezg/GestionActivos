<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { TextField, Button, FileInput } from "$lib";
    import { onMount, getContext } from "svelte";

    export let article = {}, companyId = 0, isEdit = false;

    let replaceArticle = getContext('replaceArticle');
    let addArticle = getContext('addArticle');

    function validForm() {
        if (article.name == ''){
            message = "Falta agregar el nombre del articulo."
            return false;
        } 
        
        
        return true
    }

    const saveArticle = async () => {
        
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }

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
            
            addArticle(response.data.result)
        }
        else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al agregar el articulo."
                return snk
            })
        }

    }

    const editArticle = async () => {
        console.log('edit article')

        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        // Peticion
        let body = JSON.stringify(article)  
        let response = (await Api.call(`http://127.0.0.1:9000/article/${article.id}`, 'PUT', { body }))
        console.log('RESPONSE EDIT ARTICLE--> ', response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Articulo editado con éxito."
                return snk
            })

            replaceArticle(response.data.result)

        }
        else {
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al editar articulo."
                return snk
            })
        }
    }

    let accionBtn;

    onMount(async ()=> {
        if(isEdit){
            accionBtn = editArticle
        }else{
            accionBtn = saveArticle
        }
    })
 
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
        on:click={ accionBtn }
    />

</div>