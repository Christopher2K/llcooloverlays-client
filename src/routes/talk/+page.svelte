<script lang="ts">
  import { onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { v4 as uuidV4 } from 'uuid';

  import Container from '@app/components/Container.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import Button from '@app/components/Button.svelte';
  import MultipleTextfield from '@app/components/MultipleTextfield.svelte';
  import { talkConfigurationStore } from '@app/models/talk';
  import { snackbarStore } from '@app/models/ui';

  let titleValue: string = '';
  let guestsValue: Record<string, string>;

  let talkConfigurationStoreUnsubscribe: Unsubscriber;

  $: ready = !$talkConfigurationStore.initializing;

  async function onFormSubmit() {
    await talkConfigurationStore.updateConfiguration({
      title: titleValue,
      guests: Object.values(guestsValue).map((name) => ({
        name,
      })),
    });

    snackbarStore.add({
      type: 'success',
      message: 'Text settings saved!',
    });
  }

  $: if (ready) {
    talkConfigurationStoreUnsubscribe?.();
  }

  onMount(() => {
    talkConfigurationStoreUnsubscribe = talkConfigurationStore.subscribe((initialValue) => {
      if (!initialValue.initializing) {
        titleValue = initialValue.data?.title ?? '';
        guestsValue = (initialValue.data?.guests ?? [{ name: '' }]).reduce(
          (result, { name }) => ({
            ...result,
            [uuidV4()]: name,
          }),
          {},
        );
        ready = true;
      }
    });
  });
</script>

<Container title="Talk overlay">
  <h2 class="font-medium text-xl mb-5">Text displayed</h2>
  <hr class="my-5" />
  <form on:submit|preventDefault={onFormSubmit}>
    <Textfield name="title" label="Talk title" bind:value={titleValue} />
    <MultipleTextfield label="Guests" bind:values={guestsValue} />

    <Button label="Save" type="submit" />
  </form>
</Container>
