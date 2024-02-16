<script>
    import { Button, IconButton } from '$lib';
    import { snackbar } from '../../stores/store';

    export let id = 0;
    export let label = '';
    export let disabled = true;
    export let type = 'button';
    
    let downloadUrl = '';

    const reportArticle = async () => {
        let host = '';
        if (import.meta.env.MODE == 'production') host = `http://45.33.99.148:8000`
        else host = `http://127.0.0.1:9000`	
        fetch(`${host}/report/article/${id}`, { method: 'GET', headers: { 'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}` }})
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
                    snk.type = 'dismiss'
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
        leading="download" 
        {label}
        {disabled} 
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

