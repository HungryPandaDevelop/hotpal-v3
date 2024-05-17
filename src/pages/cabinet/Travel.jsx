
import TravelItem from 'pages/cabinet/parts/TravelItem';
import { getListing } from 'services/getListings';
import { useState, useEffect } from 'react'
import { deleteListing } from 'services/getListings';
import { connect } from 'react-redux';
const Travel = ({ uid, catalogUserId }) => {

  const [travelList, setTravelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState([]);

  const [stateShow, setStateShow] = useState(false);

  useEffect(() => {
    // console.log('catalogUserId', catalogUserId)
    // setLoading(true);
    let typeSearch = catalogUserId ? getListing('travel', 'usersArrayRef', [catalogUserId]) : getListing('travel', 'userRef', uid);

    typeSearch.then((res) => {
      // console.log(res)
      setListing(res);
      // setCountShow(res.length);
      if (res.length > 2) {
        setStateShow(true);
      }
      getListing('travel', 'travelAll', uid).then((res) => {
        setTravelList(res);
      });
      setLoading(false);
    });

  }, []);
  const showAll = () => {
    setStateShow(!stateShow)
  }
  const onDelete = (id) => {
    deleteListing('travel', id).then(res => {
      setListing(listing.filter(el => el.id !== id))
    })
  };

  if (loading) { return 'Loading...' };


  return (
    <div className='input-box'>
      {listing.length === 0 ? 'Список пуст' : listing.map((item, index) => {
        if (stateShow && index < 2) {
          return false;
        }
        return (
          <div key={item.id} >
            <TravelItem
              item={item}
              onDelete={onDelete}
              travelList={travelList}
              uid={uid}
              catalogUserId={catalogUserId}
            />
          </div>
        )

      })}
      {listing.length > 2 && (
        <div className="btn-container-bottom">
          <div className="btn btn--blue" onClick={showAll}>
            {stateShow ? 'Показать все' : 'Свернуть'}
          </div>
        </div>
      )}



    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
  }
}

export default connect(mapStateToProps)(Travel);

