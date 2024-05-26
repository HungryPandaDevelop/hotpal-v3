import Messages from "pages/chat/Messages"
import ChatForm from 'pages/chat/Form';
import ChatHead from "./ChatHead"

const MessagesPopup = ({ uid, roomId, currentUser }) => {


  return (
    <>
      {/* <ChatHead currentUser={currentUser} roomId={roomId} /> */}
      <Messages uid={uid} roomId={roomId} type='popup' />
      <ChatForm roomId={roomId} type='popup' />
    </>
  )
}

export default MessagesPopup
