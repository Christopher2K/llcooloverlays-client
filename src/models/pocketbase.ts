import type Pocketbase from 'pocketbase';
import { writable } from 'svelte/store';

export const pbStore = writable<null | Pocketbase>(null)
