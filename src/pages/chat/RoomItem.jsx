import ActionFn from 'store/actions';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';


import { userImg } from 'pages/users/catalog/UsersItem/userImg';
import { getUserSingle } from 'servicesMysql/getUserSingle';

import { Link } from "react-router-dom";


const RoomItem = ({
  room,
  roomUrl,
  uid,
  onChoiseRoom,
  onDeleteRoom,
  ActionFn
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

  useEffect(() => {
    if (roomUrl === room._id) {
      getUserSingle(userId).then(res => {
        ActionFn('SET_GLOBAL',
          {
            currentUserInRoom: res,
            currentRoom: room
          }
        )
      });
    };
  }, [roomUrl]);



  // let setLastMessage = () => {
  //   let myMessages = room.messages && room.messages;
  //   let lastMessage = '';


  //   if (myMessages.length > 0) {
  //     let tempLastMessage = myMessages[myMessages.length - 1];
  //     lastMessage = (tempLastMessage.message.length !== 0) ? tempLastMessage.message : tempLastMessage.invite.type

  //   }
  //   return lastMessage;
  // }

  if (loadingUser) { return '' }

  return (
    <Link to={`/cabinet/chat/${room._id}`}
      className={`rooms-item ${roomUrl === room._id ? 'active' : ''}`}
      onClick={() => { onChoiseRoom(room) }}
    >
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
    </Link>
  )
}



export default connect(null,
  {
    ActionFn
  })(RoomItem);