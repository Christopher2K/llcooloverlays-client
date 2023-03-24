import type Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

import type { TalkConfiguration } from './talk';
import type { ComputerConfiguration } from './computer';

const COLLECTION_NAME = 'configuration';

export type Configuration = {
  computer: ComputerConfiguration;
  talk: TalkConfiguration;
};

export let configurationStore: ReturnType<typeof createConfigurationStore>

function createConfigurationStore({ pb, recordId }: { pb: Pocketbase; recordId: string }) {
  const { subscribe, set } = writable<Configuration | null>(null);

  pb.collection(COLLECTION_NAME)
    .getOne(recordId)
    .then((record) => {
      set(record.content);
    });

  pb.collection(COLLECTION_NAME).subscribe(recordId, ({ record }) => {
    set(record.content);
  });

  return {
    subscribe,
    updateTalk: () => {},
    updateComputer: () => {},
  };
}
