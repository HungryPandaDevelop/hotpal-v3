import { useState, useEffect, useRef } from "react";
import Popup from "blocks/controls-panel/Popup";
import ControlsBtn from "blocks/controls-panel/ControlsBtn";
import ControlsLink from "blocks/controls-panel/ControlsLink";
import totalCountMessage from "blocks/controls-panel/parts/totalCountMessage";
import ActionFn from 'store/actions';

// import { fn } from "moment";
import $ from 'jquery';
import { connect } from 'react-redux';

const ControlsPanel = ({
  uid,
  rooms,
  likes,
  ActionFn,
  panelState,
  panelId,
  panelName
}) => {

  const popupRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {

    document.body.addEventListener('click', bodyClick);

    return () => {
      document.removeEventListener("click", bodyClick)
    };



    function bodyClick(e) {
      if (!$(e.target).is('.link-back, .link-back *, .controls-panel-popup, .controls-panel-popup  *, div.controls-btn, div.controls-btn  *, .rooms-item, .rooms-item  *')) {
        // setPopupActive(false);
        // setIdActive('');
        ActionFn('STATE_PANEL', { panelState: false, panelId: 0, panelName: '' })
      }
    }
  }, []);



  // const [popupActive, setPopupActive] = useState(false);


  // const [nameActive, setNameActive] = useState('');
  // const [idActive, setIdActive] = useState(0);

  const countTotalMessage = totalCountMessage('rooms', uid, rooms);
  const countTotalLikes = totalCountMessage('likes', uid, rooms, likes);

  const arrNames = [
    ['chat', 'Личные сообщения (' + countTotalMessage + ')'],
    ['like', 'Симпатии (' + countTotalLikes + ')'],
    // ['invite', 'Приглашения'],
  ];

  const arrLinks = [
    ['search', '/users-catalog'],
    ['settings', '/cabinet/settings']];

  const renderBtn = (arrNames) => {
    return arrNames.map(name => <ControlsBtn
      name={name}
      key={name[1]}

      // setPopupActive={setPopupActive}
      // setNameActive={setNameActive}

      idActive={panelId}
      // setIdActive={setIdActive}

      btnRef={btnRef}
      uid={uid}
      rooms={rooms}
      likes={likes}
      ActionFn={ActionFn}
    />)
  }
  const renderLink = (arrNames) => {
    return arrNames.map(name => <ControlsLink
      key={name[1]}
      name={name}
      idActive={panelId}
      ActionFn={ActionFn}
    // setPopupActive={setPopupActive}
    // setNameActive={setNameActive}
    // setIdActive={setIdActive}
    />)
  }

  return (
    <div>
      <div className="controls-panel">
        {renderBtn(arrNames)}
        {renderLink(arrLinks)}
      </div>
      {panelState && <Popup
        // setPopupActive={setPopupActive}

        ActionFn={ActionFn}

        nameActive={panelName}
        idActive={panelId}

        // setIdActive={setIdActive}

        popupRef={popupRef}

      />}
    </div>
  )
}


const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    rooms: state.globalState.rooms,
    likes: state.globalState.likes,
    panelState: state.globalState.panelState,
    panelId: state.globalState.panelId,
    panelName: state.globalState.panelName,
  }
}

export default connect(mapStateToProps, { ActionFn })(ControlsPanel);