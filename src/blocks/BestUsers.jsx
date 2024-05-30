import { getMaxListing } from 'components/getMaxListing';
import { useEffect, useState } from 'react'

import axios from 'axios';
import { getByArrMysql } from 'pages/mysql/getByArrMysql'

import { userImg } from 'pages/users/catalog/UsersItem/userImg';
import { Link } from 'react-router-dom';
const BestUsers = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios.post("https://hotpal.ru:5000/like/find").then(res => {

      if (res.data && res.data.length > 0) {
        let usersArr = [];
        let loadLikes = getMaxListing(res.data, 'userLikes')//.slice(0, 28)
        // console.log('loadLikes', res.data, loadLikes);

        loadLikes.map(item => {
          usersArr.push(item.userLikes)
        });

        usersArr = usersArr.slice(0, 28)



        getByArrMysql(usersArr).then((res) => {
          setLoading(true);
          setListings(res.data)

        });
      }
      setLoading(false);
    });




  }, [])

  return (
    <div className='best-users'>
      <h3>Топ анкеты:</h3>
      {loading ? 'Load...' : listings.map((user, index) => (
        <Link to={`/users-catalog/${user.uid}`} key={index} className='best-user-item'>
          <div className="users-item-img img-use-bg" style={userImg(user)}></div>
        </Link>
      ))}
    </div>
  )
}


export default BestUsers;