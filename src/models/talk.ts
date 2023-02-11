import { writable } from 'svelte/store';

import { db, get, ref, set } from '@app/firebase';
import type { RemoteData } from '@app/types/remoteData';

const TALK_DATABASE_KEY = 'configuration/talk';

export type TalkConfiguration = {
  title: string;
  guests: {
    name: string;
  }[];
};

export type TalkConfigurationStore = RemoteData<TalkConfiguration>;

function cleanData(configuration: TalkConfiguration): TalkConfiguration {
  return {
    ...configuration,
    guests: configuration.guests.filter(({ name }) => name.length > 0),
  };
}

function createTalkConfigurationStore() {
  const { subscribe, update } = writable<TalkConfigurationStore>({
    initializing: true,
    updating: false,
    saving: false,
    data: undefined,
  });

  const confRef = ref(db, TALK_DATABASE_KEY);
  get(confRef).then((snapshot) => {
    const remoteVal: TalkConfiguration | null = snapshot.val();
    update((state) => ({
      ...state,
      initializing: false,
      updating: false,
      data: remoteVal,
    }));
  });

  return {
    subscribe,
    updateConfiguration: async (config: TalkConfiguration) => {
      const cleanedData = cleanData(config);

      update((state) => ({
        ...state,
        data: cleanedData,
        saving: true,
      }));

      const confRef = ref(db, TALK_DATABASE_KEY);
      await set(confRef, cleanedData);

      update((state) => ({
        ...state,
        saving: false,
      }));
    },
  };
}

export let talkConfigurationStore: ReturnType<typeof createTalkConfigurationStore>;

export function initializeTalkConfigurationStore() {
  talkConfigurationStore = createTalkConfigurationStore();
}
