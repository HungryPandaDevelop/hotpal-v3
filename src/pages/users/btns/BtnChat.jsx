import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import axios from 'axios';
import moment from "moment";

import { changeActions } from 'servicesMysql/changeActions';

const BtnChat = ({ user, ActionFn, account, rooms }) => {

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
        'connectUsersUid': [account.uid, user.uid],
        'author': 'dave',
        'messages': [],
      });

      ActionFn('SET_GLOBAL', {
        rooms: [...rooms, response.data],
      });
      navigate('/cabinet/chat/' + response.data._id, { replace: true });

    } else {

      navigate('/cabinet/chat/' + currentRoomTemp._id, { replace: true });
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
    account: state.account,
    rooms: state.globalState.rooms
  }
}

export default connect(mapStateToProps, { ActionFn })(BtnChat);