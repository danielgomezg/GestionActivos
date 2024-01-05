<script>
    import Api from "../../../helpers/ApiCall";
    import { snackbar } from "../../stores/store";
    import { Card, IconButton, Button } from "$lib";
    import { createEventDispatcher, getContext, setContext } from "svelte";

    export let company = {}
    let dispath = createEventDispatcher();
    let removeCompany = getContext('removeCompany');

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Funcion que obtenga la confirmacion del click desde snackbar.svelte
    setContext('confirmAction', (action) => {
        console.log('ACTION -> ', action)
        // if (action.id == 'deleteCompany') deleteCompany()
    })


    const deleteCompany = async () => {

        let confirmacion = confirm('Esta seguro que desea eliminar la empresa ', company.name)

        if (!confirmacion) return;
        
        let response = (await Api.call(`http://127.0.0.1:9000/company/${company.id}`, 'DELETE'));
        console.log('RESPONSE DELETE COMPANY -> ', response)
        if (response.success && response.statusCode == '201') {

            removeCompany(company.id)

            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Empresa eliminada con éxito."
                return snk
            })

        } else {
            snackbar.update(snk => {
                snk.open = true;
                snk.message = "Error al eliminar empresa."
                return snk
            })
        }
    }

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div class="card-title">{ company.name }</div>
            <div>
                <IconButton icon="edit" on:click={ dispath("edit", company) } />
                <IconButton icon="delete" on:click={ deleteCompany } />
            </div>
        </div>
        <div class="card-content">
            <div>{ company.rut }</div>
            <div>
                <img src={ '/flags/' + normalizeText(company.country) + '.png' } class="flag" alt="flag" />
                { company.country }
            </div>
            <div class="store-info">
                <span class="material-symbols-rounded">store</span>
                <!-- Muestra la cantidad de sucursales -->
                <div>{ company.count_sucursal || 0 } sucursales</div>
            </div>
        </div>
        <div class="card-actions">
            <Button label="ver sucursales" custom type="outlined" color="" on:click={ dispath("showStores", company) } />
            <Button label="agregar sucursal" custom on:click={ dispath("newStore", company) } />
        </div>
    </div>
</Card>

<style>
  .store-info {
    display: flex;
    align-items: center;
  }

  .flag {
    width: 25px;
    border-radius: 3px;
  }
</style>