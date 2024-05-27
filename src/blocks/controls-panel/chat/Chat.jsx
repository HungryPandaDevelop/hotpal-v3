import { connect } from 'react-redux';
import Rooms from 'blocks/controls-panel/chat/Rooms';
import MessagesPopup from "blocks/controls-panel/chat/Messages";
import { useState } from 'react';

const Chat = ({ uid }) => {

  const [currentRoomPanel, setCurrentRoomPanel] = useState(false);
  const [currentUserInRoomPanel, setCurrentUserInRoomPanel] = useState(false);

  return (
    <>
      {!currentRoomPanel ? (
        <>
          <Rooms
            uid={uid}
            type='popup'
            roomId={currentRoomPanel}
            setCurrentRoomPanel={setCurrentRoomPanel}
            setCurrentUserInRoomPanel={setCurrentUserInRoomPanel}
          />
        </>
      ) :
        (
          <>
            <MessagesPopup
              uid={uid}
              roomId={currentRoomPanel}
              currentUser={currentUserInRoomPanel}
              setCurrentRoomPanel={setCurrentRoomPanel}
            />
          </>
        )}

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
  }
}

export default connect(mapStateToProps)(Chat);