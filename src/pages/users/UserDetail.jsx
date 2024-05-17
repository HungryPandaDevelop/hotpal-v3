import { useState, useEffect } from "react"
// import { getSingleListing } from "services/getSingleListing"
import { useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import UserTop from "./detail/UserTop";
import GoalsUsers from "./detail/GoalsUsers";
import InterestsUsers from "./detail/InterestsUsers";
import Photos from "./detail/Photos";
import PersonalInfo from "./detail/PersonalInfo";
import Btns from "./detail/Btns";

import Travel from 'pages/cabinet/Travel';
import { getUserSingle } from 'servicesMysql/getUserSingle';

const UserDetail = ({ uid }) => {
  const { pathname } = useLocation();
  const params = useParams();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserSingle(params.userId).then((getuser) => {
      // console.log('getuser', getuser)
      setUser(getuser);
      setLoading(false);
    })
  }, [pathname]);

  if (loading) { return 'Loading...' }

  return (
    <>
      <div className="stub"></div>
      <div className="main-full">
        <div className="border-container border-container-user">
          <div className="main-grid">
            <div className="col-4 col-sm-6 col-xs-12 photos-mobile">
              {<Photos user={user} />}
            </div>
            <div className="col-8 col-sm-6 col-xs-12">

              <UserTop user={user} />
              <div className="user-middle-info">
                <GoalsUsers user={user} />
                <Btns
                  user={user}
                  uid={uid}
                />
              </div>

              <div className="travel-user">

                <div className="travel-current travel-current-detail">
                  <h3>Tекущее расположение</h3>
                  {user.hotelFind ? (<div className="travel-current-line"><i className="marker-ico--blue"></i>{user.hotelFind}</div>) : <div className="travel-current-empty">Не определено</div>}
                  {user.hotelDate && (<div className="travel-current-line"><i className="calendar-ico--blue"></i>{user.hotelDate}</div>)}
                </div>


                <div className="travel-story">
                  <h3>Будущие путешествия</h3>
                  <Travel catalogUserId={user.uid} />


                </div>
              </div>


            </div>
            <div className="col-4 col-sm-6 hidden-xs">
              {<Photos user={user} />}
            </div>
            <div className="col-12">
              <div className="border-delimetr border-account"></div>
            </div>
            <div className="col-8 col-sm-6 col-xs-12">
              <InterestsUsers special="special-tags" user={user} />
            </div>
            <div className="col-4 col-sm-6 col-xs-12">
              <PersonalInfo user={user} />
            </div>
            <div className="col-12">
              <div className="user-description">
                <h3>О себе:</h3>
                <div>
                  {user.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
  }
}

export default connect(mapStateToProps)(UserDetail);