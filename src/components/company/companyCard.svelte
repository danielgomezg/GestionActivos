<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { Card, IconButton, Button, Snackbar } from "$lib";
    import { createEventDispatcher, getContext } from "svelte";

    export let company = {}

    let dispath = createEventDispatcher();
    let removeCompany = getContext('removeCompany');

    let openSnackbar = false;
    let messageSnackbar = '';

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const deleteCompany = async () => {

        console.log('deleteCompany -> ', company)
        // let confirmacion = confirm('Esta seguro que desea eliminar la empresa ', company.name)
        // if (!confirmacion) return;
        let response = (await Api.call(`http://127.0.0.1:9000/company/${company.id}`, 'DELETE'));
        console.log('RESPONSE DELETE COMPANY -> ', response)
        if (response.success && response.statusCode == '201') {

            removeCompany(company.id)

            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Empresa eliminada con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.type = 'dismiss'
                snk.message = "Error al eliminar empresa."
                return snk
            })
        }
    }

    // $: if ($snackbar.click) confirmSnackbar()

</script>

<Snackbar 
    bind:open={ openSnackbar }
    type="confirm"
    message={messageSnackbar}
    on:confirm={ deleteCompany }
/>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div class="card-title">{ company.name }</div>
            <div>
                <IconButton icon="history" tooltipId="btn-history__{company.name}" tooltipText="Historial" on:click={ dispath("history", company) } />
                <IconButton icon="edit" tooltipId="btn-edit__{company.name}" tooltipText="Editar" on:click={ dispath("edit", company) } />
                <IconButton 
                    icon="delete" 
                    tooltipId="btn-delete__{company.name}" 
                    tooltipText="Eliminar" 
                    on:click={ () => {
                        messageSnackbar = '¿Eliminar la empresa ' + company.name + '?'
                        openSnackbar = true;
                    } } />
            </div>
        </div>
        <div class="card-content">
            <div class="responsive-table">
                <table>
                    <tr>
                        <td><span class="material-symbols-rounded">badge</span></td>
                        <td>{ company.rut }</td>
                    </tr>
                    <tr>
                        <td> <img src={ '/flags/' + normalizeText(company.country) + '.png' } class="flag" alt="flag" /> </td>
                        <td>{ company.country }</td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-rounded">store</span></td>
                        <td>{ company.count_sucursal || 0 } sucursales</td>
                    </tr>
                </table>
            </div>
            <div class="responsive-table">
                <table>
                    <tr>
                        <td><span class="material-symbols-rounded">contact_emergency</span></td>
                        <td class="clipped-text">{ company.contact_name || '' } </td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-rounded">contact_mail</span></td>
                        <td class="clipped-text">{ company.contact_email || '' } </td>
                    </tr>
                    <tr>
                        <td><span class="material-symbols-rounded">contact_phone</span></td>
                        <td class="clipped-text">{ company.contact_phone || '' } </td>
                    </tr>
                </table>
            </div>
            

            <!-- <span class="material-symbols-rounded">badge</span>
            <div>{ company.rut }</div>
            <div>
                <img src={ '/flags/' + normalizeText(company.country) + '.png' } class="flag" alt="flag" />
                { company.country }
            </div>
            <div class="store-info">
                <span class="material-symbols-rounded">store</span>
               
                <div>{ company.count_sucursal || 0 } sucursales</div>
            </div> -->
        </div>
        <div class="card-actions">
            <Button label="Ver sucursales" custom type="outlined" color="" on:click={ dispath("showStores", company) } />
            <Button label="Nueva sucursal" custom on:click={ dispath("newStore", company) } />
        </div>
    </div>
</Card>

<style>
    .card-content {
        display: flex;
        align-items: flex-start;
        gap: 50px;
    }

    .flag {
        width: 25px;
        border-radius: 3px;
    }

    .clipped-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
</style>