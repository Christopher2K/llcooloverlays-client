import type Pocketbase from 'pocketbase';
import { derived, type Readable } from 'svelte/store';

import type { TalkConfiguration } from './talk';
import type { ComputerConfiguration } from './computer';

import { authenticatedPbStore } from './pocketbase';
import { settingsStore, type Settings } from './settings';

export const COLLECTION_NAME = 'configuration';

export type Configuration = {
  computer: ComputerConfiguration;
  talk: TalkConfiguration;
};

export const configurationStore = derived<
  [Readable<Pocketbase | null>, Readable<Partial<Settings> | null | undefined>],
  Configuration | null
>(
  [authenticatedPbStore, settingsStore],
  ([pb, settings], set) => {
    if (!pb || !settings?.pocketbaseConfigurationId) {
      set(null);
      return;
    }


    pb.collection(COLLECTION_NAME)
      .getOne(settings.pocketbaseConfigurationId)
      .then((data) => set(data.content as Configuration))
      .catch(console.error);

    pb.collection(COLLECTION_NAME)
      .subscribe(settings.pocketbaseConfigurationId, (data) => {
        set(data.record.content as Configuration);
      })
      .catch(console.error);

    return () => pb.collection(COLLECTION_NAME).unsubscribe(settings.pocketbaseConfigurationId);
  },
  null,
);
