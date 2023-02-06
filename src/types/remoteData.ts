export type RemoteData<T> = {
  initializing: boolean;
  updating: boolean;
  saving: boolean;
  data?: T | null;
};
