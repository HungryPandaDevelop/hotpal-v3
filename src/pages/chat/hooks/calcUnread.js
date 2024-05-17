
export const calcUnreadMessage = (rooms, uid) => {

  let count = 0;
  rooms.map(room => {
    room.data.messages.map(message => {
      if (!message.read && message.uid !== uid) {
        count++;
      }
    })
  })
  return count;
}

export const calcUnread = (listing, uid) => {
 
  let count = 0;
  listing && listing.map(list => {
    // console.log('uid', list)
    if (!list.data.read && list.data.interlocutors[0] !== uid) {
      count++;
    }
  })
  return count;
}