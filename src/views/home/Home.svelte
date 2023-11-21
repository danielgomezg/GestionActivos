<script>
    // @ts-ignore
    import { Button, SideSheets } from "$lib";
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

<Button label="Add Company" color="#4F5DDB" icon="add" on:click={ () => openSideSheets('company') }  />
<Button label="Add Sucursal" color="#4F5DDB" icon="add" on:click={ () => openSideSheets('sucursal') }  />

<SideSheets bind:open={openModal} title={modalTitle} >
    
    <svelte:component this={modalContent} bind:openModal={openModal} />
    
</SideSheets>
<h1>Home</h1>
<a href="/">back</a>