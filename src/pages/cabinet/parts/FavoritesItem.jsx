// import { getSingleListing } from 'services/getSingleListing';
import { deleteListing } from 'services/getListings';
import { useState, useEffect } from 'react'
import { getUserSingle } from 'servicesMysql/getUserSingle';
import { userImg } from 'pages/users/catalog/UsersItem/userImg'
const FavoritesItem = ({ list, listing, setListing, type }) => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserSingle(list.likeUserRef).then((getuser) => {

      setUser(getuser);
      setLoading(false);
    })

  }, [listing]);

  if (loading) { return '' }

  const onDelete = (id) => {
    deleteListing(type + '-list', id).then(() => {
      setListing(listing.filter(el => el.id !== id))
      setLoading(true);
    })

  };

  return (
    <div className="col-4 col-xs-12">
      <div className="favorites-item">
        <div className="img-cover-info">
          <div className="favorites-img img-use-bg" style={userImg(user)}></div>
          <h3>{user.name}</h3>
        </div>
        <div className="btn-container">
          <div
            className="btn btn--gray-border"
            onClick={() => { onDelete(list.id) }}
          >Удалить </div></div>
      </div>
    </div>
  )
}

export default FavoritesItem