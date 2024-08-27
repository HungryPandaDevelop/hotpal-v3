import { useState, useEffect, useRef } from 'react'
import { calculateAge } from 'pages/users/hooks/calculateAge';


import { connect } from 'react-redux';

import UsersSearchPanel from 'pages/users/catalog/UsersSearchPanel';
import UserItem from 'pages/users/catalog/UsersItem';
import { toCaseCount } from 'pages/hotels/hooks/toCaseCount'
import axios from 'axios';





const UserCatalog = ({ account }) => {

  const gridRef = useRef(null);

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchListing, setSearchListing] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 27; // Количество записей на страницу

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  // Функция debounce
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  useEffect(() => {


    const handleScroll = debounce(() => {
      if (gridRef) {
        const { clientHeight } = gridRef.current;
        let scrollTop = document.documentElement.scrollTop;

        if (scrollTop >= clientHeight && !loading && searchListing.length < total) {
          console.log('add')
          setPage((prevPage) => prevPage + 1);

        }
      }
    }, 500);


    window.addEventListener('scroll', handleScroll);
    return () => {


      window.removeEventListener('scroll', handleScroll)

    };

  }, [loading]);


  const loadUsers = (page) => {
    console.log('load user')
    setLoading(true);

    axios.get(`https://hotpal.ru/api/base/vendor/list.php?page=${page}&limit=${limit}`).then(({ data }) => {
      let allUsers = data.data.filter(user => {
        if (
          user.setting_founds &&
          (user.setting_founds !== account.orientation || calculateAge(user.dateBerth) < 18)
        ) {
          return false;
        } else {
          return user;
        }
      });

      setSearchListing(prevSearchListing => [...prevSearchListing, ...allUsers]);
      setListings(prevListings => [...prevListings, ...allUsers]);

      setTotal(data.total);
      console.log('load user true')
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };


  if (loading && page === 1) return 'Loading...';

  return (
    <>
      <div className="stub"></div>

      <UsersSearchPanel
        listings={listings}
        searchListing={searchListing}
        setSearchListing={setSearchListing}
      />

      <div className="main-full total-count">
        Найдено всего: <span>{total} {toCaseCount(total)}</span>
      </div>
      <div className="catalog-grid main-grid" ref={gridRef}>
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


      {loading && page > 1 && (
        <div className="preloader-container"><div className="preloader"></div></div>
      )}
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(UserCatalog);