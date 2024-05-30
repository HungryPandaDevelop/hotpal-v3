
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ActionFn from 'store/actions';
import EmptyRoom from 'pages/chat/EmptyRoom';
import RoomItem from 'pages/chat/RoomItem';

const RoomList = ({
  uid,
  roomId,
  rooms,
  ActionFn,
  setCurrentUserInRoom
}) => {

  const navigate = useNavigate();


  const onDeleteRoom = async (id) => {

    const response = axios.post("https://hotpal.ru:5000/room/delete", {
      "_id": id
    });

    if (response) {
      ActionFn('SET_GLOBAL', {
        rooms: rooms.filter(room => room._id !== id),
      });
      navigate('/cabinet/chat/', { replace: true });
    }

  }

  return (
    <div className='chat-rooms'>
      {rooms.length ? rooms.map((room) => <RoomItem
        room={room}
        key={room._id}
        roomId={roomId}
        uid={uid}
        onDeleteRoom={onDeleteRoom}
        setCurrentUserInRoom={setCurrentUserInRoom}
      />) : <EmptyRoom />}

    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    rooms: state.globalState.rooms,
  }
}


export default connect(mapStateToProps, { ActionFn })(RoomList);