import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import axios from 'axios';
import moment from "moment";

import { changeActions } from 'servicesMysql/changeActions';

const BtnChat = ({ user, ActionFn, account, rooms, panelState }) => {

  const navigate = useNavigate();

  const activeEl = (room) => {
    console.log('in')
    ActionFn('SET_GLOBAL', {
      panelState: true,
      panelId: 'chat',
      panelName: 'Личные сообщения',
      currentRoomPanel: room,
      currentUserInRoomPanel: user
    });
  }

  const onInviteChat = async (user, device) => {
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

      const response = await axios.post("https://hotpal.ru:5000/room/", {
        'connectUsersUid': [account.uid, user.uid],
        'author': 'dave',
        'messages': [],
      });

      ActionFn('SET_GLOBAL', {
        rooms: [...rooms, response.data],
      });


      if (device === 'desk') {
        navigate('/cabinet/chat/' + response.data._id, { replace: true });
      } else {
        // console.log('mob 1');
        activeEl(response.data._id);
      }
    } else {
      if (device === 'desk') {
        navigate('/cabinet/chat/' + currentRoomTemp._id, { replace: true });
      } else {

        activeEl(currentRoomTemp._id);
        // console.log('mob 2', panelState);
      }
    }

    changeActions({
      ...account,
      'uid': account.uid,
      'date': moment().format('YYYY-MM-DD hh:mm:ss'),
      'action': 'chat'
    });

  }

  // scroll.scrollTo(0); // Scrolling to 100px from the top of the page.


  return (
    <>
      <div
        className="btn-ico--chat btn-chat-desk btn-ico"
        onClick={() => { onInviteChat(user, 'desk') }}
      ></div>
      <div
        className="btn-ico--chat btn-chat-mob btn-ico"
        onClick={() => { onInviteChat(user, 'mob') }}
      ></div>
    </>
  )
}


const mapStateToProps = (state) => {

  return {
    account: state.account,
    rooms: state.globalState.rooms,
    panelState: state.globalState.panelState
  }
}

export default connect(mapStateToProps, { ActionFn })(BtnChat);