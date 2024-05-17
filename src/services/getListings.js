import {
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  // limit
} from 'firebase/firestore';


// import { toast } from 'react-toastify';

import { db } from 'default/config/firebase';

export const getListing = async (baseName, type, uid) => {

  // console.log('getListing',baseName,  type, uid )
  const listingsRef = collection(db, baseName);

  let q;

  if (type === 'userRef') {
    // console.log('in cab', uid)
    q = query(
      listingsRef,
      where('userRef', '==', uid),
      orderBy('timestamp', 'desc'),
    );
  }
  else if (type === 'noUserRef') {
    q = query(
      listingsRef,
      where('uid', '!=', uid),
      orderBy('uid', 'desc'),

    );
  }
  else if (type === 'userEmail') {
    q = query(
      listingsRef,
      where('email', '==', uid),
      orderBy('uid', 'desc'),

    );
  }

  else if (type === 'rooms') {
    q = query(
      listingsRef,
      where('interlocutors', 'array-contains', uid),
    );
  }
  else if (type === 'travel') {
    q = query(
      listingsRef,
      where('idHotel', '==', uid),
    );
  }
  else if (type === 'usersArray') {
    q = query(
      listingsRef,
      where('uid', 'in', uid)
    );
  }
  else if (type === 'usersArrayRef') {
    q = query(
      listingsRef,
      where('userRef', 'in', uid)
    );
  }
  else {
    q = query(
      listingsRef,
    );
  }


  const querySnap = await getDocs(q);



  const getData = querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  // console.log('doc', getData)
  return getData;

}





export const deleteListing = async (nameCollection, listingId) => {
  if (window.confirm('Delete ?')) {
    await deleteDoc(doc(db, nameCollection, listingId))
  }
}



