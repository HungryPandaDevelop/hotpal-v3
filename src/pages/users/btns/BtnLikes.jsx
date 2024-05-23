import { useState, useEffect } from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { timestampCustomDay } from 'services/timestampCustom';

import { changeActions } from 'servicesMysql/changeActions';

const BtnLikes = ({
  user,
  uid,
  name,
  likes,
  showPopup,
  setIdPoup,
  account,
  searchListing
}) => {

  const [activeBtn, setActiveBtn] = useState(false);
  const [activeSide, setActiveSide] = useState(null);
  const [activeBtnStatus, setActiveBtnStatus] = useState(false);
  const [currentLikeId, setCurrentLikeId] = useState(null);


  useEffect(() => {

    likes.map((like) => {

      if (like.interlocutors.includes(user.uid)) {
        setActiveBtn(true);
        if (like.interlocutors[0] === uid) {
          // я лайкнул
          console.log('я лайкнул', like._id)
          setActiveSide('i_him');
          setCurrentLikeId(like._id);
          if (like.status === 'agree') {
            setActiveBtnStatus(true);
          }

        }
        if (like.interlocutors[0] === user.uid) {
          // меня лайкнул
          setActiveSide('he_me');
          setCurrentLikeId(like._id);
          if (like.status === 'agree') {
            setActiveBtnStatus(true);
          }
        }
      }

    });


  }, [likes, searchListing]);

  const onAdd = async () => {

    // console.log(user)
    const response = await axios.post("http://hotpal.ru:5000/api/like/", {
      'interlocutors': [uid, user.uid],
      'status': 'see',
      'read': false,
      'userRef': uid,
      'userLikes': user.uid
    });

    changeActions({
      ...account,
      'uid': uid,
      'date': timestampCustomDay(),
      'action': 'like',
    });

    setActiveBtn(true);
    setCurrentLikeId(response.data._id);
    showPopup(true);
    // console.log(response.data);

  };

  const onDelete = async () => {

    const response = await axios.post("http://hotpal.ru:5000/api/like/delete", {
      _id: currentLikeId,
    });

    console.log('delete ok', currentLikeId, response)
    setActiveBtn(false);
    setCurrentLikeId(null);
    showPopup(false);

  };

  const onStatusChange = () => {
    !activeBtn ? onAdd() : onDelete();
  }


  return (
    <>


      {!activeBtn ?
        (<div
          className={`btn-ico--like btn-ico`}
          onClick={() => { onStatusChange() }}>
        </div>) :
        (activeSide === 'i_him' ?
          (<div
            className={`btn-ico--time btn-ico ${activeBtnStatus ? 'active' : ''}`}
            onClick={() => { onStatusChange() }}>
          </div>) :
          (<Link
            to="/cabinet/likes"
            className={`btn-ico--time btn-ico ${activeBtnStatus ? 'active' : ''}`}
          >
          </Link>))
      }
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
    account: state.account,
    name: state.account.name,
    likes: state.globalState.likes,
  }
}

export default connect(mapStateToProps)(BtnLikes);