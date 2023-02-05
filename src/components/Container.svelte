<script lang="ts">
  export let className: string = '';
  export let title: string = ''

  export { className as class };
</script>

<div class="w-full h-full overflow-y-auto p-5 {className}">
  <h1 class="font-medium text-3xl mb-5">{title}</h1>
  <slot />
</div>
