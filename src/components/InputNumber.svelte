<script lang="ts">
  export let name: string;
  export let value: string | number;

  let className: string = '';
  export { className as class };
</script>

<input
  autocapitalize="false"
  autocorrect="false"
  class="w-80 px-2 py-2 rounded-md border border-neutral-400 {className}"
  {name}
  type="number"
  bind:value
/>
