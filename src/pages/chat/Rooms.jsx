
import { connect } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ActionFn from 'store/actions';
import EmptyRoom from 'pages/chat/EmptyRoom';
import RoomItem from 'pages/chat/RoomItem';

const RoomList = ({
  uid,
  roomId,
  type,
  rooms,
  ActionFn
}) => {

  const navigate = useNavigate();

  const onChoiseRoom = (room) => {
    // console.log('currentUserInRoom', room)
    // ActionFn('SET_GLOBAL', {
    //   currentUserInRoom: user,
    //   currentRoom: room
    // });
  }



  const onDeleteRoom = async (id) => {

    const response = axios.post("http://hotpal.ru:5000/api/room/delete", {
      "_id": id
    });

    if (response) {
      ActionFn('SET_GLOBAL', {
        rooms: rooms.filter(room => room._id !== id),
        currentRoom: null,
        currentUserInRoom: null,
      });
      navigate('/cabinet/chat/', { replace: true });
    }

  }

  return (
    <div className='chat-rooms'>
      {rooms.length ? rooms.map((room) => <RoomItem
        room={room}
        key={room._id}
        roomUrl={roomId}
        uid={uid}
        type={type}

        onChoiseRoom={onChoiseRoom}
        onDeleteRoom={onDeleteRoom}
      />) : <EmptyRoom />}

    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    rooms: state.globalState.rooms,
  }
}


export default connect(mapStateToProps, { ActionFn })(RoomList);