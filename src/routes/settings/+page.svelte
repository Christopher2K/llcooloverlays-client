<script lang="ts">
  import { onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import Container from '@app/components/Container.svelte';
  import Button from '@app/components/Button.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import SecureTextfield from '@app/components/SecureTextfield.svelte';
  import { type Settings, settingsStore, setSettings } from '@app/models/settings';

  let apiUrlValue: string;
  let apiSecretKeyValue: string;

  let settingsStoreUnsubscribe: Unsubscriber;

  $: ready = $settingsStore !== undefined;

  async function onSubmit() {
    const newSettings: Settings = {
      apiUrl: apiUrlValue,
      apiSecretKey: apiSecretKeyValue,
    };

    // TODO: In app notifications system?
    await setSettings(newSettings);
  }

  $: if (ready) {
    settingsStoreUnsubscribe?.();
  }

  onMount(() => {
    settingsStoreUnsubscribe = settingsStore.subscribe((initialSettingsValue) => {
      if (initialSettingsValue !== undefined) {
        apiUrlValue = initialSettingsValue?.apiUrl ?? '';
        apiSecretKeyValue = initialSettingsValue?.apiSecretKey ?? '';
        ready = true;
      }
    });
  });
</script>

{#if ready}
  <Container class="" title="Settings">
    <form on:submit|preventDefault={onSubmit}>
      <Textfield name="apiUrl" bind:value={apiUrlValue} label="API URL" />
      <SecureTextfield name="apiSecretKey" bind:value={apiSecretKeyValue} label="API Secret Key" />
      <Button type="submit" label="Update" />
    </form>
  </Container>
{/if}
