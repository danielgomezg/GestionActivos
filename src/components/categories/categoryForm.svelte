<script>
    import { TextField, Button } from "$lib";
    import Api from "../../../helpers/ApiCall";

    export let company_id;
    export let category = {};

    const create = async () => {
        
        let body = JSON.stringify(category)
        let response = (await Api.call('/category', 'POST', { body }, 'json', company_id))
        console.log('RESPONSE SAVE CATEGORY', response);

    }

    const update = async (data) => {
        console.log('UPDATE CATEGORY -> ', data)
        let body = JSON.stringify(category)
        let response = (await Api.call(`/category/${category.id}` , 'PUT', { body }, 'json', company_id))
        console.log('RESPONSE UPDATE CATEGORY', response);
    }

    const save = () => {
        console.log(category)
        if (category.id) {
            console.log('update')
            update(category)
        } else {
            console.log('create')
            create()
        }
    }

</script>

<div class="form">

    <TextField 
        required 
        type="text"
        label="Descripción" 
        bind:value={ category.description }
    />

    <div class="grid-col-span-1 mobile-fixed">

        <Button 
            label="Guardar"
            custom
            on:click={ save }
        />
    </div>

</div>