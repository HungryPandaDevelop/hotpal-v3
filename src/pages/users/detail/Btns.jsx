import { useState, useEffect } from 'react'

import Popup from 'components/Popup';
import BtnPopupLikes from 'pages/users/btns/BtnPopupLikes';
import BtnPopupBlacklist from 'pages/users/btns/BtnPopupBlacklist';


import BtnFavorites from 'pages/users/btns/BtnFavorites';
import BtnLikes from 'pages/users/btns/BtnLikes';
import BtnChat from 'pages/users/btns/BtnChat';



import { getListing } from 'services/getListings';


const Btns = ({ user, uid }) => {


  // const [whiteList, setWhitList] = useState([]);
  // const [whiteListLoas, setWhiteListLoad] = useState(true);
  const [blackList, setBlackList] = useState([]);
  const [blackListLoad, setBlackListLoad] = useState(true);



  useEffect(() => {
    // getListing('white-list', 'userRef', uid).then((res) => {
    //   // console.log('r', res, uid)
    //   setWhitList(res);
    //   setWhiteListLoad(false)
    // });
    getListing('black-list', 'userRef', uid).then((res) => {
      setBlackList(res);
      setBlackListLoad(false)
    });

  }, []);

  const [showStart, setShowStart] = useState(false);
  const [idPopup, setIdPoup] = useState('');

  const showPopup = (status) => {
    setShowStart(status);
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
      <BtnChat
        user={user}
        uid={uid}

      />
      {(<BtnLikes
        user={user}
        // account={account}
        showPopup={showPopup}
        setIdPoup={setIdPoup}
      />)}

      {/* {!whiteListLoas && <BtnFavorites
        user={user}
        uid={uid}
        collections={whiteList}
        base='white-list'
        btnClass='favorites'
      />} */}
      {!blackListLoad && (<BtnFavorites
        user={user}
        uid={uid}
        collections={blackList}
        base='black-list'
        btnClass='blacklist'
        showPopup={showPopup}
        setIdPoup={setIdPoup}
      />)}
    </div>
  )
}

export default Btns