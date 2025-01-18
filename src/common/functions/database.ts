import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { DATABASES } from '@src/common/types/enums/databases';
import type { Form } from '@src/common/types/interfaces/forms';
import type { Space } from '@src/common/types/interfaces/space';

const initialize = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCmm0cEwf3nL6HEJ0FNHrSOeukkOmpNMPU',
    authDomain: 'propellorform.firebaseapp.com',
    projectId: 'propellorform',
    storageBucket: 'propellorform.appspot.com',
    messagingSenderId: '343198271114',
    appId: '1:343198271114:web:c357f10f6bb6d2fe320f73',
    measurementId: 'G-TQJCPJ08ST',
  };

  const app = initializeApp(firebaseConfig);

  return getFirestore(app);
};

export const getData = async (spaceId: string, formId: string) => {
  const database = initialize();

  const spaceRef = doc(database, DATABASES.SPACES, spaceId);
  const spaceSnap = await getDoc(spaceRef);

  const spaceData = spaceSnap.data() as Space;

  if (
    !spaceData ||
    !spaceData.forms.includes(formId) ||
    (spaceData.allowedDomains.length > 0 && !spaceData.allowedDomains.includes(window.location.host))
  ) {
    console.error('Unauthorized access to form data');

    return undefined;
  }

  const formRef = doc(database, DATABASES.FORMS, formId);
  const formSnap = await getDoc(formRef);

  const formData = formSnap.data() as Form;

  if (!formData) {
    console.error('Unauthorized access to form data');

    return undefined;
  }

  return formData;
};
