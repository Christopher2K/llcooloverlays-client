<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { configurationStore, COLLECTION_NAME } from '@app/models/configuration';
  import { pbStore } from '@app/models/pocketbase';
  import Container from '@app/components/Container.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import Button from '@app/components/Button.svelte';
  import { snackbarStore } from '@app/models/ui';
  import { settingsStore } from '@app/models/settings';

  let titleValue: string = '';
  let informationsValue: string;
  let guestsValue: number;

  let initialized: boolean = false;
  let unsubFromOnMount: () => void;

  $: ready =
    $configurationStore?.computer != null &&
    pbStore != null &&
    $settingsStore?.pocketbaseConfigurationId &&
    initialized;

  onMount(() => {
    unsubFromOnMount = configurationStore.subscribe((configuration) => {
      if (configuration == null || initialized) return;
      titleValue = configuration.computer.title ?? '';
      informationsValue = configuration.computer.informations ?? '';
      guestsValue = configuration.guests
      initialized = true;
    });
  });

  onDestroy(() => unsubFromOnMount());

  async function onFormSubmit() {
    if ($pbStore == null || $settingsStore?.pocketbaseConfigurationId == null) return;

    await $pbStore.collection(COLLECTION_NAME).update($settingsStore.pocketbaseConfigurationId, {
      content: {
        ...$configurationStore,
        guests: guestsValue,
        computer: {
          title: titleValue,
          informations: informationsValue,
        },
      },
    });

    snackbarStore.add({
      type: 'success',
      message: 'Text settings saved!',
    });
  }
</script>

<Container class="" title="Computer overlay">
  {#if ready}
    <h2 class="mb-5 text-xl font-medium">Text displayed</h2>
    <hr class="my-5" />
    <form on:submit|preventDefault={onFormSubmit}>
      <Textfield name="title" bind:value={titleValue} label="Title" />
      <Textfield name="informations" bind:value={informationsValue} label="Informations" />
      <Textfield name="guests" bind:value={guestsValue} label="Informations" isNumber />
      <Button type="submit" label="Update" />
    </form>
  {/if}
</Container>
