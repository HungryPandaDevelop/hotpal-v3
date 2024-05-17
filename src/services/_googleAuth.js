// import { db } from 'default/config/firebase';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';

import { deleteAccount } from 'services/deleteAccount';
// import {
//   // doc,
//   // setDoc,
//   // getDoc,
//   // updateDoc,
//   serverTimestamp
// } from 'firebase/firestore';

import { getUserSingle } from 'servicesMysql/getUserSingle';


import { addUsers, updateUser } from 'servicesMysql/changeUsers';

// import { toast } from 'react-toastify';



export const googleAuth = async (generateId, googleValue, typeIn) => {

  try {



    const auth = getAuth();

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    updateProfile(auth.currentUser, {
      displayName: user.displayName
    });

    const docSnap = await getUserSingle(user.uid);

    // console.log('typeIn', typeIn);

    // есть ли пользователь в базе ?
    if (docSnap.length === 0) {


      // console.log('user google reg', googleValue)
      if (typeIn === 'auth') {
        deleteAccount(auth);
        return 'back-reg';
      }

      await addUsers({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        verificationId: generateId,
        ...googleValue
      });


      return ['reg', user.uid, user.displayName];

    } else {

      console.log('user google auth', googleValue)

      const dataForm = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      }

      // await updateDoc(cardsRef, dataForm);

      await updateUser({
        ...dataForm
      });

      return ['auth', user.uid, user.displayName];

    }

  }
  catch (error) {
    console.log(error)
    return false;
  }
}