import Pocketbase from 'pocketbase';
import { derived } from 'svelte/store';

import { settingsStore } from './settings';
import { snackbarStore } from './ui';

export const pbStore = derived(
  settingsStore,
  (settings) => {
    if (!settings?.pocketbaseUrl) return null;
    const pb = new Pocketbase(settings.pocketbaseUrl);
    return pb;
  },
  null,
);

export const authenticatedPbStore = derived(
  [settingsStore, pbStore],
  ([settings, pb], set) => {
    if (!settings?.pocketbaseUsername || !settings?.pocketbasePassword || pb == null) {
      set(pb);
    } else {
      pb.admins
        .authWithPassword(settings.pocketbaseUsername, settings.pocketbasePassword)
        .then(() => {
          console.log('Pocketbase initialized');
          set(pb);
        })
        .catch((e) => {
          if (!e.message.includes('autocancelled')) {
            console.log(e.message);
            set(null);
            snackbarStore.add({ type: 'error', message: "Can't connect to PB" });
          }
        });
    }
  },
  null as Pocketbase | null,
);
