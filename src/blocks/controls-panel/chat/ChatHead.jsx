import { userImg } from 'pages/users/catalog/UsersItem/userImg';

import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';
import { Link } from 'react-router-dom';


const ChatHead = ({
  currentUser,
  roomId,
  setCurrentRoomPanel
}) => {
  return (
    <div className="chat-popup-header">
      <div
        className="link-back"
        onClick={() => { setCurrentRoomPanel(null); }}
      ><i></i></div>
      <div
        className="chat-popup-face img-use-bg" style={userImg(currentUser)}></div>
      <div className="chat-popup-info">
        <div>
          <div className="chat-popup-name">{currentUser.name}</div>
          <div className="chat-popup-online">{getCurrentTime(currentUser)}</div>
        </div>
        <Link to={`/cabinet/chat/${roomId}`} className="btn-full"></Link>
      </div>
    </div>
  )
}


export default ChatHead;