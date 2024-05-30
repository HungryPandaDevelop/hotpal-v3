import { getMaxListing } from 'components/getMaxListing';

import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'
const BestHotels = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    axios.post("https://hotpal.ru:5000/hotel/find").then(res => {
      setListings(getMaxListing(res.data, 'idHotel').slice(0, 10));
      setLoading(false)
    });
  }, []);



  return loading ? 'Loading...' : (
    <div className='bests-hotels'>
      <h3>Лучшие отели</h3>
      {listings.map((item, index) => (
        <div key={index}><Link to={`/hotels-users/${item.idHotel}`}>{item.nameHotel}<span>{item.count} {toCaseCount(item.count)}</span></Link>

        </div>
      ))}
    </div>
  )
}

export default BestHotels;