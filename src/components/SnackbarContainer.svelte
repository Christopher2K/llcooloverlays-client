<script lang="ts">
  import { snackbarStore } from '@app/models/ui';

  import Snackbar from './Snackbar.svelte';

  function onRemoveSnackbar() {
    snackbarStore.remove();
  }
</script>

{#if $snackbarStore != null}
  <div class="fixed z-50 top-0 right-0 left-0 bottom-0 bg-transparent" on:click={onRemoveSnackbar}>
    <div
      class="fixed bottom-6 left-6 right-6 flex flex-col-reverse justify-start items-start gap-5"
    >
      <Snackbar
        type={$snackbarStore.type}
        message={$snackbarStore.message}
        on:close={onRemoveSnackbar}
      />
    </div>
  </div>
{/if}
