<script>
    // @ts-nocheck
    import { TextField, Button, Divider, IconButton } from "$lib";
    import { onMount } from "svelte";

    // export let openModal
    export let sucursal = { }

    let addOffice = false, office = { piso: '', descripcion: ''}
    let officeEdit = {}

    let offices = [
        {
            id: 1,
            piso: 1,
            descripcion: 'piso de tecnologia'
        },
        {
            id: 2,
            piso: 2,
            descripcion: 'ropa de mujer'
        },
        {
            id: 3,
            piso: 3,
            descripcion: 'ropa de hombre'
        }
    ]

    let editing = null;

    function toggleEdit(office, index) {
        // editing = editing === index ? null : index;
        officeEdit = { ...office }
        document.querySelector(`#office-${index}`).style.display = "block"
    }

    onMount(() => {
        // Peticion para buscar las oficinas de una sucursal
        
    })

</script>

<div class="form-company">
    <TextField 
        version=2
        required 
        type="text"
        label="Número" 
        bind:value={sucursal.numero}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Descripcion" 
        bind:value={sucursal.descripcion}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Dirección" 
        bind:value={sucursal.direccion}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Ciudad" 
        bind:value={sucursal.ciudad}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Comuna" 
        bind:value={sucursal.comuna}
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-span-1">
        <Button 
            label="Guardar"
        />
        <!-- <Button 
            type="outlined"
            label="Cancelar"
            color=""
            on:click={ () => openModal = false }
        /> -->
    </div>

    <div class="grid-col-span-2">
        <Divider />
    </div>

    <h4>OFICINAS</h4>
    <!-- <br> -->

    <table class="grid-col-span-2">
        <ul>
            {#each offices as office, index} 
            <tr>
                <td style="width: 50%;"><li>{ office.piso  + ' ' + office.descripcion }</li></td>
                <td style="width: 50%;">
                    <IconButton icon="edit" on:click={ () => toggleEdit(office, index) } />
                    <IconButton icon="delete" on:click />
                </td>    
            </tr>
            <tr  id="office-{index}" style="display: none;">
                <TextField 
                    version=2
                    required 
                    type="text"
                    label="Número piso" 
                    bind:value={office.piso}
                />
                <TextField 
                    version=2
                    required 
                    type="text"
                    label="Descripción" 
                    bind:value={office.descripcion}
                />
            </tr>
            {/each}
        </ul>
    </table>

    {#if addOffice}
        <!-- <div class="grid-col-span-1"> -->
            <TextField 
                version=2
                required 
                type="text"
                label="Número piso" 
                bind:value={officeEdit.piso}
            />
        <!-- </div> -->
        <!-- <div class="grid-col-span-1"> -->
            <TextField 
                version=2
                required 
                type="text"
                label="Descripción" 
                bind:value={officeEdit.descripcion}
            />
        <!-- </div> -->
            
    {/if}
    
    <div class="company-actions grid-col-span-1">
        <Button 
            label="Agregar"
            on:click={ () => addOffice = true}
        />
        <Button 
            label="Cancelar"
            type="outlined"
            color=""
            on:click={ () => addOffice = false}
        />
    </div>
    
    

</div>

<style>
    .form-company {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 8px;
        /* padding: 0 24px 0 16px; */
        margin-top: 30px;
    }

    .company-actions {
        display: flex;
        gap: 8px;
        grid-column: 1;
    }


</style>