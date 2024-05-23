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
  type,
  ActionFn
}) => {

  const invite = room.connectUsersUid[0] === uid ? room.connectUsersUid[1] : room.connectUsersUid[0];

  const [roomUserInfo, setRoomUserInfo] = useState({});
  const [countUnread, setCountUnread] = useState(0);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getUserSingle(invite).then(res => {

      setLoading(false);
      setRoomUserInfo(res);
      console.log('res user', res);
      if (type !== 'popup') {
        ActionFn('SET_CURRENT_ROOM', { roomUserInfo: res });
      }

    });

    let count = 0;

    room.messages.map(undread => {
      if (!undread.read && undread.uid !== uid) {
        count++;
      }
    });

    setCountUnread(count);

  }, [roomUrl]);

  useEffect(() => {

    if (roomUrl === room.id) {


      if (type !== 'popup') {
        ActionFn('SET_CURRENT_ROOM', { roomUserInfo: roomUserInfo });
      }
    };



  }, [roomUrl]);



  let setLastMessage = () => {
    let myMessages = room.messages && room.messages;
    let lastMessage = '';


    if (myMessages.length > 0) {
      let tempLastMessage = myMessages[myMessages.length - 1];
      lastMessage = (tempLastMessage.message.length !== 0) ? tempLastMessage.message : tempLastMessage.invite.type

    }


    return lastMessage;
  }

  if (loading) { return '' }

  if (!roomUserInfo) { return false; }

  return (
    <div
      className={`rooms-item ${roomUrl === room._id ? 'active' : ''}`}
    >
      <LinkWrap
        path={`/cabinet/chat/${room._id}`}
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
        onClick={() => { onDeleteRoom(room._id) }}
      ></div>
    </div>
  )
}



export default connect(null,
  {
    ActionFn
  })(RoomItem);