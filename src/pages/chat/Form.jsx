
import RenderForm from 'components/forms/chat/Form';
import ActionFn from 'store/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Form = ({
  formData,
  uid,
  roomId,
  type,
  rooms,
  ActionFn,
  inviteData
}) => {

  const currentRoom = rooms.filter(room => room._id === roomId)[0];

  useEffect(() => {

    if (currentRoom) {
      currentRoom.messages.forEach(message => {
        if (message.uid !== uid) {
          message.read = true;
        }
      });

      axios.post("https://hotpal.ru:5000/room/update", {
        "_id": roomId,
        "messages": currentRoom.messages
      }).then(res => {
        const updatedRoom = res.data;

        const updatedRooms = rooms.map(room =>
          room._id === updatedRoom._id ? updatedRoom : room
        );

        ActionFn('SET_GLOBAL', {
          rooms: updatedRooms,
          currentRoom: res.data,
        });
      });
    }

  }, []);


  useEffect(() => {
    if (inviteData) {

      currentRoom.messages[inviteData[1]].invite.status = inviteData[0];

      axios.post("https://hotpal.ru:5000/room/update", {
        "_id": roomId,
        "messages": currentRoom.messages
      }).then(res => {

        const updatedRoom = res.data;

        const updatedRooms = rooms.map(room =>
          room._id === updatedRoom._id ? updatedRoom : room
        );

        ActionFn('SET_GLOBAL', {
          rooms: updatedRooms,
          currentRoom: res.data,
        });
      });
    }
  }, [inviteData])

  const send = (message, invite) => {


    const singleMessage = {
      uid: uid,
      read: false,
      message: message,
      fileMessage: [],
      timestamp: new Date(),
      ...invite
    };
    const allMessages = [...currentRoom.messages, singleMessage];


    axios.post("https://hotpal.ru:5000/room/update", {
      "_id": roomId,
      "messages": allMessages
    }).then(res => {


      const updatedRoom = res.data;

      const updatedRooms = rooms.map(room =>
        room._id === updatedRoom._id ? updatedRoom : room
      );

      ActionFn('SET_GLOBAL', {
        rooms: updatedRooms,
        currentRoom: res.data,
      });

    });



  }

  const submitSuccess = () => {

    send(formData.values.message);
  }

  const submitInvite = (inviteData) => {

    send([], inviteData);
  }

  if (!currentRoom) {
    return false;
  }

  return (
    <div className="chat-form">

      <RenderForm
        submitSuccess={submitSuccess}
        submitInvite={submitInvite}
        colText={type === 'page' ? "col-8 " : "col-7"}
        colBtn={type === 'page' ? "col-4 " : "col-5"}
      />


    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    formData: state.form.chatForm,
    rooms: state.globalState.rooms,
  }
}

export default connect(mapStateToProps, { ActionFn })(Form);
