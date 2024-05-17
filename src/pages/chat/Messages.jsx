import { useEffect, useState, useRef } from 'react';

import { connect } from 'react-redux';

import { getMyRoomMessages, stopWatch } from 'services/chatEvents';

import MessagesItem from './MessagesItem';
import MessagesHead from './MessagesHead';

import { updateRead } from 'services/chatEvents';

import { animateScroll as scroll } from 'react-scroll';

const Messages = ({ uid, roomId, type, rooms }) => {

  const chatRef = useRef(null);
  const [allMessages, setAllMessages] = useState([]);

  const [imageLoaded, setImageLoaded] = useState(false);

  // const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {


    getMyRoomMessages(setAllMessages, roomId);



    const currentRoom = rooms.find(el => el.id === roomId);
    if (currentRoom) {
      updateRead(roomId, currentRoom, uid);

    }



    return () => {
      stopWatch();
    }
  }, [roomId]);

  const scrollToBottom = () => {
    console.log('scroll')
    scroll.scrollToBottom({
      containerId: 'messages-container', // Здесь укажите ID вашего контейнера
      duration: 250, // Настройте длительность анимации
    });
  }

  useEffect(() => {

    if (imageLoaded) {
      scrollToBottom();
    }

  }, [allMessages, imageLoaded])

  const renderMessages = () => {
    if (allMessages.length <= 0) {
      return 'Список сообщений пуст';
    }
    return allMessages.map((message, index) => <MessagesItem
      key={index}
      message={message}
      uid={uid}
      roomId={roomId}
      index={index}
      setImageLoaded={setImageLoaded}
    />)
  }

  return (
    <>
      {type !== 'popup' && <MessagesHead />}
      <div id="messages-container" className="messages-container custom-scroll" ref={chatRef}>

        {renderMessages()}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    rooms: state.globalState.rooms,
  }
}

export default connect(mapStateToProps)(Messages);