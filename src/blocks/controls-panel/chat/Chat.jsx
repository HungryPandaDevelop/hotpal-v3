import { connect } from 'react-redux';
import Rooms from 'pages/chat/Rooms';
import MessagesPopup from "blocks/controls-panel/chat/Messages";

const Chat = ({ uid, currentRoom, currentUserInRoom }) => {

  return (
    <>
      {currentRoom === 0 ? (
        <Rooms
          uid={uid}
          type='popup'
        />
      ) :
        (
          <MessagesPopup
            uid={uid}
            roomId={currentRoom}
            currentUser={currentUserInRoom}
          />
        )}

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    currentRoom: state.globalState.currentRoom,
    currentUserInRoom: state.globalState.currentUserInRoom,
  }
}

export default connect(mapStateToProps)(Chat);