<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { v4 as uuidV4 } from 'uuid';

  import { configurationStore, COLLECTION_NAME } from '@app/models/configuration';
  import { pbStore } from '@app/models/pocketbase';
  import Container from '@app/components/Container.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import Button from '@app/components/Button.svelte';
  import MultipleTextfield from '@app/components/MultipleTextfield.svelte';
  import { snackbarStore } from '@app/models/ui';
  import { settingsStore } from '@app/models/settings';

  let titleValue: string = '';
  let guestsValue: Record<string, string>;

  let initialized: boolean = false;
  let unsubFromOnMount: () => void;

  $: ready =
    $configurationStore?.talk != null &&
    pbStore != null &&
    $settingsStore?.pocketbaseConfigurationId &&
    initialized;

  onMount(() => {
    unsubFromOnMount = configurationStore.subscribe((configuration) => {
      if (configuration == null) return;
      titleValue = configuration.talk.title ?? '';
      guestsValue = (configuration.talk.guests ?? [{ name: '' }]).reduce(
        (result, { name }) => ({
          ...result,
          [uuidV4()]: name,
        }),
        {},
      );
      initialized = true;
    });
  });

  onDestroy(() => unsubFromOnMount());

  async function onFormSubmit() {
    if ($pbStore == null || $settingsStore?.pocketbaseConfigurationId == null) return;

    await $pbStore
      .collection(COLLECTION_NAME)
      .update($settingsStore.pocketbaseConfigurationId, {
        content: {
          ...$configurationStore,
          talk: {
            title: titleValue,
            guests: Object.values(guestsValue).map((name) => ({
              name,
            })),
          },
        },
      });

    snackbarStore.add({
      type: 'success',
      message: 'Text settings saved!',
    });
  }
</script>

<Container title="Talk overlay">
  {#if ready}
    <h2 class="font-medium text-xl mb-5">Text displayed</h2>
    <hr class="my-5" />
    <form on:submit|preventDefault={onFormSubmit}>
      <Textfield name="title" label="Talk title" bind:value={titleValue} />
      <MultipleTextfield label="Guests" bind:values={guestsValue} />

      <Button label="Save" type="submit" />
    </form>
  {/if}
</Container>
