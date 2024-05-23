import { io } from "socket.io-client"

import { useEffect, useState } from "react"

const Temp = () => {

  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState({ id: '123' });
  const [onlineUser, setOnlineUser] = useState(null);

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

    socket.emit('addNewUser', user?.id);

    socket.on('getOnlineUsers', (res) => {
      console.log('res socket', res)
      setOnlineUser(res)
    })
  }, [socket]);


  return (
    <div className="main-full">
      <div className="stub"></div>
      <h1>Temp</h1>
    </div>
  )
}

export default Temp
