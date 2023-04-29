<script lang="ts">
  import Label from './Label.svelte';
  import Input from './Input.svelte';
  import InputNumber from './InputNumber.svelte';

  export let name: string;
  export let label: string;
  export let value: string | number;
  export let isNumber: boolean = false;
</script>

<fieldset class="w-full mb-5 flex flex-col justify-start items-start">
  <Label {label} {name} />
  {#if isNumber}
    <InputNumber bind:value {name} />
  {:else}
    <Input bind:value {name} />
  {/if}
</fieldset>
