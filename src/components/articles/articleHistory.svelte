<script>
    import { Divider } from "$lib";
    import { onMount, tick } from 'svelte';
    import Api from '../../../helpers/ApiCall';

    export let article = {};
    export let endSroll = false;

    let content
    let limit = 10;
    let offset = 0;
    let count = -1;
    let articleHistory = [];

    const getUserName = (user) => {
        if (user == undefined) return ''
        return `${user.firstName} ${user.secondName} ${user.lastName} ${user.secondLastName}`;
    }

    const generateInfo = (history) => {

        let text = ''
        // console.log('HISTORY --> ', history)

        switch (history.description) {
            case 'create-active':
                text = `Se crea activo ${history.active.bar_code}`
                break;
            case 'update-active':
                text = `Se actualiza activo ${history.active.bar_code}`
                break;
            case 'delete-active':
                text = `Se elimina activo ${history.active.bar_code}`
                break;
            case 'create-article':
                text = `Se creado articulo ${history.article.code}`
                break;
            case 'update-article':
                text = `Se actualiza articulo ${history.article.code}`
                break;
            case 'delete-article':
                text = `Se elimina articulo ${history.article.code}`
                break;
            default:
                break;
        }


        return text
    }   

    const getHistory = async (company_id) => {
        console.log('GET HISTORY')
        console.log('OFFSET -> ', offset)
        console.log('LIMIT -> ', limit)
        console.log('COUNT -> ', count)
        if (count != -1 && offset > count) return
        
        let response = (await Api.call(`http://127.0.0.1:9000/history/article/${company_id}?limit=${limit}&offset=${offset}`, 'GET'))
        console.log('RESPONSE GET Sucursales --> ', response)
        if (response.success && response.statusCode == '200') {
            articleHistory = [...articleHistory, response.data.result]
            count = response.data.count
        } 
    }

    function handleScroll() {
        console.log('scrolling');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;

        if (scrollTop + windowHeight >= docHeight) {
            console.log('Has llegado al final de la página');
        // Aquí puedes hacer lo que necesites cuando el usuario llegue al final de la página
        }
    }

    const updateOffset = () => {
        offset += 10;
    }

    onMount(async () => {
        await getHistory(article.id)
        await tick();
        // let content =  document.querySelector('.side-sheets__content')
        // console.log('CONTENT -> ', content)
        content.addEventListener('scroll', handleScroll);
        // return () => {
        //     document.querySelector('.side-sheets__content').removeEventListener('scroll', handleScroll);
        // };
    });

    $: updateOffset(endSroll);
    $: getHistory(offset);


</script>

<div bind:this={content} class="main-history__article" on:scroll={ () => console.log('scroll 1') }> 
    {#each articleHistory as history}
        <div style="display: flex; justify-content: space-between">
            <div>
                <p class="title-history"><strong>{ generateInfo(history) }</strong></p> 
                <!-- <p>{ getUserName(history.current_session_user_id) }</p> -->
                <table>
                    <!-- {#if history.description.includes('sucursal')}
                        <tr class="centered-row">
                            <td><span class="material-symbols-rounded">location_on</span></td>
                            <td>{ formatLocation(history.sucursal) }</td>
                        </tr>
                    {:else if history.description.includes('office')}
                        <tr class="centered-row">
                            <td><span class="material-symbols-rounded">info</span></td>
                            <td>{ `Piso: ${history.office.floor} - ${history.office.description}` }</td>
                        </tr>
                    {/if} -->
                    <tr class="centered-row">
                        <td><span class="material-symbols-rounded">person_edit</span></td>
                        <td>{ getUserName(history.user) }</td>
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