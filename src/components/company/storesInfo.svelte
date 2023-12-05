<script>
    import { setContext } from 'svelte';
    // @ts-ignore
    import { Divider, IconButton } from "$lib";
    import { onMount, getContext } from "svelte";

    let editStore = getContext('editStore');
    export let stores = []

    onMount(() => {
        // Se buscan en BD las sucursales de la companya que ingresa por prop.
        // stores = [
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        //         numero: '1',
        //         region: 'Región Norte',
        //         comuna: 'Comuna A',
        //         direccion: 'Calle Principal 123',
        //         totalOfices: 5
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //         numero: '2',
        //         region: 'Región Sur',
        //         comuna: 'Comuna B',
        //         direccion: 'Avenida Secundaria 456',
        //         totalOfices: 8
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        //         numero: '3',
        //         region: 'Región Centro',
        //         comuna: 'Comuna C',
        //         direccion: 'Calle Secundaria 789',
        //         totalOfices: 12
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        //         numero: '4',
        //         region: 'Región Este',
        //         comuna: 'Comuna D',
        //         direccion: 'Avenida Principal 456',
        //         totalOfices: 7
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
        //         numero: '5',
        //         region: 'Región Oeste',
        //         comuna: 'Comuna E',
        //         direccion: 'Calle Principal 789',
        //         totalOfices: 10
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        //         numero: '6',
        //         region: 'Región Norte',
        //         comuna: 'Comuna F',
        //         direccion: 'Avenida Secundaria 123',
        //         totalOfices: 15
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
        //         numero: '7',
        //         region: 'Región Sur',
        //         comuna: 'Comuna G',
        //         direccion: 'Calle Principal 456',
        //         totalOfices: 20
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et harum quidem rerum facilis est et expedita distinctio.',
        //         numero: '8',
        //         region: 'Región Centro',
        //         comuna: 'Comuna H',
        //         direccion: 'Avenida Secundaria 789',
        //         totalOfices: 25
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
        //         numero: '9',
        //         region: 'Región Este',
        //         comuna: 'Comuna I',
        //         direccion: 'Calle Principal 123',
        //         totalOfices: 30
        //     },
        //     {
        //         descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.',
        //         numero: '10',
        //         region: 'Región Oeste',
        //         comuna: 'Comuna J',
        //         direccion: 'Avenida Secundaria 456',
        //         totalOfices: 35
        //     }
        // ];


    })
</script>

<div class="store-info__container">
    {#each stores as store}
        <div>
            <div class="store-info__title">
                <div>    
                    <strong>{ store.numero }</strong>
                    { ` (${store.totalOfices} oficinas)` }
                </div>
                <div>
                    <IconButton icon="edit" on:click={ editStore(store) } />
                    <IconButton icon="delete" />
                </div>

            </div>
            <div class="store-info__offices">
                <!-- { `${store.totalOfices} oficinas` } -->
            </div>
            <div class="store-info__address">
                { `${store.direccion}.` }
                <strong>{ `${store.comuna}, ${store.region}` }</strong>
            </div>
            <div class="store-info__description">
                {store.descripcion}
            </div>
            <!-- <div class="store-actions">
                <IconButton icon="edit" />
            </div> -->
        </div>
        <Divider />
    {:else}
        <p>La empresa no cuenta con sucursales.</p>
    {/each}
</div>

<style>
    .store-info__title {
        font-size: 16px;
        /* font-weight: bold;     */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .store-info__offices {

    }

    .store-info__address {
        
    }

    .store-info__description {
        font-size: 14px;
        font-weight: lighter;
    }
</style>