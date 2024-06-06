import BtnLikes from 'pages/users/btns/BtnLikes';
import BtnChat from 'pages/users/btns/BtnChat';

import { useState } from 'react'


import Popup from 'components/Popup';
import BtnPopupLikes from 'pages/users/btns/BtnPopupLikes';
// import BtnPopupBlacklist from 'pages/users/btns/BtnPopupBlacklist';


const Btns = ({
  user,
  // account,
  // searchListing 
}) => {

  const [statusPopup, setStatusPopup] = useState(false);

  // const [idPopup, setIdPoup] = useState('');

  const onShowPopup = (status) => {
    setStatusPopup(status);
  }

  // const getLike = () => {
  //   return <BtnLikes
  //     user={user}
  //     showPopup={showPopup}
  //     setIdPoup={setIdPoup}
  //   // searchListing={searchListing}
  //   />;
  // }
  // const getChat = () => {
  //   return <BtnChat user={user} />;
  // }

  // const renderBtn = (param, type) => {


  //   if (user[param]) {
  //     if (user[param] !== account.orientation) {
  //       return false;
  //     }
  //   }

  //   return type === 'chat' ? (
  //     <BtnChat user={user} />
  //   )
  //     :
  //     (
  //       <BtnLikes
  //         user={user}
  //         showPopup={showPopup}
  //         setIdPoup={setIdPoup}
  //       // searchListing={searchListing}
  //       />
  //     );

  // }

  return (
    <div className="btn-container">
      <Popup
        statusPopup={statusPopup}
        onShowPopup={onShowPopup}
      // setShowStart={setShowStart}

      >
        <BtnPopupLikes />

      </Popup>

      <div className="btn-container-inner">

        <BtnLikes
          user={user}
          onShowPopup={onShowPopup}
        // setIdPoup={setIdPoup}
        // searchListing={searchListing}
        />

        <BtnChat user={user} />
      </div>
    </div>
  )
}

export default Btns;
