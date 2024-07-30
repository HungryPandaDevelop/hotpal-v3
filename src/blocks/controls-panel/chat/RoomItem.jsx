// import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';


import { userImg } from 'pages/users/catalog/UsersItem/userImg';
import { getUserSingle } from 'servicesMysql/getUserSingle';


const RoomItem = ({
  room,
  uid,
  onChoiseRoom,
  onDeleteRoom,
}) => {

  const userId = room.connectUsersUid.filter(id => id !== uid)[0];

  const [roomUserInfo, setRoomUserInfo] = useState({});

  const [loadingUser, setLoadingUser] = useState(false);

  const calcUnreadCount = () => {
    let count = 0;
    room.messages.forEach(undread => {
      if (!undread.read && undread.uid !== uid) {
        count++;
      }
    });

    return (count);
  }

  useEffect(() => {
    setLoadingUser(true);

    getUserSingle(userId).then(res => {
      setLoadingUser(false);
      setRoomUserInfo(res);
    });

  }, []);





  // let setLastMessage = () => {
  //   let myMessages = room.messages && room.messages;
  //   let lastMessage = '';


  //   if (myMessages.length > 0) {
  //     let tempLastMessage = myMessages[myMessages.length - 1];
  //     lastMessage = (tempLastMessage.message.length !== 0) ? tempLastMessage.message : tempLastMessage.invite.type

  //   }
  //   return lastMessage;
  // }


  const roomContent = () => {
    return (<>
      <div
        className="rooms-item-face img-use-bg"
        style={userImg(roomUserInfo)}
      >
        {calcUnreadCount() !== 0 && (<div className="rooms-item-count">{calcUnreadCount()}</div>)}
      </div>
      <div className="rooms-item-info">
        <div className="rooms-item-name">
          {roomUserInfo.name}
        </div>
        <div className="rooms-item-message">
          {/* <span dangerouslySetInnerHTML={{ __html: setLastMessage() }}></span> */}
        </div>
        <span className="rooms-item-date">
          {getCurrentTime(roomUserInfo)}
        </span>
      </div>
      <div
        className="btn-trash"
        onClick={() => { onDeleteRoom(room._id) }}
      ></div>
    </>)
  }



  if (loadingUser) { return ''; }


  return (
    <div
      className="rooms-item"
      onClick={() => { onChoiseRoom(room._id, roomUserInfo) }}
    >
      {roomContent()}
    </div>
  );


}



export default RoomItem;