<script lang="ts">
  export let name: string;
  export let label: string;
  export let value: string;
</script>

<fieldset class="w-full mb-5">
  <label class="inline-block w-full text-l font-medium mb-3" for={name}>{label}</label>
  <input
    class="w-80 px-2 py-2 rounded-md border border-neutral-400"
    {name}
    type="text"
    bind:value
  />
</fieldset>
