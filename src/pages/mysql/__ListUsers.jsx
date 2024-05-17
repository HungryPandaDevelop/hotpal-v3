
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { deleteListing } from 'services/getListings';

import { addUserFromFire } from 'pages/mysql/addUserFromFire';

import { getListing } from 'services/getListings';

const ListUsers = () => {

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [update, setUpdate] = useState(false);

  const deleteUser = (uid) => {
    deleteListing('users', uid).then(() => {
      setUpdate(!update);
    });
  }

  const addUser = (item) => {
    addUserFromFire(item).then(res => {
      console.log('re', res)
    });
  }



  useEffect(() => {


    getListing('users').then((res) => {
      // let dataUser = JSON.stringify(res);




      setListings(res);


      setLoading(false);
    });

  }, [update]);

  return (
    <div>
      <div className="stub"></div>
      <div className="main-full">
        <div className="content">
          <h1>Base firebase</h1>
          <div className='table-base'>
            <table border="1" width="100%">
              <tr>
                <th>BTNS</th>
                <th >
                  uid
                </th>
                <th>
                  name
                </th>
                <th>
                  email
                </th>
                <th>
                  timestamp
                </th>
                <th>
                  dateBerth
                </th>
                <th>
                  description
                </th>
                <th>
                  goals
                </th>
                <th>
                  hotelDate
                </th>
                <th>
                  hotelFind
                </th>
                <th>
                  gender
                </th>
                <th>
                  goals
                </th>
                <th>
                  imgsAccount
                </th>
                <th>
                  interests
                </th>
                <th>
                  loaded
                </th>
                <th>
                  orientation
                </th>
                <th>
                  phone
                </th>
                <th>
                  tripPoint
                </th>
                <th>
                  verificationId
                </th>
                <th>
                  verificationCheck
                </th>
                <th>
                  verificationSend
                </th>
                <th>
                  work
                </th>
                <th>
                  zodiac
                </th>
                <th>
                  setting_invites
                </th>
                <th>
                  setting_likes
                </th>
                <th>
                  setting_messages
                </th>
                <th>
                  setting_founds
                </th>
                <th>
                  setting_goals
                </th>

              </tr>
              {loading ? 'Load..' : listings.map((item, index) =>
                <tr>
                  <td>
                    <div className="btn" onClick={() => { addUser(item) }}>Добавить Mysql</div>
                    {/* <div className="btn" onClick={() => { deleteUser(item.uid) }}>Удалить</div> */}
                  </td>
                  <td >
                    {item.uid}
                  </td>
                  <td>
                    {item.name}
                  </td>
                  <td>
                    {item.email}
                  </td>
                  <td>
                    {JSON.stringify(item.timestamp)}
                  </td>

                  <td>
                    {item.dateBerth}
                  </td>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    {JSON.stringify(item.goals)}
                  </td>
                  <td>
                    {JSON.stringify(item.interests)}
                  </td>
                  <td>
                    {item.hotelDate}
                  </td>
                  <td>
                    {item.hotelFind}
                  </td>
                  <td>
                    {item.gender}
                  </td>

                  <td>
                    {JSON.stringify(item.imgsAccount)}
                  </td>
                  <td>
                    {item.loaded}
                  </td>
                  <td>
                    {item.orientation}
                  </td>
                  <td>
                    {item.phone}
                  </td>
                  <td>
                    {item.tripPoint}
                  </td>
                  <td>
                    {item.verificationId}
                  </td>
                  <td>
                    {item.verificationCheck}
                  </td>
                  <td>
                    {item.verificationSend}
                  </td>
                  <td>
                    {item.work}
                  </td>
                  <td>
                    {item.zodiac}
                  </td>
                  <td>
                    {item.setting_invites}
                  </td>
                  <td>
                    {item.setting_likes}
                  </td>
                  <td>
                    {item.setting_messages}
                  </td>
                  <td>
                    {item.setting_founds}
                  </td>
                  <td>
                    {item.setting_goals}
                  </td>

                </tr>
              )}
            </table>
          </div>
          {/* <Link to="/mysql/add" className="btn btn--blue">Добавить</Link> */}
        </div>
      </div>

    </div >
  )
}

export default ListUsers;
