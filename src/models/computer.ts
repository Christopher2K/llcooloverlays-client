import { writable } from 'svelte/store';

import { db, get, ref, set } from '@app/firebase';
import type { RemoteData } from '@app/types/remoteData';

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

  // Get remote configuration and update the state with it
  const confRef = ref(db, COMPUTER_DATABASE_KEY);
  get(confRef).then((snapshot) => {
    const remoteVal: ComputerConfiguration | null = snapshot.val();
    update((state) => ({
      ...state,
      initializing: false,
      updating: false,
      data: remoteVal,
    }));
  });

  return {
    subscribe,
    updateConfiguration: async (config: ComputerConfiguration) => {
      // TODO: This should be using web API instead of direct firebase
      // The rational being: there's not easy wait to restrict firebase database write access
      // for anonymous users
      update((state) => ({
        ...state,
        data: config,
        saving: true,
      }));

      // Firebase update
      const confRef = ref(db, COMPUTER_DATABASE_KEY);
      await set(confRef, config);

      update((state) => ({
        ...state,
        saving: false,
      }));
    },
  };
}

export let computerConfigurationStore: ReturnType<typeof createComputerConfigurationStore>;

export function initializeComputerConfigurationStore() {
  computerConfigurationStore = createComputerConfigurationStore();
}
