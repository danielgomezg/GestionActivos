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
                }
            },
            decoder: {
                readers: ["code_128_reader"],
                debug: {
                    showCanvas: true,
                    showPatches: true,
                    showFoundPatches: true,
                    showSkeleton: true,
                    showLabels: true,
                    showPatchLabels: true,
                    showRemainingPatchLabels: true,
                    boxFromPatches: {
                        showTransformed: true,
                        showTransformedBox: true,
                        showBB: true
                    }
                }
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