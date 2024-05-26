
import { useParams } from 'react-router-dom';


import { connect } from 'react-redux';

import ChatForm from 'pages/chat/Form';

import MessagesHead from 'pages/chat/MessagesHead';
import Messages from 'pages/chat/Messages';

import Rooms from 'pages/chat/Rooms';
import Tabs from 'pages/cabinet/parts/Tabs';


const Chat = ({ account, roomUserInfo }) => {

  const params = useParams();

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
                uid={account.uid}
                roomId={params.roomId}
                type='page'
              />
            </div>
            <div className="col-8 col-xs-12">
              {params.roomId && (<div className="chat-messages">
                <MessagesHead />
                <Messages
                  roomId={params.roomId}
                />
                <ChatForm
                  roomId={params.roomId}
                  type='page'
                  roomUserInfo={roomUserInfo}
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


const mapStateToProps = (state) => {
  return {
    account: state.account,
    roomUserInfo: state.globalState.roomUserInfo,
    currentRoom: state.globalState.currentRoom,
  }
}

export default connect(mapStateToProps)(Chat);