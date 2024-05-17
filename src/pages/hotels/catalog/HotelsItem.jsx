import { Link } from "react-router-dom"
import HotelsStars from 'pages/hotels/catalog/HotelsStars'
import { renderImg } from 'pages/hotels/hooks/renderImg';
import { renderCountTravel } from 'pages/hotels/hooks/renderCountTravel';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'
const UserItem = ({
  hotel,
  travelList,
  uid,
  searchDate,
  itemInner
}) => {


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
          {travelList && (<div className="hotels-guest"><span>{renderCountTravel(travelList, hotel.id, uid)}</span>  {toCaseCount(renderCountTravel(travelList, hotel.id, uid))}</div>)}
          {!itemInner && (<Link to={`/hotels-users/${hotel.id}${searchDate ? `?from=${searchDate[0]}&to=${searchDate[1]}` : ''}`} className="btn btn--blue-border">просмотреть всех</Link>)}


          {hotel.price && <div className="hotels-price">от {hotel.price[0].daily_prices[0]} р.</div>}
        </div>
      </div>
    </div >
  )
}

export default UserItem
