import { db } from 'default/config/firebase';

import {
  // collection,
  // query,
  // onSnapshot,
  serverTimestamp,
  // addDoc,
  // getDocs,
  // getDoc,
  // updateDoc,
  doc,
  // where,
  setDoc,
  // orderBy
} from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';


export const addCardsDefault = async (dataForm, baseCards,) => {

  const generateId = uuidv4();

  try {
    // console.log('dataForm', dataForm)
    dataForm['timestamp'] = serverTimestamp();
    dataForm.id = generateId;

    await setDoc(doc(db, baseCards, generateId), dataForm);
    // await addDoc(collection(db, baseCards), dataForm);

    // toast.success('Элемент добавален');
    return generateId;

  } catch (error) {
    toast.error('Невозможно добавить')
    console.log(error)
  }
}
