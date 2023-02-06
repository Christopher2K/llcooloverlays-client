import { initializeFirebase } from '@app/firebase';
import { initializeComputerConfigurationStore } from '@app/models/computer';

initializeFirebase();

console.log('Initialize - computer config store');
initializeComputerConfigurationStore();
