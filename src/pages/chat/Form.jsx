
import RenderForm from 'components/forms/chat/Form';

import { connect } from 'react-redux';

import { sendMessage } from 'services/chatEvents';


const Form = ({ formData, uid, roomId, type, account, roomUserInfo }) => {


  const submitSuccess = () => {
    sendMessage(roomId, uid, formData.values);
  }

  const submitInvite = (inviteData) => {
    sendMessage(roomId, uid, inviteData);
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
  }
}

export default connect(mapStateToProps)(Form);
