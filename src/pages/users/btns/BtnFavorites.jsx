import { useState, useEffect } from 'react';

import { addCardsDefault } from 'services/addListing';

import { deleteListing } from 'services/getListings';

import { connect } from 'react-redux';



const BtnFavorites = ({
  user,
  uid,
  collections,
  base,
  btnClass,
  showPopup,
  setIdPoup
}) => {

  const [status, setStatus] = useState(false);


  useEffect(() => {
    // console.log('collections', collections)
    collections && collections.map((collection) => {
      if (user.uid === collection.likeUserRef) {
        setStatus(collection.id);
      };
    });

  }, []);

  const onAdd = (userInfo) => {
    addCardsDefault(
      {
        'userRef': uid,
        'likeUserRef': userInfo.uid
      }, base).then(res => {
        setStatus(res)
        setIdPoup('favorites')
        showPopup(true)
      });
  };

  const onDelete = () => {
    deleteListing(base, status)
    showPopup(false)
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
    <div
      className={`btn-ico--${btnClass} btn-ico ${status ? 'active' : ''}`}
      onClick={() => { onStatusChange(user) }}
    ></div>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.account.uid
  }
}

export default connect(mapStateToProps)(BtnFavorites);