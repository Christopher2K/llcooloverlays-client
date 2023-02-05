<script lang="ts" context="module">
  import type { SnackbarType } from '@app/models/ui';

  const bgColorByType: Record<SnackbarType, string> = {
    error: 'bg-red-500',
    success: 'bg-green-500',
  };
</script>

<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';

  const dispatch = createEventDispatcher<{ close: string }>();

  export let id: string;
  export let type: 'success' | 'error';
  export let message: string;

  $: bgClass = bgColorByType[type];

  function closeSnackbar() {
    dispatch('close', id);
  }
</script>

<div
  class="relative w-full {bgClass} rounded-lg p-5"
  in:fly={{ y: 200, duration: 400 }}
  out:fade={{ duration: 200 }}
>
  <header class="absolute top-2 left-2 right-2 flex row justify-end">
    <button class="text-white" on:click={closeSnackbar}><X /></button>
  </header>
  <p class="text-white font-semibold">{message}</p>
</div>
