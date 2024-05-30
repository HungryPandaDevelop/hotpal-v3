import { io } from "socket.io-client"
import axios from "axios";
import { useEffect } from "react"

const Temp = () => {



  useEffect(() => {
    console.log('in uf')
    const newSocket = io('https://hotpal.ru:7000');

    console.log('newSocket', newSocket);

    return () => {
      newSocket.disconnect();
    }

    //   axios.get('https://hotpal.ru:7000')
    //     .then(res => {
    //       console.log('res', res.data);
    //     })
    //     .catch(err => {
    //       console.error('Error:', err);
    //     });

  }, []);




  return (
    <div className="main-full">
      <div className="stub"></div>
      <h1>Temp</h1>
    </div>
  )
}

export default Temp
