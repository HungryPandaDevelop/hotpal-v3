
import { connect } from 'react-redux';
import axios from 'axios';

import ActionFn from 'store/actions';
import EmptyRoom from 'pages/chat/EmptyRoom';

import RoomItem from 'blocks/controls-panel/chat/RoomItem';

const RoomList = ({
  uid,
  rooms,
  ActionFn,
  currentRoomPanel,
  setCurrentRoomPanel,
  setCurrentUserInRoomPanel
}) => {


  const onChoiseRoom = (room, user) => {
    console.log('currentUserInRoom', room)
    setCurrentRoomPanel(room);
    setCurrentUserInRoomPanel(user)
  }



  const onDeleteRoom = async (id) => {

    const response = axios.post("https://hotpal.ru:5000/room/delete", {
      "_id": id
    });

    if (response) {
      ActionFn('SET_GLOBAL', {
        rooms: rooms.filter(room => room._id !== id),
      });
    }

  }

  return (
    <div className='chat-rooms'>
      {rooms.length ? rooms.map((room) => <RoomItem
        room={room}
        key={room._id}
        roomId={currentRoomPanel}

        uid={uid}


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