<script>
  import '../app.css';

  import Nav from '@app/components/Nav.svelte';
  import SnackbarContainer from '@app/components/SnackbarContainer.svelte';
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
