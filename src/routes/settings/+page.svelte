<script lang="ts">
  import { onMount } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  import Container from '@app/components/Container.svelte';
  import Button from '@app/components/Button.svelte';
  import Textfield from '@app/components/Textfield.svelte';
  import SecureTextfield from '@app/components/SecureTextfield.svelte';
  import { type Settings, settingsStore, setSettings } from '@app/models/settings';
  import { snackbarStore } from '@app/models/ui';
  import { authenticatedPbStore } from '@app/models/pocketbase';

  let pocketbaseUrl: string;
  let pocketbaseUsername: string;
  let pocketbasePassword: string;
  let pocketbaseConfigurationId: string;

  let settingsStoreUnsubscribe: Unsubscriber;

  $: ready = $settingsStore !== undefined;
  $: connectedToPb = $authenticatedPbStore != null;
  $: connectionToPbStatusText = connectedToPb ? 'Connected' : 'Disconnected';

  async function onSubmit() {
    const newSettings: Settings = {
      pocketbaseUrl,
      pocketbasePassword,
      pocketbaseUsername,
      pocketbaseConfigurationId,
    };

    await setSettings(newSettings);

    snackbarStore.add({
      type: 'success',
      message: 'Settings saved!',
    });
  }

  $: if (ready) {
    settingsStoreUnsubscribe?.();
  }

  onMount(() => {
    settingsStoreUnsubscribe = settingsStore.subscribe((initialSettingsValue) => {
      if (initialSettingsValue !== undefined) {
        pocketbaseConfigurationId = initialSettingsValue?.pocketbaseConfigurationId ?? '';
        pocketbaseUsername = initialSettingsValue?.pocketbaseUsername ?? '';
        pocketbasePassword = initialSettingsValue?.pocketbasePassword ?? '';
        pocketbaseUrl = initialSettingsValue?.pocketbaseUrl ?? '';
        ready = true;
      }
    });
  });
</script>

{#if ready}
  <Container class="" title="Settings">
    <div class="flex flex-row justify-start items-center gap-2 mb-5">
      <p>
        <span class="font-bold underline">Connection status</span>
        {connectionToPbStatusText}
      </p>
      <div
        class="w-5 h-5 rounded-full"
        class:bg-red-500={!connectedToPb}
        class:bg-green-500={connectedToPb}
      />
    </div>
    <form on:submit|preventDefault={onSubmit}>
      <Textfield name="pocketbaseUrl" bind:value={pocketbaseUrl} label="Pocketbase URL" />
      <Textfield
        name="pocketbaseUsername"
        bind:value={pocketbaseUsername}
        label="Pocketbase email"
      />
      <SecureTextfield
        name="pocketbasePassword"
        bind:value={pocketbasePassword}
        label="Pocketbase password"
      />
      <Textfield
        name="configurationId"
        bind:value={pocketbaseConfigurationId}
        label="Configuration ID"
      />
      <Button type="submit" label="Update" />
    </form>
  </Container>
{/if}
