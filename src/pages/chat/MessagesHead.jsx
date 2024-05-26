import { connect } from 'react-redux';
import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';
import { userImg } from 'pages/users/catalog/UsersItem/userImg';

const MessagesHead = ({ currentUserInRoom }) => {
  if (!currentUserInRoom) { return false }

  return (
    <div className='message-head rooms-item'>
      <div
        className="rooms-item-face img-use-bg" style={userImg(currentUserInRoom)}>
      </div>
      <div className="rooms-item-info">
        <div className="rooms-item-name">
          {currentUserInRoom.name}
        </div>
        <span className="rooms-item-date">
          {getCurrentTime(currentUserInRoom)}
        </span>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => {

  return {
    currentUserInRoom: state.globalState.currentUserInRoom,
  }
}


export default connect(mapStateToProps)(MessagesHead);