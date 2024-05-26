
import RenderForm from 'components/forms/chat/Form';
import ActionFn from 'store/actions';
import { connect } from 'react-redux';
import axios from 'axios';

const Form = ({
  formData,
  uid,
  roomId,
  type,
  account,
  roomUserInfo,
  currentRoom,
  ActionFn
}) => {

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


    axios.post("http://hotpal.ru:5000/api/room/update", {
      "_id": roomId,
      "messages": allMessages
    }).then(res => {

      ActionFn('SET_GLOBAL', { currentRoom: res.data })
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
    currentRoom: state.globalState.currentRoom,
  }
}

export default connect(mapStateToProps, { ActionFn })(Form);
