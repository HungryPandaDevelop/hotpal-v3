import { useState, useEffect } from 'react';
import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';
// import { updateRead } from 'services/chatEvents';


import { userImg } from 'pages/users/catalog/UsersItem/userImg';

// import { getSingleListing } from 'services/getSingleListing';
import { getUserSingle } from 'servicesMysql/getUserSingle';
import LinkWrap from 'pages/chat/RoomItem/LinkWrap';

import ActionFn from 'store/actions';
import { connect } from 'react-redux';

const RoomItem = ({
  room,
  roomUrl,
  uid,
  onDeleteRoom,
  // setChoiseRoom,
  // setCurrentUser,
  type,
  ActionFn
}) => {

  const invite = room.data.connectUsersUid[0] === uid ? room.data.connectUsersUid[1] : room.data.connectUsersUid[0];

  const [roomUserInfo, setRoomUserInfo] = useState({});
  const [countUnread, setCountUnread] = useState(0);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getUserSingle(invite).then(res => {

      setLoading(false);
      setRoomUserInfo(res);

      if (type !== 'popup') {

        ActionFn('SET_CURRENT_ROOM', { roomUserInfo: res });
      }

    });

    let count = 0;

    room.data.messages.map(undread => {
      if (!undread.read && undread.uid !== uid) {
        count++;
      }
    });

    setCountUnread(count);

  }, [room]);

  useEffect(() => {

    if (roomUrl === room.id) {

      // updateRead(roomUrl, room, uid);

      if (type !== 'popup') {
        ActionFn('SET_CURRENT_ROOM', { roomUserInfo: roomUserInfo });
      }
    };



  }, [roomUrl]);



  // console.log(room.data.messages)

  let setLastMessage = () => {
    let myMessages = room.data.messages && room.data.messages;
    let lastMessage = '';

    // if (room.data.messages) {
    // myMessages = room.data.messages.filter(el => el.uid !== uid);
    // }
    // console.log('myMessages', myMessages)
    if (myMessages.length > 0) {
      let tempLastMessage = myMessages[myMessages.length - 1];
      lastMessage = (tempLastMessage.message.length !== 0) ? tempLastMessage.message : tempLastMessage.invite.message
      // console.log('lastMessage', myMessages[myMessages.length - 1])
    }


    return lastMessage;
  }

  if (loading) { return '' }

  if (!roomUserInfo) { return false; }

  return (
    <div
      className={`rooms-item ${roomUrl === room.id ? 'active' : ''}`}
    >
      <LinkWrap
        path={`/cabinet/chat/${room.id}`}
        type={type}
        room={room}
        roomUserInfo={roomUserInfo}
        // setChoiseRoom={setChoiseRoom}
        // setCurrentUser={setCurrentUser}
        ActionFn={ActionFn}
      >

        <>
          <div
            className="rooms-item-face img-use-bg" style={userImg(roomUserInfo)}>
            {countUnread !== 0 && (<div className="rooms-item-count">{countUnread}</div>)}
          </div>
          <div className="rooms-item-info">
            <div className="rooms-item-name">
              {roomUserInfo.name}
            </div>
            <div className="rooms-item-message">
              <span dangerouslySetInnerHTML={{ __html: setLastMessage() }}></span>
            </div>
            <span className="rooms-item-date">
              {getCurrentTime(roomUserInfo)}
            </span>

          </div></>
      </LinkWrap>



      <div
        className="btn-trash"
        onClick={() => { onDeleteRoom(room.id) }}
      ></div>
    </div>
  )
}



export default connect(null,
  {
    ActionFn
  })(RoomItem);