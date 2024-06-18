<script>
    import { Dialog, IconButton } from "$lib";
    import Api from "../../../helpers/ApiCall";

    export { getImage };

    let dialog;
    let blob = '';
    let imagefocus = 0;
    let blobImages = [];

    const getImage = async (images) => {
        
        await Promise.all(images.map(async (url) => {
            let response = await Api.callImage('/image_article/' + url);
            if (response != null) {
                blobImages.push(response);
            }
        }))

        blob = blobImages[0];
        dialog.open();
    }


</script>

<Dialog bind:this={ dialog }>
    <!-- <div slot="title">Imagenes</div> -->
    <div slot="content" class="image-container">
        <!-- {#if blobImages.length > 0} -->
            <IconButton icon="chevron_left" on:click={ () => {
                if (imagefocus > 0) blob = blobImages[--imagefocus]
            } } />
        <!-- {/if} -->

        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={blob} class="image" alt="image" />
       

        <!-- {#if blobImages.length > 0} -->
            <IconButton icon="chevron_right" on:click={ () => {
                if (imagefocus < blobImages.length - 1) blob = blobImages[++imagefocus]
            } } />
        <!-- {/if} -->

    </div>
</Dialog>

<style>
    .image-container {
        display: flex;
        /* flex-wrap: wrap; */
        gap: 10px;
        height: 500px;
        width: auto;
        align-items: center;
    }

    .image {
        width: auto;
        height: 100%;
        object-fit: cover;
    }

</style>