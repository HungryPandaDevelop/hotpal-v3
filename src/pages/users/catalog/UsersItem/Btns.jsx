import BtnLikes from 'pages/users/btns/BtnLikes';
import BtnChat from 'pages/users/btns/BtnChat';

import { useState } from 'react'


import Popup from 'components/Popup';
import BtnPopupLikes from 'pages/users/btns/BtnPopupLikes';
import BtnPopupBlacklist from 'pages/users/btns/BtnPopupBlacklist';


const Btns = ({ user, account, searchListing }) => {

  const [showStart, setShowStart] = useState(false);
  const [idPopup, setIdPoup] = useState('');
  const showPopup = (status) => {
    setShowStart(status);
  }

  const getLike = () => {
    return <BtnLikes
      user={user}
      showPopup={showPopup}
      setIdPoup={setIdPoup}
      searchListing={searchListing}
    />;
  }
  const getChat = () => {
    return <BtnChat user={user} />;
  }

  const renderBtn = (param, type) => {


    if (user[param]) {
      if (user[param] !== account.orientation) {
        return false;
      }
    }

    return type === 'chat' ? getChat() : getLike();

  }

  return (
    <div className="btn-container">
      <Popup
        showStart={showStart} // дома доделать
        setShowStart={setShowStart} // дома доделать
        showPopup={showPopup}
      >
        {idPopup === 'likes' ? (<BtnPopupLikes />) : (<BtnPopupBlacklist />)}

      </Popup>

      <div className="btn-container-inner">

        {renderBtn('setting_likes', 'like')}

        {renderBtn('setting_messages', 'chat')}
      </div>
    </div>
  )
}

export default Btns;
