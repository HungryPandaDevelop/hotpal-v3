import { Link } from 'react-router-dom'
import { renderCountTravel } from 'pages/hotels/hooks/renderCountTravel';

const TravelItem = ({ item, onDelete, uid, travelList, catalogUserId }) => {

  let currentDate = item.dateTravel.split(' - ');

  let dateFrom = currentDate[0].split(".").reverse().join("-");
  let dateTo = currentDate[1].split(".").reverse().join("-");

  return (
    <div className='travel-item'>
      {!catalogUserId && <div className="btn-trash" onClick={() => onDelete(item.id)}></div>}

      <div className="travel-line">
        <div className='travel-name'>
          <i className='marker-ico'></i>
          <b>{item.nameHotel} </b>
          <span>{item.address}</span>
        </div>
        <div className="travel-guest">
          {travelList ? renderCountTravel(travelList, item.idHotel, uid) : 0} гостей
        </div>
      </div>
      <div className="travel-line">
        <div className="travel-date">
          <i className='calendar-ico'></i> {item.dateTravel}
        </div>
        <div className="btn-container">
          <Link to={`/hotels-users/${item.idHotel}?from=${dateFrom}&to=${dateTo}`} className="btn btn--black-border">перейти</Link>
        </div>
      </div>

    </div>
  )
}

export default TravelItem