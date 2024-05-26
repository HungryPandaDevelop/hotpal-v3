import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessagesItem from './MessagesItem';
import ActionFn from 'store/actions';


import { animateScroll as scroll } from 'react-scroll';

const Messages = ({
  uid,
  roomId,
  type,
  currentRoom
}) => {
  const navigate = useNavigate();

  const chatRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {

    if (currentRoom) {
      currentRoom.messages.forEach(message => {
        if (message.uid !== uid) {
          message.read = true;
        }
      });

      axios.post("http://hotpal.ru:5000/api/room/update", {
        "_id": roomId,
        "messages": currentRoom.messages
      }).then(res => {

        ActionFn('SET_GLOBAL', { rooms: res.data })
      });
    } else {
      // navigate('/cabinet/chat/', { replace: true });
    }

  }, [currentRoom]);

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

  if (!currentRoom) {
    return false;
  }

  const renderMessages = () => {
    console.log('currentRoom', currentRoom)
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
    currentRoom: state.globalState.currentRoom,
  }
}

export default connect(mapStateToProps)(Messages);