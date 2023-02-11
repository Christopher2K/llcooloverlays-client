import { writable } from 'svelte/store';

export type SnackbarType = 'success' | 'error';
export type SnackbarConfiguration = {
  type: SnackbarType;
  message: string;
};

function createSnackbarStore() {
  const { subscribe, set } = writable<SnackbarConfiguration | null>(null);

  return {
    subscribe,
    add: (config: SnackbarConfiguration) => set(config),
    remove: () => set(null),
  };
}

export const snackbarStore = createSnackbarStore();
