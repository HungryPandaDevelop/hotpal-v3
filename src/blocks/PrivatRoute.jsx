import {
  Navigate,
  Outlet,
  // useSearchParams
} from 'react-router-dom';
// import ActionFn from 'store/actions';
// import { useEffect } from 'react';

// import { saveListing } from 'services/saveListing';

import { connect } from 'react-redux';

import Header from 'blocks/Header';
import Footer from 'blocks/footer/Footer';


import ControlsPanel from 'blocks/ControlsPanel';
import BestPanel from 'blocks/BestPanel';




const PrivateRoute = ({ account }) => {




  const renderAuthContent = () => {
    return (
      <div className='content'>

        <Header />

        <ControlsPanel />

        <Outlet />

        {/* <BestPanel /> */}

        <Footer />
      </div>
    )
  }


  return (
    <>
      {/* {(account.loaded ? 'Loading...' : (account.uid ? renderAuthContent() : <Navigate to="/auth-start" />))} */}
      {account.uid ? renderAuthContent() : <Navigate to="/auth-start" />}
    </>
  )

}


const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
};

export default connect(mapStateToProps)(PrivateRoute);
