import { useState, useEffect } from 'react'
import { calculateAge } from 'pages/users/hooks/calculateAge';
// import { getListing } from 'services/getListings';

import { connect } from 'react-redux';

import UsersSearchPanel from 'pages/users/catalog/UsersSearchPanel';
import UserItem from 'pages/users/catalog/UsersItem';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'
import axios from 'axios';
const UserCatalog = ({ account }) => {
  // const { uid } = account;
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);



  const [searchListing, setSearchListing] = useState();

  useEffect(() => {


    axios.get("https://hotpal.ru/api/base/vendor/list.php").then(({ data }) => {
      // let dataUser = JSON.stringify(res);
      console.log('res', data);

      let allUsers = data.data.filter(user => {

        // if (user.setting_founds && (user.setting_founds !== account.orientation) || (user.imgsAccount === undefined || user.imgsAccount.length === 0 || calculateAge(user.dateBerth) < 18)) {
        if (
          user.setting_founds &&
          (user.setting_founds !== account.orientation || calculateAge(user.dateBerth) < 18)
        ) {
          return false;
        } else {
          return user;
        }


      })


      setSearchListing(allUsers);

      setListings(allUsers);


      setLoading(false);
    });

  }, []);

  if (loading) { return 'Loading...' }

  return (
    <>
      <div className="stub"></div>

      <UsersSearchPanel
        listings={listings}
        searchListing={searchListing}
        setSearchListing={setSearchListing}
      />

      <div className="main-full total-count">
        Найдено всего: <span>{searchListing.length} {toCaseCount(searchListing.length)}</span>
      </div>
      <div className="catalog-grid main-grid">
        {searchListing.map((user, index) => {

          return (
            <div key={index} className="col-4 col-md-6 col-xs-12">
              <UserItem
                user={user}
                account={account}
                searchListing={searchListing}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(UserCatalog);