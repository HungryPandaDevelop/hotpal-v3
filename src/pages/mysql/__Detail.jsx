
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const List = () => {

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('detail')
    axios.get("https://hotpal.ru/api/base/vendor/get_single.php", {
      params: {
        uid: 'h10CHm24LuU8ouhr0vU3eySu8xb2',
        // name: account.name,
        // vertificationId: generateId,
        // host: window.location.host
      }
    }).then(res => {
      setLoading(false);
      // setListing(res.data.data);
      console.log('in send', res.data);
      // saveListing({ vertificationSend: true }, account.uid, 'users');
    });
  }, []);

  return (
    <div>
      <div className="stub"></div>
      <div className="main-full">
        <div className="content">
          <h1>Detail</h1>
          <div>
            {/* {loading ? 'Load..' : listing.map((item, index) =>
            (<table key={item.id} border="1" width="100%">
              {(index === 0) &&
                (
                  <tr>
                    {Object.keys(item).map((el, index) => (
                      <th key={index} width="25%">
                        {el}
                      </th>
                    ))}
                  </tr>
                )
              }
              <tr>
                {Object.keys(item).map((el, index) => (

                  <td key={index} width="25%">
                    {item[el]}
                  </td>

                ))}
                <td>
                  редактировать
                </td>
                <td>
                  удалить
                </td>
              </tr>
            </table>)
            )} */}
          </div>
          {/* <Link to="/mysql/add" className="btn btn--blue">Добавить</Link> */}
        </div>
      </div>

    </div >
  )
}

export default List;
