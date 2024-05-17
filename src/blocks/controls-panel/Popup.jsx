import Chat from 'blocks/controls-panel/chat/Chat'
import Likes from 'blocks/controls-panel/likes/Likes'


const Popup = ({
  // setPopupActive,
  nameActive,
  idActive,
  // setIdActive,
  popupRef,
  ActionFn,
}) => {

  const closePopup = () => {
    // setPopupActive(false);
    // setIdActive('');
    ActionFn('STATE_PANEL', { panelState: false, panelId: 0, panelName: '' })
  }

  return (
    <div className="controls-panel-popup" ref={popupRef}>
      <div className="controls-panel-head">{nameActive}</div>
      <div className={`panel-deg panel-deg--${idActive}`}></div>
      <div className="panel-close" onClick={closePopup}></div>
      {idActive === 'chat' && <Chat />}
      {idActive === 'like' && <Likes />}
    </div>
  )
}

export default Popup
