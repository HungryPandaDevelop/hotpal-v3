import { db } from 'default/config/firebase';

import {
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';


import { toast } from 'react-toastify';



export const saveListing = async (dataForm, cardsId, baseName, notShow) => {
    // console.log('dataForm', dataForm)
    try {
      
      const cardsRef = doc(db, baseName, cardsId);
      dataForm.timestamp = serverTimestamp();
      // console.log(dataForm);
      await updateDoc(cardsRef, dataForm);
        if(notShow){

        }else{
          // toast.success('Данные обновлены')
        }


      return true;
    } catch (error) {

      toast.error('Невозможно обновить данные')
      // console.log('ERR', dataForm, cardsId, baseName, error)

      return false;
    }
  }