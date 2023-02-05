<script lang="ts">
  import { snackbarStore } from '@app/models/ui';

  import Snackbar from './Snackbar.svelte';

  function onRemoveSnackbar(event: CustomEvent<string>) {
    snackbarStore.remove(event.detail);
  }
</script>

<div class="fixed bottom-6 left-6 right-6 flex flex-col-reverse justify-start items-start gap-5">
  {#each $snackbarStore as snackbar (snackbar.id)}
    <Snackbar
      id={snackbar.id}
      type={snackbar.type}
      message={snackbar.message}
      on:close={onRemoveSnackbar}
    />
  {/each}
</div>
