import Tabs from 'pages/cabinet/parts/Tabs';
import FavoritesItem from 'pages/cabinet/parts/FavoritesItem'

import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { getListing } from 'services/getListings';


const Favorites = ({ account, type }) => {

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);


  useEffect(() => {

    setLoading(true);
    getListing(type, 'userRef', account.uid).then((res) => {
      setListing(res);
      setLoading(false);
    });

  }, [type]);

  if (loading) { return 'Loading...' };

  return (
    <>
      <div className="stub"></div>
      <div className="main-full">
        <Tabs
          active={type === 'white-list' ? 3 : 4}
        />
        <div className="border-container border-null-top account-main" >
          <div className="main-grid">
            {listing.length === 0 && (<div className='col-12'><h3>Ваш черный список пуст.</h3></div>)}
            {listing.map((list, index) => (
              <FavoritesItem
                key={index}
                list={list}
                listing={listing}
                setListing={setListing}
                type={type}
              />))}
          </div>

        </div>
      </div>
    </>
  )
}


const mapStateToProps = (state) => {

  return {
    account: state.account,
  }
}

export default connect(mapStateToProps)(Favorites);