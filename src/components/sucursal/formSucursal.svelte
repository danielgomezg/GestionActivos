<script>
    import { onMount } from "svelte";
    import Api from "../../../helpers/ApiCall";
    import { TextField, Button, Divider, IconButton } from "$lib";
    import { snackbar } from "../../stores/store";
    import SelectCountryLocations from "../selectCountry/selectCountryLocations.svelte";

    export let sucursal = { }, company = { }

    let message = ""

    let addOffice = false
    let officeEdit = {}, editing = -1
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
    
    function validFormOficce() {
        if (officeEdit.floor == ''){
            message = "Falta agregar un piso a la oficina."
            return false; 
        }
        return true
    }

    const saveOffice = async () => {

        let  isValid = validFormOficce()
        if (!isValid){
            snackbar.update(snk => {
                snk.open = true;
                snk.message = message
                return snk
            })
            return
        }
        console.log(isValid)

        let body = JSON.stringify({ ...officeEdit, sucursal_id: sucursal.id })  
        let response = (await Api.call(`http://127.0.0.1:9000/office`, 'POST', { body }))
        console.log('RESPONSE POST OFFICE --> ', response)
        if (response.success, response.statusCode == "201") {
            console.log(offices)
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Oficina creada con éxito."
                return snk
            }) 

            offices = [response.data.result, ...offices]
            officeEdit = { floor: '', description: '' }
            addOffice = false
        } else {
            //aviso
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al crear oficina."
                return snk
            })
        } 
    }

    const getOffices = async (id_sucursal) => {
    
        let response = (await Api.call(`http://127.0.0.1:9000/officePorSucursal/${id_sucursal}`, 'GET', {}))
        console.log('RESPONSE GET Offices --> ', response)
        if (response.success) {
            offices = response.data.result
            console.log(offices) 
        } 
    }

    onMount(async () => {
        
        if(sucursal.id > 0 ){
            await getOffices(sucursal.id)
        }
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

    <SelectCountryLocations 
        country={ company.country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() }
        selectedRegion={ sucursal.region }
        selectedComuna={ sucursal.commune }
        on:setRegion={ (event) => sucursal.region = event.detail }
        on:setComuna={ (event) => sucursal.commune = event.detail }
    />

    <br>
    <br>
    <br>
    <div class="company-actions grid-col-span-1">
        <Button 
            label="Guardar"
            on:click={ saveSucursal }
        />
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
                <td style="width: 65%;"><li>{ office.floor  + ' - ' + office.description }</li></td>
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
                on:click={ saveOffice }
            />
        
            <Button 
                label="Cancelar"
                type="outlined"
                color=""
                on:click={ () => addOffice = false}
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
        
    </div>
    
    

</div>

<style>

    .company-actions {
        display: flex;
        gap: 8px;
        grid-column: 1;
    }


</style>