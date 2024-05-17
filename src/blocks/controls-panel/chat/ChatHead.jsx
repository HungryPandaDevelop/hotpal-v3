import { userImg } from 'pages/users/catalog/UsersItem/userImg';

import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';
import { Link } from 'react-router-dom';
import ActionFn from 'store/actions';
import { connect } from 'react-redux';

const ChatHead = ({
  currentUser,
  roomId,
  // setChoiseRoom,
  ActionFn
}) => {
  return (
    <div className="chat-popup-header">
      <div
        className="link-back"
        onClick={() => { ActionFn('SET_CURRENT_ROOM', { panelChatRoom: 0 }); }}
      ><i></i></div>
      <div
        className="chat-popup-face img-use-bg" style={userImg(currentUser)}></div>
      <div className="chat-popup-info">
        <div>
          <div className="chat-popup-name">{currentUser.name}</div>
          {/* <div className="chat-popup-online">{getCurrentTime(currentUser)}</div> */}
        </div>
        <Link to={`/cabinet/chat/${roomId}`} className="btn-full"></Link>
      </div>
    </div>
  )
}


export default connect(null, { ActionFn })(ChatHead);