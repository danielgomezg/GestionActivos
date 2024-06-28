<script>
    import Autocomplete from '@smui-extra/autocomplete';
    import Textfield from '@smui/textfield';
    import { onMount } from 'svelte';
    import Api from '../../../helpers/ApiCall';

    export let companyId = 0;

    let sucursales = [];
    let sucursalLabels = [];

    let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
  
    let valueStandard = undefined;
    let textStandard = '';
    let valueFilled = undefined;
    let textFilled = '';
    let valueOutlined = undefined;
    let textOutlined = '';

    const getSucursales = async () => {
        console.log("SUCURSALES AUTOCOMPLETE ")
        if (companyId == 0) {
            sucursales = [];
            sucursalLabels = [];
            return;
        }; 
        let response = await Api.call(`/sucursalPorCompany/${companyId}`, 'GET');
        console.log('RESPONSE GET SUCURSALES  AUTOCOMPLETE --> ', response);
        if (response.success && response.statusCode === '200') {
            sucursales = response.data.result.map(r => ({ label: `${r.number} - ${r.description}`, value: r.id }));
            sucursalLabels = sucursales.map(s => s.label);
        }
        else {
            sucursales = [];
            sucursalLabels = [];
        }
    };

    onMount(async () => {
        await getSucursales();
    })

  </script>
  
    <div class="columns">
        <div class="autocomplete-container">
            <Autocomplete
                options={sucursalLabels}
                bind:value={valueOutlined}
                bind:text={textOutlined}
            >
                <Textfield label="Sucursales" bind:value={textOutlined} variant="outlined" 
                class="custom-textfield" />
            </Autocomplete>
        </div>

        <div>
            <Autocomplete
                options={fruits}
                bind:value={valueOutlined}
                bind:text={textOutlined}
            >
                <Textfield label="Fruit" bind:value={textOutlined} variant="outlined" />
            </Autocomplete>
        </div>
        

        <!-- <pre class="status">Selected: {valueOutlined || ''}</pre> -->
    </div>
  
    <style>
        .autocomplete-container {
          width: 300px; 
        }

        .custom-textfield {
        width: 100%; /* Asegúrate de que el textfield llene el contenedor */
        height: auto; /* Asegúrate de que el textfield llene el contenedor */
    }

    .custom-textfield .smui-textfield__input {
        font-size: 50px; /* Ajusta el tamaño de la fuente del input */
        padding: 8px; /* Ajusta el padding del input */
    }

    .autocomplete-container .smui-list {
        max-height: 20px; /* Ajusta la altura máxima del menú desplegable */
        overflow-y: auto; /* Permite el desplazamiento vertical si es necesario */
    }
      
        .columns {
          display: flex;
          gap: 20px;
        }
        .margins {
          margin: 20px;
        }
        .status {
          margin-top: 10px;
          font-weight: bold;
        }
    </style>
  