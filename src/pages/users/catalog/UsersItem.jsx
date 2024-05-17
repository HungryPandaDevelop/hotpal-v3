


import { Link } from 'react-router-dom';

import { userImg } from 'pages/users/catalog/UsersItem/userImg';
// import HotelUser from 'pages/users/catalog/UsersItem/HotelUser';
import GoalsUsers from 'pages/users/catalog/UsersItem/GoalsUsers';
import NameUsers from 'pages/users/catalog/UsersItem/NameUsers';
import Btns from 'pages/users/catalog/UsersItem/Btns';

import { getCurrentTime } from 'pages/chat/RoomItem/getCurrentTime';


const UserItem = ({ user, dateTravel, account, searchListing }) => {




  return (
    <div className="users-item" >
      <div className="users-item-img img-use-bg" style={userImg(user)}></div>
      <div className="users-item-bg" ></div>
      <div className="users-item-info">

        <Link className='users-item-link' to={`/users-catalog/${user.uid}`}></Link>

        <GoalsUsers
          user={user}
          account={account}
        />

        <NameUsers
          user={user}
        />

        <Btns
          user={user}
          account={account}
          uid={account.uid}
          searchListing={searchListing}
        />
        {user.entranceDate && (<div className="user-catalog-entrance">
          {getCurrentTime(user)}
        </div>)}

      </div>
      {dateTravel && <div className='user-date-travel'><div>Даты нахождения в отеле:</div> {dateTravel}</div>}
    </div>

  )
}

export default UserItem;
