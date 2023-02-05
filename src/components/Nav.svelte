<script lang="ts">
  import { page } from '$app/stores';
  import { Laptop, Mic, Cog } from 'lucide-svelte';

  import NavItem from './NavItem.svelte';
</script>

<nav
  class="flex flex-col justify-start items-start bg-neutral-100 px-5 py-5 border-r border-neutral-200 h-full w-1/3"
>
  <h1 class="font-medium text-2xl mb-5 self-stretch">Overlay control</h1>
  <ul class="self-stretch flex flex-col justify-start items-start gap-1 flex-1">
    <NavItem
      label="Computer overlay"
      href="/computer"
      icon={Laptop}
      currentPath={$page.url.pathname}
    />

    <NavItem label="Talk overlay" href="/talk" icon={Mic} currentPath={$page.url.pathname} />
  </ul>
  <ul class="self-stretch">
    <NavItem label="Settings" href="/settings" icon={Cog} currentPath={$page.url.pathname} />
  </ul>
</nav>
