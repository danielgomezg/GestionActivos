<script>
    import Api from "../../../helpers/ApiCall";
    import { onMount, getContext } from "svelte";
    import { snackbar } from "../../stores/store";
    import { TextField, Button, FileInput } from "$lib";

    export let article = {};
    export let companyId = 0;
    export let imageUrl = '';
    export let isEdit = false;
    
    let accionBtn;
    let image = null;

    let addArticle = getContext('addArticle');
    let replaceArticle = getContext('replaceArticle');

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
        let response = await Api.call('/image_article', 'POST', { body: formData }, 'file');
        console.log(response)
        if (response.success && response.statusCode == "201") {
            return response.data.result;
        }
        else {
            return null;
        }
    }

    const saveArticle = async () => {
        
        let isValid = validForm();
        if (!isValid) {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        let imageUrl = await uploadImage(image)
        
        article.company_id = companyId;
        article.photo = imageUrl == null ? '' : imageUrl;
        let body = JSON.stringify(article);
        
        let response = (await Api.call('/article', 'POST', { body }))
        console.log(response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Articulo agregado con éxito."
                return snk
            })
            
            addArticle(response.data.result)
        }
        else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
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
                snk.type = 'dismiss'
                snk.message = message
                return snk
            })
            return console.log(message)
        }

        let imageUrl = await uploadImage(image)
        article.photo = imageUrl == null ? article.photo : imageUrl;

        // Peticion
        let body = JSON.stringify(article)  
        console.log('BODY EDIT ARTICLE--> ', body)
        let response = (await Api.call(`/article/${article.id}`, 'PUT', { body }))
        console.log('RESPONSE EDIT ARTICLE--> ', response)
        if (response.success && response.statusCode == "201") {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Articulo editado con éxito."
                return snk
            })

            replaceArticle(response.data.result)

        }
        else {
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al editar articulo."
                return snk
            })
        }
    }

    

    onMount(async ()=> {
        if (isEdit) {
            accionBtn = editArticle
        } else {
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
        trailing="image"
        accept={ ['png', 'jpg', 'jpeg'] }
        helperText="Imagen con formato png, jpg o jpeg"
        on:change={ (e) => {
            image = e.detail
            imageUrl = URL.createObjectURL(image)
        }}
    />

    <div class="content-image">
        {#if article.photo == ''}
            <img src="https://via.placeholder.com/150" class="article-image" alt={article.name} />
        {:else}
            <img src={ imageUrl } class="article-image" alt={article.name} />
        {/if}
    </div>

    <Button 
        label="Guardar"
        custom
        on:click={ accionBtn }
    />

</div>

<style>
    .article-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        /* display: block; */
        /* border-radius: 3px; */
    }

    .content-image {
        width: 100px;
        height: 100px;
        overflow: hidden;
        /* border: 1px solid #ccc; */
    }
</style>