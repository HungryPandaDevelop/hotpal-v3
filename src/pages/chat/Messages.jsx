import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import MessagesItem from './MessagesItem';
import MessagesHead from './MessagesHead';


import { animateScroll as scroll } from 'react-scroll';

const Messages = ({ uid, roomId, type, rooms }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    if (rooms.length === 0) return;


    const foundItem = rooms.find(item => item._id === roomId);
    // console.log('foundItem', foundItem)
    setMessages(foundItem.messages);
    console.log(messages)
  }, [rooms]);

  const chatRef = useRef(null);

  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {

    const currentRoom = rooms.find(el => el._id === roomId);

    if (currentRoom) {

      currentRoom.messages.forEach(message => {
        if (message.uid !== uid) {
          message.read = true;
        }
      });
      console.log('read', currentRoom)

      axios.post("http://hotpal.ru:5000/api/room/update", {
        "_id": roomId,
        "messages": currentRoom.messages
      }).then(res => {

        console.log('update chat', res.data);
        // navigate('/cabinet/chat', { replace: true });
        // ActionFn('SET_ROOMS', { rooms: res.data })
      });

    }




  }, [roomId, rooms]);

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

  }, [messages, imageLoaded])

  const renderMessages = () => {
    if (messages.length <= 0) {
      return 'Список сообщений пуст';
    }
    return messages.map((message, index) => <MessagesItem
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