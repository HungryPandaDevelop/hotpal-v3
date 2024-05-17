import totalCountMessage from "./parts/totalCountMessage";

const ControlsBtn = ({
  name,
  // setPopupActive,
  // setNameActive,
  // setIdActive,
  idActive,
  btnRef,
  uid,
  rooms,
  likes,
  ActionFn,
}) => {

  const activeEl = (name) => {

    // setPopupActive(true);

    ActionFn('STATE_PANEL', { panelState: true, panelId: name[0], panelName: name[1] })

    // setNameActive(name[1]);
    // setIdActive(name[0]);
  }

  const renderCount = (id, base) => {
    if (name[0] === id && totalCountMessage(base, uid, rooms, likes) > 0) {
      return <span>{totalCountMessage(base, uid, rooms, likes)} </span>
    }
  }


  return (
    <div
      className={`controls-btn controls-${name[0]} ${name[0] === idActive && 'active'}`}
      onClick={() => activeEl(name)}
      ref={btnRef}
    ><i></i>
      {renderCount('chat', 'rooms')}
      {renderCount('like', 'likes')}

    </div>
  )
}

export default ControlsBtn
