<script>
    import { Divider } from "$lib";
    import { onMount } from 'svelte';
    import Api from '../../../helpers/ApiCall';

    export let company = {};
    let companyHistory = [];

    const getUserName = (user) => {
        return `${user.firstName} ${user.secondName} ${user.lastName} ${user.secondLastName}`;
    }

    const formatLocation = (location) => {
        return `${location.address}. ${location.commune}, ${location.region}`
    }

    const generateInfo = (history) => {

        let text = ''

        switch (history.description) {
            case 'create-sucursal':
                // let user = getUserName(history.current_session_user_id)
                text = `Se crea sucursal ${history.sucursal_id.number}`
                break;
            case 'update':
                text = `Se ha actualizado la empresa ${history.company_name}`
                break;
            case 'delete':
                text = `Se ha eliminado la empresa ${history.company_name}`
                break;
            default:
                break;
        }


        return text
    }   

    const getHistory = async (company_id) => {
        let response = (await Api.call(`http://127.0.0.1:9000/history/company/${company_id}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success && response.statusCode == '200') {
            companyHistory = response.data.result 
        } 
    }

    onMount(async () => {
        getHistory(company.id)
    });

</script>

<div>
    {#each companyHistory as history}
        <div style="display: flex; justify-content: space-between">
            <div>
                <p class="title-history"><strong>{ generateInfo(history) }</strong></p> 
                <!-- <p>{ getUserName(history.current_session_user_id) }</p> -->
                <table>
                    <tr class="centered-row">
                        <td><span class="material-symbols-rounded">location_on</span></td>
                        <td>{ formatLocation(history.sucursal_id) }</td>
                    </tr>
                    <tr class="centered-row">
                        <td><span class="material-symbols-rounded">person_edit</span></td>
                        <td>{ getUserName(history.current_session_user_id) }</td>
                    </tr>
                </table>
            </div>
            
            <p><strong>{history.creation_date.split('-').reverse().join('-')}</strong></p> 
        </div>
        <Divider />
    {:else}
        <p>No hay historial</p>
    {/each}
</div>
<style>
    .centered-row td {
        vertical-align: middle;
    }

    .title-history {
        font-size: larger;
    }
</style>