import { useNavigate } from 'react-router-dom';
import { createRoom } from 'services/chatEvents';
import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import { timestampCustomDay } from 'services/timestampCustom';

import { changeActions } from 'servicesMysql/changeActions';

import { addChat } from 'servicesMysql/changeChats';

const BtnChat = ({ user, uid, ActionFn, name, account }) => {

  const navigate = useNavigate();

  const onInviteChat = (user) => {
    // console.log(uid, user.uid)

    createRoom(uid, user.uid).then(res => {

      addChat({
        'id_chat': res,
        'userRefName': name,
        'userRef': uid,
        'userLikesName': user.name,
        'userLikes': user.uid,
        'dateCreate': timestampCustomDay()
      });

      changeActions({
        ...account,
        'uid': uid,
        'date': timestampCustomDay(),
        'action': 'chat'
      });


      if (window.innerWidth > 576) {
        navigate('/cabinet/chat/' + res, { replace: true });
      } else {
        // scroll.scrollTo(0); // Scrolling to 100px from the top of the page.
        ActionFn('STATE_PANEL', {
          panelState: true,
          panelId: 'chat',
          panelName: 'Личные сообщения',
        });

        ActionFn('SET_CURRENT_ROOM', { roomUserInfo: user, panelChatRoom: res })

      }

      console.log('res', res)



    });

  };


  return (
    <div
      className="btn-ico--chat btn-ico"
      onClick={() => { onInviteChat(user) }}
    ></div>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    account: state.account,
    name: state.account.name
  }
}

export default connect(mapStateToProps, { ActionFn })(BtnChat);