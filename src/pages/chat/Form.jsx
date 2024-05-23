
import RenderForm from 'components/forms/chat/Form';

import { connect } from 'react-redux';
import axios from 'axios';
// import { sendMessage } from 'services/chatEvents';
import { useEffect, useState } from 'react';

const Form = ({ formData, uid, roomId, type, account, roomUserInfo, rooms }) => {

  const [messages, setMessages] = useState(null);

  useEffect(() => {

    if (rooms.length === 0) return;

    const foundItem = rooms.find(item => item._id === roomId);

    setMessages(foundItem.messages);
  }, [rooms]);

  const send = (message, invite) => {


    const singleMessage = {
      uid: uid,
      read: false,
      message: message,
      fileMessage: [],
      timestamp: new Date(),
      ...invite
    };
    const allMessages = [...messages, singleMessage]


    axios.post("http://hotpal.ru:5000/api/room/update", {
      "_id": roomId,
      "messages": allMessages
    }).then(res => {

      console.log('update chat', res.data);
      // navigate('/cabinet/chat', { replace: true });
      // ActionFn('SET_ROOMS', { rooms: res.data })
    });



  }

  const submitSuccess = () => {
    // sendMessage(roomId, uid, formData.values);
    send(formData.values.message)
  }

  const submitInvite = (inviteData) => {
    // sendMessage(roomId, uid, inviteData);
    send([], inviteData)
  }

  return (
    <div className="chat-form">

      <RenderForm
        submitSuccess={submitSuccess}
        submitInvite={submitInvite}
        colText={type === 'page' ? "col-8 " : "col-7"}
        colBtn={type === 'page' ? "col-4 " : "col-5"}
        account={account}
        roomUserInfo={roomUserInfo}
      />


    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account,
    uid: state.account.uid,
    formData: state.form.chatForm,
    rooms: state.globalState.rooms,
  }
}

export default connect(mapStateToProps)(Form);
