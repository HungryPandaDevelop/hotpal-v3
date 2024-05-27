
import { useParams } from 'react-router-dom';
import { useState } from "react";

import ChatForm from 'pages/chat/Form';

import MessagesHead from 'pages/chat/MessagesHead';
import Messages from 'pages/chat/Messages';

import Rooms from 'pages/chat/Rooms';
import Tabs from 'pages/cabinet/parts/Tabs';


const Chat = () => {

  const params = useParams();
  const [inviteData, setInviteData] = useState(null);
  const [currentUserInRoom, setCurrentUserInRoom] = useState(null);

  const updataInvite = (status, index) => {
    console.log('update invite', status, index)
    setInviteData([status, index])
  }

  return (
    <>
      <div className='main-full'>
        <div className="stub"></div>
        <Tabs
          active={2}
        />

        <div className="border-container border-null-left chat">
          <div className='main-grid'>
            <div className="col-4 col-xs-12">
              <Rooms
                roomId={params.roomId}
                setCurrentUserInRoom={setCurrentUserInRoom}
              />
            </div>
            <div className="col-8 col-xs-12">
              {params.roomId && (<div className="chat-messages">
                <MessagesHead currentUserInRoom={currentUserInRoom} />
                <Messages
                  roomId={params.roomId}
                  updataInvite={updataInvite}
                />
                <ChatForm
                  roomId={params.roomId}
                  inviteData={inviteData}
                />
              </div>)}

            </div>



          </div>
        </div>
      </div>
      <div className="stub"></div>
    </>
  )
}



export default Chat;