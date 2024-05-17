import { connect } from 'react-redux';
import Rooms from 'pages/chat/Rooms';
import MessagesPopup from "blocks/controls-panel/chat/Messages";

const Chat = ({ uid, panelChatRoom, roomUserInfo }) => {

  return (
    <>
      {panelChatRoom === 0 ? (
        <Rooms
          uid={uid}
          type='popup'
        />
      ) :
        (
          <MessagesPopup
            uid={uid}
            roomId={panelChatRoom}
            currentUser={roomUserInfo}
          />
        )}

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    panelChatRoom: state.globalState.panelChatRoom,
    roomUserInfo: state.globalState.roomUserInfo,
  }
}

export default connect(mapStateToProps)(Chat);