
import { Link } from 'react-router-dom';
import Popup from 'components/Popup';
import Section from "pages/main/Section"
import PolitksCheck from 'pages/auth/parts/PolitksCheck'
import GoogleBtn from 'pages/auth/GoogleBtn';
import { useState } from 'react';


const RegStart = () => {
  const [checkStatus, setCheckStatus] = useState(true);

  const changeCheckStatus = () => {
    setCheckStatus(!checkStatus)
  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>Знакомься в отелях и бронируй номера с кем тебе по душе!</h3>
        <PolitksCheck
          checkStatus={checkStatus}
          changeCheckStatus={changeCheckStatus}
        />

        <h4>Создайте аккаунт с помощью:</h4>
        <div className="btn-container">
          <GoogleBtn btnText="Создать через Gmail" />
          <Link to="/reg-vk" className="btn btn-reg btn-vk"  ><i></i><span>Создать через Vk</span></Link>

          <Link to={checkStatus ? '/reg-mail' : '/reg-start'} className="btn btn-reg btn-mail"><i></i><span>Создать через почту</span></Link>
        </div>
      </Popup>
      <Section />
    </>
  )
}

export default RegStart;
