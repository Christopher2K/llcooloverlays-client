import { initializeFirebase } from '@app/firebase';
import { initializeComputerConfigurationStore } from '@app/models/computer';
import { initializeTalkConfigurationStore } from '@app/models/talk';

initializeFirebase();

console.log('Initialize - computer config store');
initializeComputerConfigurationStore();

console.log('Initialize - talk config store');
initializeTalkConfigurationStore();
