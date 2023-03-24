<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import { configurationStore, COLLECTION_NAME } from '@app/models/configuration';
  import { authenticatedPbStore } from '@app/models/pocketbase';
  import Container from '@app/components/Container.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import Button from '@app/components/Button.svelte';
  import { snackbarStore } from '@app/models/ui';
  import { settingsStore } from '@app/models/settings';

  let titleValue: string = '';
  let informationsValue: string;

  let initialized: boolean = false;
  let unsubFromOnMount: () => void;

  $: ready =
    $configurationStore?.computer != null &&
    authenticatedPbStore != null &&
    $settingsStore?.pocketbaseConfigurationId &&
    initialized;


  onMount(() => {
    unsubFromOnMount = configurationStore.subscribe((configuration) => {
      if (configuration == null || initialized) return;
      titleValue = configuration.computer.title ?? '';
      informationsValue = configuration.computer.informations ?? '';
      initialized = true;
    });
  });

  onDestroy(() => unsubFromOnMount())

  async function onFormSubmit() {
    if ($authenticatedPbStore == null || $settingsStore?.pocketbaseConfigurationId == null) return;

    await $authenticatedPbStore
      .collection(COLLECTION_NAME)
      .update($settingsStore.pocketbaseConfigurationId, {
        content: {
          ...$configurationStore,
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

{#if ready}
  <Container class="" title="Computer overlay">
    <h2 class="mb-5 text-xl font-medium">Text displayed</h2>
    <hr class="my-5" />
    <form on:submit|preventDefault={onFormSubmit}>
      <Textfield name="title" bind:value={titleValue} label="Title" />
      <Textfield name="informations" bind:value={informationsValue} label="Informations" />
      <Button type="submit" label="Update" />
    </form>
  </Container>
{/if}
