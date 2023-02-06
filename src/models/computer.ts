import { writable } from 'svelte/store';

import { db, get, ref, set } from '@app/firebase';
import { persistentStore } from '@app/persistentStore';
import type { RemoteData } from '@app/types/remoteData';

const STORE_KEY = 'computer';
const COMPUTER_DATABASE_KEY = 'configuration/computer';

export type ComputerConfiguration = {
  title: string;
  informations: string;
};

export type ComputerConfigurationStore = RemoteData<ComputerConfiguration>;

function createComputerConfigurationStore() {
  const { subscribe, update } = writable<ComputerConfigurationStore>({
    initializing: true,
    updating: false,
    saving: false,
    data: undefined,
  });

  persistentStore.get<ComputerConfiguration>(STORE_KEY).then(async (configuration) => {
    // Get stored configuration
    update((state) => ({
      ...state,
      initializing: false,
      updating: true,
      data: configuration,
    }));

    // Get remote configuration and override the one we got from store (in app and in store)
    const confRef = ref(db, COMPUTER_DATABASE_KEY);
    const snapshot = await get(confRef);
    const remoteVal: ComputerConfiguration = snapshot.val();

    update((state) => ({
      ...state,
      initializing: false,
      updating: false,
      data: remoteVal,
    }));
    await persistentStore.set(STORE_KEY, remoteVal);

    // Update Firebase each time the persistent state is updated
    persistentStore.onKeyChange<ComputerConfiguration>(STORE_KEY, (configuration) => {
      update((state) => ({ ...state, initializing: false, saving: true, data: configuration }));

      const confRef = ref(db, COMPUTER_DATABASE_KEY);
      set(confRef, configuration)
        .then(() => {
          update((state) => ({ ...state, saving: false }));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });

  return {
    subscribe,
  };
}

export let computerConfigurationStore: ReturnType<typeof createComputerConfigurationStore>;

export function initializeComputerConfigurationStore() {
  computerConfigurationStore = createComputerConfigurationStore();
}

export async function setComputerConfiguration(configuration: ComputerConfiguration) {
  persistentStore.set(STORE_KEY, configuration);
}
