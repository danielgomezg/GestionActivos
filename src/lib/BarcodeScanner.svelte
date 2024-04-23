<script>
    import Quagga from 'quagga'; 
    import { onMount } from 'svelte';

    function initBarcodeScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'),
                constraints: {
                    width: 520,
                    height: 400,                  
                    facingMode: "environment"  //"environment" for back camera, "user" front camera
                },
                area: { // defines rectangle of the detection/localization area
                    top: "0%",    // top offset
                    right: "0%",  // right offset
                    left: "0%",   // left offset
                    bottom: "0%"  // bottom offset
                },
            },
            decoder: {
                readers: [ 
                    "code_128_reader",
                    "ean_reader",
                    "ean_8_reader",
                    "code_39_reader",
                    "code_39_vin_reader",
                    "codabar_reader",
                    "upc_reader",
                    "upc_e_reader" ] ,
            },
            locator: {
                patchSize: 'medium',
                halfSample: true,
            },
            locate: true
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            console.log('Detected', data.codeResult.code);
            console.log(data.codeResult.code);
            Quagga.stop();
        });
    }

    onMount(() => {
        // initBarcodeScanner();
        console.log('onMount')
    });

</script>

<button on:click={ initBarcodeScanner  }>Init scan</button>
<div id="interactive"></div>