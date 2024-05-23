
export const calcUnreadMessage = (rooms, uid) => {

  let count = 0;
  rooms.map(room => {
    room.messages.map(message => {
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
    if (!list.read && list.ownId !== uid) {
      count++;
    }
  })
  return count;
}