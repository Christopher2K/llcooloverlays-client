<script lang="ts">
  import { v4 as uuidV4 } from 'uuid';
  import { Plus, Minus } from 'lucide-svelte';

  import ButtonIcon from './ButtonIcon.svelte';
  import Label from './Label.svelte';
  import Input from './Input.svelte';

  // State
  export let label: string;
  export let values: Record<string, string> = {
    [uuidV4()]: '',
  };

  // Reactive props
  $: inputIds = Object.keys(values);

  // Callbacks
  function addNewGuestField() {
    values = {
      ...values,
      [uuidV4()]: ''
    }
  }

  function removeGuestField(fieldId: string) {
    values = Object.keys(values).reduce((result, key) => {
      if (key === fieldId) return result;
      return { ...result, [key]: values[key] };
    }, {});
  }
</script>

<fieldset class="w-full mb-5">
  <div class="mb-3 flex flex-row justify-start items-center gap-2">
    <Label {label} class="mb-0" />
    <ButtonIcon icon={Plus} on:click={addNewGuestField} />
  </div>

  {#each inputIds as inputId (inputId)}
    <Input bind:value={values[inputId]} name="input-{inputId}" class="mb-2" />
    {#if inputIds.length > 1}
      <ButtonIcon icon={Minus} on:click={() => removeGuestField(inputId)} />
    {/if}
  {/each}
</fieldset>
