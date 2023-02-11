<script lang="ts">
  import type { Play } from 'lucide-svelte';

  export let icon: typeof Play;
</script>

<button class="bg-blue-500 p-1 rounded-md flex-shrink-0" type="button" on:click>
  <svelte:component this={icon} class="w-4 h-4 text-white" />
</button>
