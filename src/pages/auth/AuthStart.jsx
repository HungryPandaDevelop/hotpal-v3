
import { Link } from 'react-router-dom';
import Popup from 'components/Popup';
import Section from "pages/main/Section"
import PolitksCheck from 'pages/auth/parts/PolitksCheck'
import GoogleBtn from 'pages/auth/GoogleBtn';
import { useState } from 'react';


import VkAuth from 'pages/auth/parts/VkAuth';

const RegEnd = () => {

  const [checkStatus, setCheckStatus] = useState(true);

  const changeCheckStatus = () => {
    setCheckStatus(!checkStatus)
  };



  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>С возвращением!</h3>
        <PolitksCheck
          checkStatus={checkStatus}
          changeCheckStatus={changeCheckStatus}
        />

        <h4>Выберете способ входа:</h4>
        <div className="btn-container">
          <GoogleBtn btnText="Войти через Gmail" />
          {/* <GoogleAuth btnText="Войти через Gmail" checkStatus={checkStatus} typeIn="auth" /> */}
          <VkAuth btnText="Войти через Vk" typeIn="auth" />
          {/* <Link to="/auth-phone" className="btn btn-reg btn-phone"><i></i><span>Войти через номер телефона</span></Link> */}
          <Link to={checkStatus ? '/auth-mail' : '/auth-start'} className="btn btn-reg btn-mail"><i></i><span>Войти через почту</span></Link>



          <div className="simle-link">
            <Link className="link" to="/forgot-pass">Проблемы со входом?</Link>
          </div>
        </div>
      </Popup>
      <Section />
    </>
  )
}

export default RegEnd;
