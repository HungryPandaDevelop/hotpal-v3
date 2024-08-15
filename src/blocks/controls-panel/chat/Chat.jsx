import { connect } from 'react-redux';
import Rooms from 'blocks/controls-panel/chat/Rooms';
import MessagesPopup from "blocks/controls-panel/chat/Messages";
import { useState } from 'react';

const Chat = ({
  uid,
  currentRoomPanel,
  currentUserInRoomPanel
}) => {

  // const [currentRoomPanel, setCurrentRoomPanel] = useState(false);
  // const [currentUserInRoomPanel, setCurrentUserInRoomPanel] = useState(false);
  console.log(currentRoomPanel, currentUserInRoomPanel)
  return (
    <>
      {!currentRoomPanel ? (
        <>
          <Rooms
            uid={uid}
            type='popup'
          // roomId={currentRoomPanel}
          // setCurrentRoomPanel={setCurrentRoomPanel}
          // setCurrentUserInRoomPanel={setCurrentUserInRoomPanel}
          />
        </>
      ) :
        (
          <>
            <MessagesPopup
              uid={uid}
              roomId={currentRoomPanel}
              currentUser={currentUserInRoomPanel}
            // setCurrentRoomPanel={setCurrentRoomPanel}
            />
          </>
        )}

    </>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    currentRoomPanel: state.globalState.currentRoomPanel,
    currentUserInRoomPanel: state.globalState.currentUserInRoomPanel,
  }
}

export default connect(mapStateToProps)(Chat);