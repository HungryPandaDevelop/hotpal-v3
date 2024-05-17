import { Link } from "react-router-dom"



const LinkWrap = ({
  children,
  type,
  path,
  room,
  roomUserInfo,
  // setChoiseRoom,
  // setCurrentUser,
  ActionFn
}) => {

  const choiseRoom = (room, roomUserInfo) => {
    // setChoiseRoom(user.id)
    ActionFn('SET_CURRENT_ROOM', { roomUserInfo: roomUserInfo, panelChatRoom: room.id })
    // setCurrentUser(roomUserInfo)
  }

  if (type === 'page') {
    return (
      <Link to={path}>
        {children}
      </Link>
    )
  } else {
    return (
      <div onClick={() => choiseRoom(room, roomUserInfo)}>
        {children}
      </div>
    )
  }

}

export default LinkWrap
