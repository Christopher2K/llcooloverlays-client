<script lang="ts">
  import Label from './Label.svelte';
  import Input from './Input.svelte';

  export let name: string;
  export let label: string;
  export let value: string;
</script>

<fieldset class="w-full mb-5 flex flex-col justify-start items-start">
  <Label {label} {name} />
  <Input bind:value {name} />
</fieldset>
