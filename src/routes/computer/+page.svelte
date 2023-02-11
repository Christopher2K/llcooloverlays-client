<script lang="ts">
  import { onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import Container from '@app/components/Container.svelte';
  import Button from '@app/components/Button.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import { computerConfigurationStore } from '@app/models/computer';
  import { snackbarStore } from '@app/models/ui';

  let titleValue: string;
  let informationsValue: string;

  let computerConfigurationStoreUnsubscribe: Unsubscriber;

  $: ready = !$computerConfigurationStore.initializing;

  async function onSubmit() {
    await computerConfigurationStore.updateConfiguration({
      title: titleValue,
      informations: informationsValue,
    });

    snackbarStore.add({
      type: 'success',
      message: 'Text settings saved!',
    });
  }

  $: if (ready) {
    computerConfigurationStoreUnsubscribe?.();
  }

  onMount(() => {
    computerConfigurationStoreUnsubscribe = computerConfigurationStore.subscribe((initialValue) => {
      if (!initialValue.initializing) {
        titleValue = initialValue.data?.title ?? '';
        informationsValue = initialValue.data?.informations ?? '';
        ready = true;
      }
    });
  });
</script>

{#if ready}
  <Container class="" title="Computer overlay">
    <h2 class="mb-5 text-xl font-medium">Text displayed</h2>
    <hr class="my-5" />
    <form on:submit|preventDefault={onSubmit}>
      <Textfield name="title" bind:value={titleValue} label="Title" />
      <Textfield name="informations" bind:value={informationsValue} label="Informations" />
      <Button type="submit" label="Update" />
    </form>
  </Container>
{/if}
