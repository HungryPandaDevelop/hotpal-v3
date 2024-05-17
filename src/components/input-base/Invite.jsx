import { Field, change } from 'redux-form';
// import { useState, useEffect } from 'react';
import { timestampCustom, timestampCustomDay } from 'services/timestampCustom';

import { changeActions } from 'servicesMysql/changeActions';
import { connect } from 'react-redux';

const TempateInput = (props) => {

  const {
    input,
    account
  } = props;

  const {
    // onSubmit,
    submitInvite,
    dispatch,
  } = props.obj;


  const sendInvite = (type, text) => {

    // dispatch(change('chatForm', 'invite', {
    //   text: text,
    //   type: type,
    //   status: 'see'
    // }))

    // dispatch(change('chatForm', 'message', 'test'))

    // input.onChange({
    //   text: text,
    //   type: type,
    //   status: 'see'
    // });

    console.log('type', type)
    let customType;
    switch (type) {
      case 'bokal':
        customType = 'inviteLobbyToday';
        break;
      case 'padushka':
        customType = 'inviteRoomToday';
        break;
      case 'plag':
        customType = 'invitePollToday';
        break;
      case 'pribor':
        customType = 'inviteRestoranToday';
        break;
      default:
        customType = null; // Значение по умолчанию, если ни одно условие не выполнено
        break;
    }

    console.log('customType', customType)
    submitInvite(
      {
        invite:
        {
          text: text,
          type: type,
          status: 'see'
        }
      });

    changeActions({
      ...account,
      'uid': account.uid,
      'date': timestampCustomDay(),
      'action': customType,

    });
    // onSubmit(e);

  }




  const renderBtn = (type, text) => {
    return (
      <div className='invite-ico-box'>
        <div
          className="invite-ico"
          onClick={(e) => { sendInvite(type, text) }}

        >
          <i className={`${type}-ico`}></i><span dangerouslySetInnerHTML={{ __html: text }}></span></div>
      </div>
    )
  }

  return (
    <div className='chat-invite-container'>
      <h3>Приглашения:</h3>
      {renderBtn('bokal', '<em><i class="bokal-ico--white"></i></em>бокал в лобби')}
      {renderBtn('padushka', '<em><i class="padushka-ico--white"></i></em>свидание в номере')}
      {renderBtn('plag', '<em><i class="plag-ico--white"></i></em>бассейн или море')}
      {renderBtn('pribor', '<em><i class="pribor-ico--white"></i></em>поход в ресторан')}
    </div>
  );
}



const RenderInputInvite = ({ obj, account }) => {

  return <Field
    name={obj.name}
    obj={obj}
    account={account}
    component={TempateInput}

  />;
}




const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
}

export default connect(mapStateToProps)(RenderInputInvite);