import axios from "axios";
import { useEffect, useState } from "react"
import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import { Link } from 'react-router-dom';

import { io } from "socket.io-client"

const InfoAccount = ({ account, ActionFn }) => {
  const [socket, setSocket] = useState(null);


  // useEffect(() => {
  //   axios.post("http://hotpal.ru:5000/api/room/find", {
  //     "userId": account.uid
  //   }).then(res => {

  //     console.log('get chat', res.data);
  //     ActionFn('SET_ROOMS', { rooms: res.data })
  //   });
  // }, []);

  // useEffect(() => {
  //   axios.post("http://hotpal.ru:5000/api/like/find", {
  //     "userId": account.uid
  //   }).then(res => {

  //     console.log('get likes', res.data);
  //     ActionFn('SET_LIKES', { likes: res.data })
  //   });
  // }, [])


  useEffect(() => {
    console.log('in')
    const newSocket = io('http://hotpal.ru:3001');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    }
  }, []);


  useEffect(() => {
    if (socket === null) { return; }

    // Отправляем запрос на сервер для начала получения лайков
    socket.emit('startShowLikes', account.uid);

    // Подписываемся на событие getOnlineLikes для получения обновлений лайков
    socket.on('getOnlineLikes', (res) => {
      console.log('res socket', res);
      // Обновляем состояние компонента с полученными лайками
      ActionFn('SET_GLOBAL', { likes: res })
    });



    // Отправляем запрос на сервер для начала получения лайков
    socket.emit('startShowRooms', account.uid);

    // Подписываемся на событие getOnlineLikes для получения обновлений лайков
    socket.on('getOnlineRooms', (res) => {
      console.log('res socket chat', res);
      // Обновляем состояние компонента с полученными лайками
      ActionFn('SET_GLOBAL', { rooms: res })
    });

    // Функция для отписки от события при размонтировании компонента
    return () => {
      socket.off('getOnlineLikes');
      // socket.off('getOnlineRooms');
    };
  }, [socket]);



  const onLogOut = () => {

    ActionFn('EXIT_ACCOUNT', null);

  };
  return account.uid ? (
    <>
      <Link to="/cabinet" className="btn btn-cabinet btn-in btn--blue">Мой кабинет</Link>
      <div
        className="btn btn--exit"
        onClick={onLogOut}
      >Выйти</div>
    </>) : <Link to="/auth-start" className="btn btn-in btn--blue">Войти</Link>
};


const mapStateToProps = (state) => {

  return {
    account: state.account
  }
}

export default connect(mapStateToProps,
  {
    ActionFn
  })(InfoAccount);