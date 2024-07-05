import BtnLikes from 'pages/users/btns/BtnLikes';
import BtnChat from 'pages/users/btns/BtnChat';

import { useState } from 'react'


import Popup from 'components/Popup';
import BtnPopupLikes from 'pages/users/btns/BtnPopupLikes';

const Btns = ({
  user
}) => {

  const [statusPopup, setStatusPopup] = useState(false);

  const onShowPopup = (status) => {
    setStatusPopup(status);
  }

  return (
    <div className="btn-container">
      <Popup
        statusPopup={statusPopup}
        onShowPopup={onShowPopup}
      >
        <BtnPopupLikes />
      </Popup>

      <div className="btn-container-inner">
        <BtnLikes
          user={user}
          onShowPopup={onShowPopup}
        />
        <BtnChat user={user} />
      </div>
    </div>
  )
}

export default Btns;
