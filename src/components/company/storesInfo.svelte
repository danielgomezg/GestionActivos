<script>
    import { setContext } from 'svelte';
    // @ts-ignore
    import { Divider, IconButton } from "$lib";
    import { onMount, getContext } from "svelte";

    let editStore = getContext('editStore');
    let stores = []

    onMount(() => {
        // Se buscan en BD las sucursales de la companya que ingresa por prop.
        stores = [
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            },
            {
                descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                numero: '5',
                region: 'Región Metropolitana',
                comuna: 'Santiago',
                direccion: 'Calle falsa 123',
                totalOfices: 3
            }
        ]
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