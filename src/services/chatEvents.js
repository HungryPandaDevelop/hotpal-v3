import { toast } from 'react-toastify';
// import { Timestamp } from '@google-cloud/firestore';

// import { updateChat } from 'servicesMysql/changeChats';
import { updateUser } from 'servicesMysql/changeUsers';
import { timestampCustomDayTime } from 'services/timestampCustom';

import {
  collection,
  query,
  onSnapshot,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  where,
  setDoc,

} from 'firebase/firestore';

import { db } from 'default/config/firebase';

import { v4 as uuidv4 } from 'uuid';

export const createRoom = async (MyUid, heUid) => {
  const sendData = {
    'connectUsersUid': [MyUid, heUid],
    'messages': [],
  };



  const resp = await getMyRooms(MyUid);

  let roomsAvailable = false;

  resp.forEach(room => {
    if (room.connectUsersUid[1] === heUid) {
      // console.log('1')
      roomsAvailable = room.id
    }
    if (room.connectUsersUid[0] === heUid) {
      // console.log('2')
      roomsAvailable = room.id
    }
  });

  const generateId = uuidv4();

  try {
    if (roomsAvailable) {
      return roomsAvailable;

    } else {
      // console.log('create')
      await setDoc(doc(db, 'rooms', generateId), { ...sendData, id: generateId });
      // toast.success('Комната добавлена');
      return generateId;
    }


  } catch (error) {
    console.error(error);
    toast.error(error)
  }

}

export const getMyRooms = async (uid) => {

  const listRef = collection(db, 'rooms');

  const q = query(
    listRef,
    where('connectUsersUid', 'array-contains', uid)
  );

  const querySnap = await getDocs(q);

  const list = querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // console.log('getMyRooms', list)

  return list;
}
let subscribeWatch;

const watchListing = (q, updateSnap) => {
  let listing = [];

  subscribeWatch = onSnapshot(q, (snapshot) => {

    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        listing = [...listing, { id: change.doc.id, data: change.doc.data() }]
      }
      if (change.type === "modified") {
        listing = listing.map((item) => {
          if (item.id === change.doc.id) {
            return { id: change.doc.id, data: change.doc.data() }
          }
          else {
            return item;
          }
        });
      }
      if (change.type === "removed") {
        listing = listing.filter(item => item.id !== change.doc.id)
      }

      updateSnap(listing);
    });
  });
}

export const stopWatch = () => {
  subscribeWatch();
}

export const getMyRoomsOnline = async (setRoomOut, uid, account) => {

  const listRef = collection(db, 'rooms');

  const q = query(
    listRef,
    where('connectUsersUid', 'array-contains', uid)
  );

  const updateSnap = (listing) => {
    setRoomOut(listing)
    updateUser({ uid: listing.uid, chats: listing.length });
  }

  watchListing(q, updateSnap);

};

export const getMyLikesOnline = async (setElementOut, uid, account) => {

  const listRef = collection(db, 'likes');

  const q = query(
    listRef,
    where('interlocutors', 'array-contains', uid)
  );

  const updateSnap = (listing) => {
    // console.log('listing',listing)
    setElementOut(listing);
    updateUser({ uid: listing.uid, likes: listing.length });
  }

  watchListing(q, updateSnap);

};




export const getMyRoomMessages = (setMessages, roomId) => {

  const listRef = collection(db, 'rooms');

  const q = query(
    listRef,
    where('id', '==', roomId)
  );

  const updateSnap = (listing) => {
    listing[0] && setMessages(listing[0].data.messages);
  }

  watchListing(q, updateSnap);
}




export const sendMessage = async (roomId, uid, message) => {

  const getDocRoomInfo = await getDoc(doc(db, 'rooms', roomId));
  const getRoomInfo = getDocRoomInfo.data();


  // console.log('message', message)

  getRoomInfo.messages.push({
    uid: uid,
    read: false,
    message: '',
    invite: '',
    fileMessage: [],
    timestamp: new Date(),
    ...message,
  });
  // console.log('message', getRoomInfo)
  try {

    await setDoc(doc(db, 'rooms', roomId), getRoomInfo);
    // console.log('id_chat', roomId, 'messages', getRoomInfo.messages.length, 'lastAdd', timestampCustom())

    // updateChat({ id_chat: roomId, messages: getRoomInfo.messages.length, dateLastAddMessage: timestampCustomDayTime() });




    // toast.success('Сообщение отправлено');

  } catch (error) {
    console.error(error);
    toast.error(error)
  }
}

export const updateRead = async (roomId, room, uid) => {
  // console.log('room', room)
  const changeRead = room.data.messages.map(message => {
    if (message.uid !== uid) {
      message.read = true
    }
    return message;
  });

  room.data.messages = changeRead
  // console.log(room)
  await updateDoc(doc(db, 'rooms', roomId), room.data);
}

export const updateInvite = async (roomId, status, index) => {

  const getDocRoomInfo = await getDoc(doc(db, 'rooms', roomId));
  const getRoomInfo = getDocRoomInfo.data();
  // console.log(getRoomInfo, status, index)
  getRoomInfo.messages[index].invite.status = status;

  try {
    await setDoc(doc(db, 'rooms', roomId), getRoomInfo);
    // toast.success('Сообщение отправлено');

  } catch (error) {
    console.error(error);
    toast.error(error)
  }

}