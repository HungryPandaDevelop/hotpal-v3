import Messages from "pages/chat/Messages"
import ChatForm from 'pages/chat/Form';
import ChatHead from "./ChatHead"

const MessagesPopup = ({
  uid,
  roomId,
  currentUser,
  setCurrentRoomPanel
}) => {


  return (
    <>
      <ChatHead
        currentUser={currentUser}
        roomId={roomId}
        setCurrentRoomPanel={setCurrentRoomPanel}
      />
      <Messages uid={uid} roomId={roomId} type='popup' />
      <ChatForm roomId={roomId} type='popup' currentUserInRoom={currentUser} />
    </>
  )
}

export default MessagesPopup
