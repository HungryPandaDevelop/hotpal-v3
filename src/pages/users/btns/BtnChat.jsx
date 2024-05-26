import { useNavigate } from 'react-router-dom';
// import { createRoom } from 'services/chatEvents';
import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import { timestampCustomDay } from 'services/timestampCustom';
import axios from 'axios';
import { changeActions } from 'servicesMysql/changeActions';


// import { addChat } from 'servicesMysql/changeChats';

const BtnChat = ({ user, uid, ActionFn, name, account, rooms, currentRoom }) => {

  const navigate = useNavigate();

  const onInviteChat = async (user) => {
    let checkUser;
    let currentRoomTemp;

    if (rooms) {
      rooms.forEach(room => {
        if (room.connectUsersUid.includes(user.uid)) {
          checkUser = true;
          currentRoomTemp = room;
        };
      });
    }

    if (!checkUser) {

      const response = await axios.post("http://hotpal.ru:5000/api/room/", {
        'connectUsersUid': [uid, user.uid],
        'messages': [],
      });

      ActionFn('SET_GLOBAL', {
        rooms: [...rooms, response.data],
        currentRoom: response.data,
      });
      navigate('/cabinet/chat/' + response.data._id, { replace: true });

    } else {

      ActionFn('SET_GLOBAL', {
        currentRoom: currentRoomTemp,
      });
      navigate('/cabinet/chat/' + currentRoomTemp._id, { replace: true });
    }


  }

  // scroll.scrollTo(0); // Scrolling to 100px from the top of the page.
  // ActionFn('STATE_PANEL', {
  //   panelState: true,
  //   panelId: 'chat',
  //   panelName: 'Личные сообщения',



  // createRoom(uid, user.uid).then(res => {

  //   // addChat({
  //   //   'id_chat': res,
  //   //   'userRefName': name,
  //   //   'userRef': uid,
  //   //   'userLikesName': user.name,
  //   //   'userLikes': user.uid,
  //   //   'dateCreate': timestampCustomDay()
  //   // });

  //   changeActions({
  //     ...account,
  //     'uid': uid,
  //     'date': timestampCustomDay(),
  //     'action': 'chat'
  //   });


  //   if (window.innerWidth > 576) {
  //     navigate('/cabinet/chat/' + res, { replace: true });
  //   } else {
  //     // scroll.scrollTo(0); // Scrolling to 100px from the top of the page.
  //     ActionFn('STATE_PANEL', {
  //       panelState: true,
  //       panelId: 'chat',
  //       panelName: 'Личные сообщения',
  //     });

  //     ActionFn('SET_CURRENT_ROOM', { roomUserInfo: user, panelChatRoom: res })

  //   }

  //   console.log('res', res)

  // });



  const onInviteChatPopup = async (user) => {

  };



  return (
    <>
      <div
        className="btn-ico--chat btn-ico"
        onClick={() => { onInviteChat(user) }}
      ></div>
      {/* <div
        className="btn-ico--chat btn-ico--chat-popup btn-ico"
        onClick={() => { onInviteChat(user) }}
      ></div> */}
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    account: state.account,
    name: state.account.name,
    rooms: state.globalState.rooms,
    currentRoom: state.globalState.currentRoom,
  }
}

export default connect(mapStateToProps, { ActionFn })(BtnChat);