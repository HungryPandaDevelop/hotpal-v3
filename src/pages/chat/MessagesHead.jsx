import { connect } from 'react-redux';
import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';
import { userImg } from 'pages/users/catalog/UsersItem/userImg';

const MessagesHead = ({ roomUserInfo }) => {

  if (!roomUserInfo.name) {
    return false
  }

  return (
    <div className='message-head rooms-item'>
      <div
        className="rooms-item-face img-use-bg" style={userImg(roomUserInfo)}>
      </div>
      <div className="rooms-item-info">
        <div className="rooms-item-name">
          {roomUserInfo.name}
        </div>
        <span className="rooms-item-date">
          {getCurrentTime(roomUserInfo)}
        </span>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => {

  return {
    roomUserInfo: state.globalState.roomUserInfo,
  }
}


export default connect(mapStateToProps)(MessagesHead);