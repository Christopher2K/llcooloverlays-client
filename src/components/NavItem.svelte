<script lang="ts">
  import type { Plus } from 'lucide-svelte';

  export let label: string;
  export let href: string;
  export let icon: typeof Plus;
  export let currentPath: string;

  $: active = currentPath === href;
</script>

<li class="rounded-lg self-stretch " class:bg-blue-100={active}>
  <a {href} class="flex flex-row justify-start items-center gap-3 px-3 py-2">
    <svelte:component this={icon} />
    <span class="text-md">{label}</span>
  </a>
</li>
