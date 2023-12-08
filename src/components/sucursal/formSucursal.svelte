<script>
    // @ts-nocheck
    import { TextField, Button, Divider, IconButton, Select } from "$lib";
    import { onDestroy, onMount } from "svelte";
    import { locationsChile } from "../../../helpers/locationsChile"

    import Api from "../../../helpers/ApiCall";

    // export let openModal
    export let sucursal = { }

    let message = ""

    let addOffice = false
    let officeEdit = {}, editing = -1
    let comunas = [], regionSelected = ''

    let offices = []

    function toggleEdit(office, index) {
        if (editing == index) {
            editing = -1;
            return;
        }

        officeEdit = { ...office }
        addOffice = false
        editing = index
    }

    const setComuna = (region) => {
        console.log('set comunas > ', region)
        sucursal.commune = region
        // comunas = locationsChile.find((location, index) => {
        //     return {
        //         index,
        //         name: location.region
        //     }
        // })
    }

    const setRegion = (region) => {
        console.log('set región > ', region)
        sucursal.region = region
    }

    function validForm() {
        if (sucursal.description == ''){
            message = "Falta agregar una descripción a la sucursal"
            return false;
        }
        if (sucursal.number == ''){
            message = "Falta agregar un numero a la sucursal"
            return false;
        } 
        if (sucursal.address == ''){
            message = "Falta agregar una dirección a la sucursal"
            return false; 
        }
        if (sucursal.region == ''){
            message = "Falta agregar una región a la sucursal"
            return false; 
        } 
        if (sucursal.commune == ''){
            message = "Falta agregar una comuna a la sucursal"
            return false; 
        }   
        return true
    }

    const saveSucursal = async () => {
        // Validacion formulario
        let isValid = validForm();
        if (!isValid) return console.log(message)
        //loading = true;
        // Peticion
        console.log(sucursal)   
        let body = JSON.stringify(sucursal)  
        let response = (await Api.call('http://127.0.0.1:9000/sucursal', 'POST', { body }))
        console.log('RESPONSE SAVE SUCURSAL --> ', response)
        if (response.success) {
            if (response.data.code == 201) {
                message = "Sucursal agregada"
                sucursal.desciption = '',
                sucursal.number = ''
                sucursal.address = ''
                sucursal.region = ''
                sucursal.commune= ''
            }
        }
        //loading = false
    }


    const getOffices = async (id_sucursal) => {
        //loading = true;
        let response = (await Api.call(`http://127.0.0.1:9000/officePorSucursal/${id_sucursal}`, 'GET', {}))
        console.log('RESPONSE GET Offices --> ', response)
        if (response.success) {
            offices = response.data.result
            console.log(offices) 
        } 
        //loading = false;
    }

    onMount(async () => {
        console.log('mount form sucursal')
        console.log(sucursal.id)
        if(sucursal.id > 0 ){
            await getOffices(sucursal.id)
        }
    })

    onDestroy(() => {
        console.log('Destroy sucursal')
    })

</script>

<div class="form">
    <TextField 
        version=2
        required 
        type="text"
        label="Número" 
        bind:value={sucursal.number}
    />
    
    <TextField 
        version=2
        required 
        type="text"
        label="Descripcion" 
        bind:value={sucursal.description}
    />

    <TextField 
        version=2
        required 
        type="text"
        label="Dirección" 
        bind:value={sucursal.address}
    />

    <Select 
        label="Región"
        options={ 
            locationsChile.map((location, index) => {
                return {
                    value: location.region,
                    label: location.region
                }
            })
        }
        bind:selected={ regionSelected }
        on:change={ (event) => {
            let r = locationsChile.find(rg => rg.region == event.detail)
            console.log(r)
            setRegion(r.region)
            comunas = r.comunas.map(cm => {
                return {
                    label: cm,
                    value: cm
                }
            })
        } }
    />

    {#key comunas}

    <Select 
        label="Comunas"
        options={comunas}
        on:change={ (event) => setComuna(event.detail) }
    />

    {/key}

    <!-- <TextField 
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
    /> -->

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-span-1">
        <Button 
            label="Guardar"
            on:click={ saveSucursal }
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
                <td style="width: 65%;"><li>{ office.floor  + ' ' + office.description }</li></td>
                <td style="width: 65%;">
                    <IconButton icon="edit" on:click={ () => toggleEdit(office, index) } />
                    <IconButton icon="delete" on:click />
                </td>    
            </tr>
            {#if editing == index}
                <tr style="display: block;">
                    <TextField 
                        version=2
                        required 
                        type="text"
                        label="Número piso" 
                        bind:value={officeEdit.floor}
                    />
                    <TextField 
                        version=2
                        required 
                        type="text"
                        label="Descripción" 
                        bind:value={officeEdit.description}
                    />
                    <IconButton icon="save" />
                </tr>
            {/if}
            {:else}
                <p> No se encontraron oficinas. </p>
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
                bind:value={officeEdit.floor}
            />
        <!-- </div> -->
        <!-- <div class="grid-col-span-1"> -->
            <TextField 
                version=2
                required 
                type="text"
                label="Descripción" 
                bind:value={officeEdit.description}
            />
        <!-- </div> -->
            
    {/if}
    
    <div class="company-actions grid-col-span-1">
        {#if addOffice}
            <Button 
                label="Guardar"
                on:click={ () => {
                    officeEdit = { floor: '', description: '' }
                    addOffice = true
                    editing = -1
                }}
            />
        {:else}
            <Button 
                label="Agregar"
                on:click={ () => {
                    officeEdit = { floor: '', description: '' }
                    addOffice = true
                    editing = -1
                }}
            />
        {/if}
        
        
        <Button 
            label="Cancelar"
            type="outlined"
            color=""
            on:click={ () => addOffice = false}
        />
    </div>
    
    

</div>

<style>

    .company-actions {
        display: flex;
        gap: 8px;
        grid-column: 1;
    }


</style>