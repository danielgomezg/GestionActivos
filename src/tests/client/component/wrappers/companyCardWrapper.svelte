<script>
    import CompanyCard from "../../../../components/company/companyCard.svelte";

    let company = {
        name: 'Acme',
        rut: '1.111.111-1',
        country: 'Chile',
        count_sucursal: 5
    }
    let modalTitle = ''

    const editCompany = (company) => {
        modalTitle = company.name + " - editando"
    }

    const newStore = (company) => {

    }

    const showStores = (company) => {

    }

</script>


<CompanyCard 
    {company} 
    on:edit={ (event) => editCompany(event.detail) } 
    on:newStore={ (event) => newStore(event.detail) } 
    on:showStores={ (event) => showStores(event.detail) } 
/>