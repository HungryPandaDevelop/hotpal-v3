import { useState, useEffect } from 'react'
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import moment from "moment";
import { connect } from 'react-redux';

import { getListing } from 'services/getListings';
import { getByArrMysql } from 'pages/mysql/getByArrMysql'

import { hotelPage, hotelsDataSingle } from 'pages/hotels/hooks/searchHotels';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'

import HotelsItem from 'pages/hotels/catalog/HotelsItem';
import TravelAddPanel from "pages/hotels/detail/TravelAddPanel";
import UserItem from 'pages/users/catalog/UsersItem';
import UsersSearchPanel from 'pages/hotels/detail/UsersSearchPanel';

const HotelsUsersCatalog = ({ account }) => {
  const { uid } = account;
  const { pathname } = useLocation();
  const params = useParams();
  const pageId = params.hotelId;

  const [listings, setListings] = useState([]);

  const [searchListing, setSearchListing] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();


  const [loadingHotel, setLoadingHotel] = useState(true);
  const [hotel, setHotel] = useState([]);

  const [userTravel, setUserTravel] = useState(false);

  useEffect(() => {

    // load HOTEL 
    // console.log('searchParams', searchParams.get('from'), searchParams.get('from'))

    let dateFrom = searchParams.get('from') ? searchParams.get('from') : moment().format('YYYY-MM-DD');
    let dateTo = searchParams.get('to') ? searchParams.get('to') : moment().add(2, 'days').format('YYYY-MM-DD');
    // console.log(dateFrom, dateTo)


    hotelsDataSingle([{ id: pageId }]).then(response => {



      hotelPage(pageId, dateFrom, dateTo, 1).then(res => {


        if (res) {
          var renderArrHotels = [];

          response.forEach((el, index) => {
            let findPrice = res.find(e => e.id === el.id)
            renderArrHotels.push({ price: findPrice.rates, ...el })
          });

          setHotel(renderArrHotels[0]);
        } else {
          setHotel(response[0]);
        }
        setLoadingHotel(false)
      });

    });

    const usersArray = [];
    getListing('travel', 'travel', pageId).then((res) => {
      let users = res;
      // console.log('trave', res)
      res.map(el => {
        if (el.userRef !== uid) {

          usersArray.push(el.userRef)
        }
      });
      // console.log('usersArray', usersArray)
      if (usersArray.length > 0) {
        getByArrMysql(usersArray).then((res) => {


          let tempUsers = [];
          res.data.forEach(el => {
            tempUsers.push({ ...users.find(e => e.uid === el.uid), ...el })
          });

          setLoading(false);
          setSearchListing(tempUsers);
          setListings(tempUsers);
          setUserTravel(false);
        });
      } else {
        setUserTravel(true);
        setLoading(false);
      }

    });

  }, [pathname]);


  const renderEmptyHotelsUsers = (userTravel) => {
    const notUser = 'В отеле нет гостей, будьте первым';
    const notSearch = 'По вашему поиску пока нет гостей, попробуйте еще'

    return (
      <div className="col-12">
        <div className='empty-message-box'>
          <span>{userTravel ? notSearch : notUser}</span>
          <i></i>
        </div>
      </div>
    )
  }


  return (
    <>
      <div className="stub"></div>

      <div className="main-grid hotel-user-catalog">
        <div className="col-6 col-xs-12">
          <UsersSearchPanel
            listings={listings}
            searchListing={searchListing}
            setSearchListing={setSearchListing}
          />
        </div>
        <div className="col-6 col-xs-12">
          <h3 className='total-count total-count--catalog'>Найдено: <span>{listings.length} {toCaseCount(listings.length)}</span></h3>
          {loadingHotel ? 'load...' : (
            <HotelsItem
              key={hotel.id}
              hotel={hotel}
              uid={uid}
              itemInner={true}
            />
          )}
        </div>
        <div className="col-12">
          {loadingHotel ? 'load...' : <TravelAddPanel hotel={hotel} />}
        </div>
      </div>
      {loading ? (<div className='main-full'>Loading...</div>) : (
        <div className="catalog-grid main-grid">
          {searchListing.length > 0 ? searchListing.map((user, index) => (
            <div key={index} className="col-4 col-xs-12">
              <UserItem
                user={user}
                account={account}
                dateTravel={user.dateTravel}
              />
            </div>
          )) : renderEmptyHotelsUsers(userTravel)
          }
        </div>
      )}

    </>
  )
}


const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(HotelsUsersCatalog);