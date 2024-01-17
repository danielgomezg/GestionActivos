<script>
    import { Button, IconButton } from '$lib';
    import { snackbar } from '../../stores/store';

    export let id = 0;
    export let label = '';
    export let disabled = true;
    export let type = 'button';
    
    let downloadUrl = '';

    const reportArticle = async () => {
        
        // let response = (await Api.call(`http://127.0.0.1:9000/generation_catalogo/${companyId}`, 'GET'));
        fetch(`http://127.0.0.1:9000/generation_catalogo/${id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }})
            .then(response => response.blob())
            .then(data => {
                downloadUrl = URL.createObjectURL(data);
                console.log(downloadUrl)

                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'report.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                snackbar.update(snk => {
                    snk.open = true;
                    snk.message = "Error al descargar reporte."
                    return snk
                })
                console.error(error)
            });
        // console.log('GET REPORT RESPONSE', response);

    }

</script>

{#if type == 'button'}
    <Button 
        report 
        leading 
        {label}
        {disabled}
        icon="download" 
        on:click={ reportArticle } 
    />
{:else}
    <IconButton  
        icon="download" 
        tooltipId="btn-report__{label.split(' ').join('_')}__{Math.random()}"
        tooltipText={label}
        on:click={ reportArticle } 
    />
{/if}

