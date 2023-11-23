<script>
    // @ts-ignore
    import { Button, SideSheets, Card } from "$lib";
    import Company from "../../components/company/company.svelte";
    import Sucursal from "../../components/sucursal/sucursal.svelte";

    let openModal, modalTitle = '', modalContent

    const openSideSheets = (title = '') => {
        switch (title) {
            case 'company':
                modalTitle = 'Empresa'
                modalContent = Company
                break;
        
            default:
                modalTitle = 'Sucursal'
                modalContent = Sucursal
                break;
        }
        openModal = true
    }

</script>

<div class="home__content">

    <Card>
        <div class="card__content">
            <div class="card__title">
                Empresas
            </div>

            <div class="card__actions">
                <Button label="Sucursales" color="#4F5DDB" on:click={ () => openSideSheets('company') }  />
                <Button label="Agregar" color="#4F5DDB" on:click={ () => openSideSheets('company') }  />
            </div>
        </div>
    </Card>

    <Card>
        <div class="card__content">
            <div class="card__title">
                Sucursal
            </div>

            <div class="card__actions">
                <Button label="Oficinas" color="#4F5DDB" on:click={ () => openSideSheets('sucursal') }  />
                <Button label="Agregar" color="#4F5DDB" on:click={ () => openSideSheets('sucursal') }  />
            </div>
        </div>
    </Card>

</div>

<SideSheets bind:open={openModal} title={modalTitle} >
    
    <svelte:component this={modalContent} bind:openModal={openModal} />
    
</SideSheets>


<a href="/">back</a>

<style>
    .card__title {
        text-align: left;
        font-size: 30px;
        font-weight: 600;
    }
    .card__content {
        padding: 16px;
        width: 390px;
    }

    .card__actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
    }
    .home__content {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>