import { useState, useEffect } from 'react';

import logo from 'default/frontend/images/logo.svg'
import logoMain from 'default/frontend/images/logo-main-page.svg'
import logoWhite from 'default/frontend/images/logo-white.svg'
import { Link } from 'react-router-dom'
import Nav from 'blocks/header/Nav';
import InfoAccount from 'blocks/header/InfoAccount';
import PopupNav from 'blocks/PopupNav';
// import { getElementError } from '@testing-library/react';

import ChangeTheme from 'blocks/ChangeTheme';
import { connect } from 'react-redux';

const Header = ({
  uid,
  main

}) => {


  const [shopMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // console.log('location', location.pathname)
    setShowMenu(false);

  }, []);


  return (
    <>
      <ChangeTheme />
      <header className={main ? 'main-page-header' : ''}>
        <div className="main-grid line-header line-header-nav">
          <div className="col-4 hidden-xs vertical-align">
            <nav className="nav-header">
              <Nav />
            </nav>
          </div>
          <div className="col-4 col-lg-3 col-sm-2 col-xs-5 logo-container">
            <Link className="logo logo-dark" to="/"> <img src={main ? logoMain : logo} alt={logo} /></Link>
            <Link className="logo logo-white" to="/"> <img src={logoWhite} alt={logoWhite} /></Link>
          </div>
          <div className="col-4 col-lg-5 hidden-xs vertical-align">
            <div className="btn-container">
              <InfoAccount />
            </div>
          </div>
          <div className="col-9 col-xs-7 mobile-container vertical-align">
            <div>
              {uid && <Link to="/cabinet" className='btn btn--blue'>Мой акканут</Link>}
            </div>
            <div className="btn-hamburger" onClick={() => setShowMenu(true)}></div>
          </div>
        </div>
      </header>
      {shopMenu && <PopupNav setShowMenu={setShowMenu} />}
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    uid: state.account.uid,
  }
};

export default connect(mapStateToProps)(Header);