import { useEffect, useState, useRef } from 'react';


import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessagesItem from './MessagesItem';


import { animateScroll as scroll } from 'react-scroll';

const Messages = ({
  uid,
  roomId,
  rooms,
  updataInvite
}) => {
  const navigate = useNavigate();



  const chatRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  const currentRoom = rooms.filter(room => room._id === roomId)[0];


  const scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: 'messages-container', // Здесь укажите ID вашего контейнера
      duration: 250, // Настройте длительность анимации
    });
  }

  useEffect(() => {

    if (imageLoaded) {
      scrollToBottom();
    }

  }, [imageLoaded])


  const renderMessages = () => {
    console.log('currentRoom', currentRoom)
    if (!currentRoom) {
      return false;
    }

    if (currentRoom.messages.length <= 0) {
      return 'Список сообщений пуст';
    }

    return currentRoom.messages.map((message, index) => <MessagesItem
      key={index}
      message={message}
      uid={uid}
      roomId={roomId}
      index={index}
      setImageLoaded={setImageLoaded}
      updataInvite={updataInvite}
    />)
  }

  return (
    <div id="messages-container" className="messages-container custom-scroll" ref={chatRef}>
      {renderMessages()}
    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    rooms: state.globalState.rooms,
  }
}

export default connect(mapStateToProps)(Messages);