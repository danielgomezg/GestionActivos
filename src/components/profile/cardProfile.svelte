<script>
    import { Card, Divider, Chip } from "$lib"
    import { modulos } from "../../stores/store";
  import BtnAccion from "../btnAccion.svelte";
    

    export let profile = {}

    let tablesActions = {}

    const hasAction = (module, action) => {
        return profile.actions.includes(action + '-' + module)
    }

    const getTables = (actions) => {
        if (actions == null || actions == undefined) return
    
        actions.forEach(action => {
            let [method, table] = action.split('-');
            
            if (table in tablesActions) {
                tablesActions[table].push(method)
            } 
            else {
                tablesActions[table] = [method]
            }
        });
    }

    $: getTables(profile.actions)

</script>

<Card>
    <div class="card-container">
        <div class="card-header">
            <div>
                <div class="card-title capitalize">{ profile.name }</div>
            </div>
        </div>
        <Divider />
        <table style="width: 100%;">
            <thead>
                <tr>
                  <th colSpan="2" style="text-align: left;">Tabla</th>
                  <th colSpan="3" style="text-align: left;">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!-- {#each Object.entries(tablesActions) as [table, actions] }
                    <tr>
                        <td colSpan="2"><li>{ table }</li></td>
                        {#each actions as action, index }
                        <td>
                            <Chip chip={ { id: index, label: action } } />
                        </td>    
                        {/each}
                    </tr>
                {/each} -->
                {#each $modulos as modulo }
                    <tr>
                        <td colSpan="2"><li>{ modulo }</li></td>
                        {#each ['create', 'update', 'delete'] as action, index }
                            <td>
                                {#if hasAction(modulo, action)}
                                    <Chip chip={ { id: index, label: action, color: action } } />
                                {:else}
                                    <Chip chip={ { id: index, label: action } } />
                                {/if}
                            </td>   
                        {:else}
                            <p>perfil sin acciones</p>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Card>