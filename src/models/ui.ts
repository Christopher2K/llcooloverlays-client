import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export type SnackbarType = 'success' | 'error';
export type SnackbarConfiguration = {
  id: string;
  type: SnackbarType;
  message: string;
};

function createSnackbarStore() {
  const { subscribe, update } = writable<SnackbarConfiguration[]>([]);

  return {
    subscribe,
    add: (config: Omit<SnackbarConfiguration, 'id'>) => update((list) => addSnackbar(config, list)),
    remove: (id: string) => update((list) => removeSnackbar(id, list)),
  };
}

function addSnackbar(
  config: Omit<SnackbarConfiguration, 'id'>,
  list: SnackbarConfiguration[],
): SnackbarConfiguration[] {
  const snackbar = {
    id: uuidv4(),
    ...config,
  };

  return [...list, snackbar];
}

function removeSnackbar(
  snackbarId: string,
  list: SnackbarConfiguration[],
): SnackbarConfiguration[] {
  return list.filter(({ id }) => id !== snackbarId);
}

export const snackbarStore = createSnackbarStore();
