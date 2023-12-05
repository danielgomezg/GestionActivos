<script>
    // @ts-nocheck
    import { TextField, Button, Divider, IconButton, Select } from "$lib";
    import { onMount } from "svelte";
    import { locationsChile } from "../../../helpers/locationsChile"

    // export let openModal
    export let sucursal = { }

    let addOffice = false
    let officeEdit = {}, editing = -1
    let regiones = [
            {
                label: 'Bread, Cereal, Rice, and Pasta',
                value: 'grains',
                selected: false
            },
            {
                label: 'Vegetables',
                value: 'vegetables',
                selected: false
            },
            {
                label: 'Fruit',
                value: 'fruit',
                selected: false
            }
        ], comunas = [], regionSelected = ''

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
        // comunas = locationsChile.find((location, index) => {
        //     return {
        //         index,
        //         name: location.region
        //     }
        // })
    }

    onMount(() => {
        console.log('mount form sucursal')
        // Peticion para buscar las oficinas de una sucursal
        // regiones = locationsChile.map((location, index) => {
        //     return {
        //         id: index,
        //         value: index + 1,
        //         name: location.region
        //     }
        // })
        // regiones = [
        //     {
        //         label: 'Bread, Cereal, Rice, and Pasta',
        //         value: 'grains',
        //         selected: false
        //     },
        //     {
        //         label: 'Vegetables',
        //         value: 'vegetables',
        //         selected: false
        //     },
        //     {
        //         label: 'Fruit',
        //         value: 'fruit',
        //         selected: false
        //     }
        // ]
    })

</script>

<div class="form">
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
                <td style="width: 65%;"><li>{ office.piso  + ' ' + office.descripcion }</li></td>
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
                        bind:value={officeEdit.piso}
                    />
                    <TextField 
                        version=2
                        required 
                        type="text"
                        label="Descripción" 
                        bind:value={officeEdit.descripcion}
                    />
                    <IconButton icon="save" />
                </tr>
            {/if}
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
        {#if addOffice}
            <Button 
                label="Guardar"
                on:click={ () => {
                    officeEdit = { piso: '', descripcion: '' }
                    addOffice = true
                    editing = -1
                }}
            />
        {:else}
            <Button 
                label="Agregar"
                on:click={ () => {
                    officeEdit = { piso: '', descripcion: '' }
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