
import { deleteListing } from 'services/getListings';
import { useNavigate } from 'react-router-dom';
import EmptyRoom from 'pages/chat/EmptyRoom';

import RoomItem from 'pages/chat/RoomItem';
import { connect } from 'react-redux';

import { deleteChat } from 'servicesMysql/changeChats';

const RoomList = ({
  uid,
  roomId,
  // setChoiseRoom, 
  // setCurrentUser, 
  type,
  rooms

}) => {
  // console.log('rooms', rooms)

  const navigate = useNavigate();

  const onDeleteRoom = (id) => {
    deleteListing('rooms', id);
    deleteChat(id);


    navigate('/cabinet/chat', { replace: true });
  }

  return (
    <div className='chat-rooms'>
      {rooms.length ? rooms.map((room) => <RoomItem
        room={room}
        key={room.id}
        roomUrl={roomId}
        uid={uid}
        type={type}
        onDeleteRoom={onDeleteRoom}
      // setChoiseRoom={setChoiseRoom}
      // setCurrentUser={setCurrentUser}
      />) : <EmptyRoom />}

    </div>
  )
};

const mapStateToProps = (state) => {
  // console.log('state', state)
  return {
    rooms: state.globalState.rooms,
  }
}

export default connect(mapStateToProps)(RoomList);