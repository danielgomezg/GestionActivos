<script>
    import { Dialog, IconButton } from "$lib";
    import Api from "../../../helpers/ApiCall";
    import { imagesView } from "../../stores/store";

    export let type_image = '/image_article/';
    export let openDialog = false;
    let dialog;
    let blob = '';
    let imagefocus = 0;
    let blobImages = [];

    const getImage = async (images) => {
        
        await Promise.all(images.map(async (url) => {
            let response = await Api.callImage(type_image + url);
            if (response != null) {
                blobImages.push(response);
            }
        }))

        blob = blobImages[0];
        dialog.open();
    }

    $: if ($imagesView.length > 0) getImage($imagesView);


</script>

<Dialog 
    bind:this={ dialog }
    on:closed={ () => {
        blob = '';
        imagefocus = 0;
        blobImages = [];
        imagesView.set([]);
        openDialog = false;
    }}
    >
    <div slot="content" class="image-container">
        <IconButton icon="chevron_left" on:click={ () => {
            if (imagefocus > 0) blob = blobImages[--imagefocus]
        } } />
     
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={blob} class="image" alt="image" />
       

        <IconButton icon="chevron_right" on:click={ () => {
            if (imagefocus < blobImages.length - 1) blob = blobImages[++imagefocus]
        } } />
     
    </div>
</Dialog>