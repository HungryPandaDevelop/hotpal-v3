import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import PrivatRoute from 'blocks/PrivatRoute';
import GlobalRoute from 'blocks/GlobalRoute';
import GlobalRouteWhite from 'blocks/GlobalRouteWhite';

import ScrollTop from 'components/ScrollTop'

// import CheckAuth from 'blocks/header/CheckAuth';

import Main from 'pages/Main';

import NoVerification from 'pages/cabinet/NoVerification';

import Cabinet from 'pages/cabinet/Cabinet';
import Settings from 'pages/cabinet/Settings';
import Favorites from 'pages/cabinet/Favorites';
import Likes from 'pages/cabinet/Likes';

import ForgotPassword from 'pages/auth/ForgotPassword';
import ChangeForgotPassword from 'pages/auth/ChangeForgotPassword';
import AuthStart from 'pages/auth/AuthStart';
import RegStart from 'pages/auth/RegStart';

import AuthMail from 'pages/auth/AuthMail';
import RegMail from 'pages/auth/RegMail';
import RegEnd from 'pages/auth/RegEnd';


import UsersCatalog from 'pages/users/UserCatalog';
import UsersDetail from 'pages/users/UserDetail';

import HotelsCatalog from 'pages/hotels/HotelsCatalog';
import HotelsCatalogMap from 'pages/hotels/HotelsCatalogMap';
import HotelsUsersCatalog from 'pages/hotels/HotelsUsersCatalog';

import Chat from 'pages/chat/Chat';

import NotFound from 'pages/NotFound';

// admin
import PageList from 'pages/admin/PageList';
import PageListEdit from 'pages/admin/PageListEdit';
import PageListNew from 'pages/admin/PageListNew';
import PageStandart from 'pages/admin/PageStandart';



import CookiePopup from 'blocks/CookiePopup'
import Yslovia from 'pages/default/Yslovia';
import Konf from 'pages/default/Konf';
import Politic from 'pages/default/Politic';
import Intelect from 'pages/default/Intelect';
import About from 'pages/default/About';
import Why from 'pages/default/Why';

import MysqlList from 'pages/mysql/List';
import RegGoogleEnd from 'pages/auth/RegGoogleEnd';

import Temp from 'pages/Temp';


const App = ({ account }) => {

  return (
    <>

      <BrowserRouter>
        {/* <CheckAuth /> */}
        <ScrollTop />
        <CookiePopup />

        <Routes>
          <Route path='/' element={<GlobalRoute />}>
            <Route path='/temp' element={<Temp />} ></Route>
            <Route index element={<Main />} ></Route>
            <Route path='/auth-start' element={<AuthStart />} ></Route>
            <Route path='/reg-start' element={<RegStart />} ></Route>
            <Route path='/reg-mail' element={<RegMail />} ></Route>
            <Route path='/auth-mail' element={<AuthMail />} ></Route>
            <Route path='/forgot-pass' element={<ForgotPassword />} ></Route>
            <Route path='/change-forgot-pass' element={<ChangeForgotPassword />} ></Route>
            <Route path='/reg-end' element={<RegEnd />} ></Route>

            <Route path='/reg-g-end' element={<RegGoogleEnd />} ></Route>



          </Route>

          <Route path='/' element={<GlobalRouteWhite />}>
            <Route path='/konf' element={<Konf />} ></Route>
            <Route path='/intelect' element={<Intelect />} ></Route>
            <Route path='/politic' element={<Politic />} ></Route>
            <Route path='/yslovia' element={<Yslovia />} ></Route>
            <Route path='/about' element={<About />} ></Route>
            <Route path='/why' element={<Why />} ></Route>
            <Route path='/mysql/list' element={<MysqlList />}></Route>
          </Route>


          <Route path='/' element={<PrivatRoute />}>

            <Route path='/users-catalog' element={<UsersCatalog />}></Route>
            <Route path='/users-catalog/:userId' element={<UsersDetail />}></Route>

            <Route path='/hotels-catalog-map' element={<HotelsCatalogMap uid={account.uid} />} ></Route>
            <Route path='/hotels-catalog' element={<HotelsCatalog uid={account.uid} />} ></Route>
            <Route path='/hotels-users/:hotelId' element={<HotelsUsersCatalog uid={account.uid} />} ></Route>

            <Route path='/no-verification' element={<NoVerification />} ></Route>

            <Route path='/page-list' element={<PageList account={account} />} ></Route>
            <Route path='/page-list/:pageId' element={<PageListEdit account={account} />} ></Route>
            <Route path='/page-list-new/' element={<PageListNew account={account} />} ></Route>

            <Route path='/page/:pageId' element={<PageStandart account={account} />} ></Route>
            <Route path='*' element={<NotFound />} />


            <Route path='/cabinet/' element={<Cabinet />} ></Route>

            <Route path='/cabinet/settings' element={<Settings />} ></Route>
            <Route path='/cabinet/chat' element={<Chat />} ></Route>
            <Route path='/cabinet/chat/:roomId' element={<Chat />} ></Route>
            <Route path='/cabinet/favorites' element={<Favorites type='white-list' />} ></Route>
            <Route path='/cabinet/dislikes' element={<Favorites type='black-list' />} ></Route>
            <Route path='/cabinet/likes' element={<Likes />} ></Route>


          </Route>

        </Routes>



      </BrowserRouter>

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  );
}



const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
};

export default connect(mapStateToProps)(App);