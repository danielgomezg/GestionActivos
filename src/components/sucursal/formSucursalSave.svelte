<script>
    import Api from "../../../helpers/ApiCall";
    import { onDestroy, onMount } from "svelte";
    import { snackbar } from "../../stores/store";
    import { TextField, Button, Divider, Select } from "$lib";
    import { locationsChile } from "../../../helpers/locationsChile"

    // export let openModal
    export let sucursal = { }

    let message = ""
    let comunas = [], regionSelected = ''
    let offices = [
        {
            floor: '', 
            description: ''
        }
    ]

    const setComuna = (region) => {
        console.log('set comunas > ', region)
        sucursal.commune = region
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
                sucursal.description = '',
                sucursal.number = ''
                sucursal.address = ''
                sucursal.region = ''
                regionSelected = ''
                sucursal.commune = ''

                //GUARDAR OFICINAS
                let responseOffices = []; 
                responseOffices = await saveOffice(response.data.result.id);
                if (responseOffices.length > 0) {
                    if (offices.length != responseOffices.length) {
                        // Error al crear algunas oficinas
                        snackbar.update(snk => {
                            snk.open = true;
                            snk.message = "Error al crear algunas oficinas, pueden volver a intentar en edicion sucursal."
                            return snk
                        })
                    }
                    else {
                        // Error al crear las oficinas
                        snackbar.update(snk => {
                            snk.open = true;
                            snk.message = "Error al crear las oficinas, pueden volver a intentar en edicion sucursal."
                            return snk
                        })
                    }
                }
                else {
                    // Todo guardado.
                    snackbar.update(snk => {
                        snk.open = true;
                        snk.message = "Sucursal creada con exito."
                        return snk
                    })
                }
            }
            else {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Error al crear sucursal."
                    return snk
                })
            }
        }
        else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al crear sucursal."
                return snk
            })
        }
        //loading = false
    }

    const saveOffice = async (idSucursal) => {
        
        offices = offices.map(of => {
            return {
                ...of,
                sucursal_id: idSucursal
            }
        });
        
        let response = (await Promise.all( offices.map(of => {
            let body = JSON.stringify(of)
            return Api.call(`http://127.0.0.1:9000/office`, 'POST', { body })
        })));
        console.log('RESPONSE SAVE OFFICES --> ', response)

        // let created = response.every(r => r.data.code == "201")
        let failed = response.filter(r => r.data.code != "201");
        return failed

    }

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
        label="Descripción" 
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
        label="Comuna"
        options={comunas}
        selected={ sucursal.commune }
        on:change={ (event) => setComuna(event.detail) }
    />

    {/key}

    <div class="grid-col-span-2">
        <Divider />
    </div>
    <h4>OFICINAS</h4>
    <div></div>

    {#each offices as office }
        <TextField 
            version=2
            required 
            type="text"
            label="Número piso" 
            bind:value={office.floor}
        />

        <TextField 
            version=2
            required 
            type="text"
            label="Descripción" 
            bind:value={office.description}
        />
    {/each}

    <div class="company-actions grid-col-span-1">
      
        <Button 
            label="Agregar oficina"
            on:click={ () => {
                offices = [ ...offices, { floor: '', description: '' } ]
            }}
        />
        {#if offices.length != 1}

            <Button 
                type="outlined"
                label="Cancelar"
                color=""
                on:click={ () => {
                    offices = [...offices.slice(0, -1)]
                }}
            />

        {/if}
    </div>

    <br>
    <br>
    <div class="company-actions grid-col-span-1">
        <Button 
            label="Guardar"
            on:click={ saveSucursal }
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