import { getMaxListing } from 'components/getMaxListing';
import { useEffect, useState } from 'react'

import { getListing } from 'services/getListings';
import { getByArrMysql } from 'pages/mysql/getByArrMysql'

import { userImg } from 'pages/users/catalog/UsersItem/userImg';
import { Link } from 'react-router-dom';
const BestUsers = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListing('likes').then((res) => {
      // 
      // getMaxListing(res, 'userRef').slice(0, 9)
      // console.log('res', res)
      if (res.length > 0) {
        let usersArr = [];
        let loadLikes = getMaxListing(res, 'userLikes')//.slice(0, 28)

        // console.log('loadLikes', loadLikes)
        loadLikes.map(item => {
          usersArr.push(item.userLikes)
        });
        // console.log('usersArr', usersArr)
        usersArr = usersArr.slice(0, 28)
        // console.log('usersArr 2', usersArr)
        setLoading(false);
        // console.log(getMaxListing(res, 'userRef').slice(0, 9))

        // console.log('usersArr', usersArr)
        getByArrMysql(usersArr).then((res) => {
          // console.log('usersArr', res)
          setListings(res.data)

        })
      }

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

export default BestUsers