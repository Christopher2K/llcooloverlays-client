<script>
  import Pocketbase from 'pocketbase';
  import '../app.css';
  import { onMount } from 'svelte';
  import { settingsStore } from '@app/models/settings';
  import { snackbarStore } from '@app/models/ui';
  import { pbStore } from '@app/models/pocketbase'

  import Nav from '@app/components/Nav.svelte';
  import SnackbarContainer from '@app/components/SnackbarContainer.svelte';

  let pocketbaseInitialized = false;

  $: if (!pocketbaseInitialized) {
    const { pocketbasePassword, pocketbaseUrl, pocketbaseUsername } = $settingsStore ?? {};
    if (pocketbaseUsername && pocketbaseUrl && pocketbasePassword) {
      const pb = new Pocketbase(pocketbaseUrl);

      pb.admins
        .authWithPassword(pocketbaseUsername, pocketbasePassword)
        .then(() => {
          console.log('pocketbase initialized');
          pbStore.set(pb);
        })
        .catch((e) => {
          if (!e.message.includes('autocancelled')) {
            console.log(e.message);
            pbStore.set(null);
            snackbarStore.add({ type: 'error', message: "Can't connect to PB" });
          }
        });
    }
  }

  onMount(() => {});
</script>

<div class="bg-neutral-100 w-[100vw] h-[100vh] flex flex-row justify-start items-start">
  <Nav />

  <main class="flex-1 h-full w-full">
    <slot />
  </main>
</div>

<footer>
  <SnackbarContainer />
</footer>
