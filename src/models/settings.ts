import { readable } from 'svelte/store';

import { persistentStore } from '@app/persistentStore';

const STORE_KEY = 'settings';

export type Settings = {
  pocketbaseUsername: string;
  pocketbasePassword: string;
  pocketbaseUrl: string;
  pocketbaseConfigurationId: string;
};

export const settingsStore = readable<Partial<Settings> | null | undefined>(undefined, (set) => {
  persistentStore.get<Settings>(STORE_KEY).then(set);
  persistentStore.onKeyChange<Settings>(STORE_KEY, set);
  return undefined
});

export async function setSettings(settings: Settings) {
  persistentStore.set(STORE_KEY, settings);
}
