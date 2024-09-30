import { Link } from "react-router-dom"
import HotelsStars from 'pages/hotels/catalog/HotelsStars'
import { renderImg } from 'pages/hotels/hooks/renderImg';
import { renderCountTravel } from 'pages/hotels/hooks/renderCountTravel';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'

import { useEffect, useState } from "react";
import axios from 'axios';
import { getByArrMysql } from 'pages/mysql/getByArrMysql'

const UserItem = ({
  hotel,
  travelList,
  uid,
  searchDate,
  itemInner
}) => {

  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //hotel.id
    axios.post("https://hotpal.ru:5000/hotel/findMy",
      {
        idHotel: hotel.id,
      }).then(res => {

        const usersArray = res.data.map(travel => travel.userRef)

        if (usersArray.length > 0) {
          getByArrMysql(usersArray).then((users) => {

            setLoading(false);
            setListings(users.data);
          });
        } else {

          setLoading(false);
        }
      });


  }, []);

  const slug = '93941.affiliate.0af1';



  return (
    <div className="hotels-item">
      {/* {startImg} */}
      <div className="hotels-img-container">
        {renderImg(hotel)}
        <div className="hotels-gradient"></div>
        <div className="hotels-raiting-container">

          <HotelsStars starRating={hotel.star_rating} />
          <div className="btn-container">
            <Link
              className='btn btn--white-border'
              target='_blank'
              to={`https://www.ostrovok.ru/rooms/${hotel.id}/?cur=RUB&lang=ru&${slug}&utm_medium=partners&utm_source=${slug}`}>Забронировать</Link>
          </div>
        </div>
      </div>
      <div className="hotels-info">
        <div className="hotels-name-container">
          <div className="hotels-name">{hotel.name} <br />{hotel.address}</div>
          {/* <div className="hotels-goals">
            <h3>Развлечения:</h3>
            <div className="goals-ico"><i className="bokal-ico"></i></div>
            <div className="goals-ico"><i className="pribor-ico"></i></div>
            <div className="goals-ico"><i className="plag-ico"></i></div>
            <div className="goals-ico"><i className="padushka-ico"></i></div>
          </div> */}
        </div>
        <div className="hotels-price-container">
          {/* {travelList && (<div className="hotels-guest"><span>{renderCountTravel(travelList, hotel.id, uid)}</span>  {toCaseCount(renderCountTravel(travelList, hotel.id, uid))}</div>)} */}
          {travelList && (<div className="hotels-guest"><span>{listings.length}</span>  {toCaseCount(listings.length)}</div>)}
          {!itemInner && (<Link to={`/hotels-users/${hotel.id}${searchDate ? `?from=${searchDate[0]}&to=${searchDate[1]}` : ''}`} className="btn btn--blue-border">просмотреть всех</Link>)}


          {hotel.price && <div className="hotels-price">от {hotel.price[0].daily_prices[0]} р.</div>}
        </div>
      </div>
    </div >
  )
}

export default UserItem
