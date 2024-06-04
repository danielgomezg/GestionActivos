<script>
    import { onMount } from 'svelte';
    import { MDCTabBar } from '@material/tab-bar';

    let tabComponent

    onMount(() => {
        const tabBar = new MDCTabBar(tabComponent);
        
    })

</script>
<div bind:this={tabComponent} class="mdc-tab-bar" role="tablist">
    <div class="mdc-tab-scroller">
      <div class="mdc-tab-scroller__scroll-area">
        <div class="mdc-tab-scroller__scroll-content">
          <button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
            <span class="mdc-tab__content">
              <!-- <span class="mdc-tab__icon material-symbols-rounded" aria-hidden="true">favorite</span> -->
              <span class="mdc-tab__text-label">Información</span>
            </span>
            <span class="mdc-tab-indicator mdc-tab-indicator--active">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
            <span class="mdc-tab__ripple"></span>
          </button>
          <button class="mdc-tab mdc-tab" role="tab" aria-selected="false" tabindex="0">
            <span class="mdc-tab__content">
              <!-- <span class="mdc-tab__icon material-symbols-rounded" aria-hidden="true">foo</span> -->
              <span class="mdc-tab__text-label">Imagenes</span>
            </span>
            <span class="mdc-tab-indicator mdc-tab-indicator">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
            <span class="mdc-tab__ripple"></span>
          </button>
          <button class="mdc-tab mdc-tab" role="tab" aria-selected="true" tabindex="0">
            <span class="mdc-tab__content">
              <!-- <span class="mdc-tab__icon material-symbols-rounded" aria-hidden="true">var</span> -->
              <span class="mdc-tab__text-label">Valores</span>
            </span>
            <span class="mdc-tab-indicator mdc-tab-indicator">
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
            </span>
            <span class="mdc-tab__ripple"></span>
          </button>
        </div>
      </div>
    </div>
</div>
<br>