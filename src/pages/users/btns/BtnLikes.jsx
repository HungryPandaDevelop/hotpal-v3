import { useState, useEffect } from 'react';

import { addCardsDefault } from 'services/addListing';

import { deleteListing } from 'services/getListings';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { addLikes, deleteLikes } from 'servicesMysql/changeLikes';

import { timestampCustom, timestampCustomDay } from 'services/timestampCustom';

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

  const base = 'likes';

  const [status, setStatus] = useState(false);
  const [invite, setInvite] = useState(false);



  useEffect(() => {
    // console.log('likes', likes)
    setInvite(false);
    setStatus(false);

    // if (likes.length > 0) {
    // console.log('likes', likes, user.uid)
    likes.map((like) => {


      // if (user.uid === like.data.userLikes) {
      //   setStatus(like.data.id);
      // }

      if (user.uid === like.data.userLikes) {
        setStatus(like.data.id); // у меня на экране
      }
      // console.log('l', user.uid, like.data.userRef)
      if (user.uid === like.data.userRef) {
        //   setStatus(like.data.id); // у него на экране
        setInvite(true);
      }



    })
    // }

  }, [likes, searchListing]);

  const onAdd = (userInfo) => {

    addCardsDefault({
      'interlocutors': [uid, userInfo.uid],
      'status': 'see',
      'read': false,
      'userRef': uid,
      'userLikes': userInfo.uid,
    }, base).then(res => {

      // console.log('res', timestampCustom())

      addLikes({
        'id_like': res,
        'userRefName': name,
        'userRef': uid,
        'userLikesName': userInfo.name,
        'userLikes': userInfo.uid,
        'date': timestampCustomDay()
      });

      changeActions({
        ...account,
        'uid': uid,
        'date': timestampCustomDay(),
        'action': 'like',

      });

      setIdPoup('likes');
      showPopup(true);

      setStatus(res);
    });
  };

  const onDelete = () => {
    deleteListing(base, status)
    deleteLikes(status);
    showPopup(false);
  };

  const onStatusChange = (userInfo) => {
    if (status) {
      onDelete();
      setStatus(false);
    } else {
      onAdd(userInfo);
    }
  }


  return (
    <>
      {invite ? <Link className='btn-ico--like btn-ico active' to='/cabinet/likes'>Перейти</Link> : (
        <div
          className={`btn-ico--like btn-ico ${status ? 'active' : ''}`}
          onClick={() => { onStatusChange(user) }}
        ></div>
      )}
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