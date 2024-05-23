import Popup from 'components/Popup';
// import RegEnd from 'pages/auth/parts/RegEnd';
import Section from "pages/main/Section"

import ActionFn from 'store/actions';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { sendEmail } from 'pages/auth/parts/RegEnd/sendEmail'
import { updateUser } from 'servicesMysql/changeUsers';



const RegEnd = ({ account, ActionFn }) => {

  const location = useLocation();
  let [searchParams] = useSearchParams()

  useEffect(() => {
    console.log('red end', account)
    if (account.verificationSend !== '1') {
      console.log('send verif', account);

      sendEmail(account, location).then((res) => {

        console.log('verif is', res)
        updateUser({ ...account, verificationSend: '1' });
        ActionFn('SET_INFO_ACCOUNT', { ...account, verificationSend: '1' });

      });
    }
    else if (account.verificationCheck !== '1') {
      console.log('verification change')
      const verificationIdUrl = searchParams.get('verificationId');
      const verificationIdAccount = account.verificationId;

      if (verificationIdUrl) {
        if (verificationIdUrl === verificationIdAccount) {
          // saveListing({ verificationCheck: true }, account.uid, 'users');

          updateUser({ ...account, verificationCheck: '1' });

          ActionFn('SET_INFO_ACCOUNT', { ...account, verificationCheck: '1' });

        }
      }
    }



  }, []);


  const renderMailSend = () => {
    return (
      <>
        <h3>Поздравляем!<br />Вы успешно создали аккаунт.</h3>
        <h4>Остался последний шаг. Мы отправили вам на почту письмо с подтверждением вашего email</h4>
        <div className="reg-end">
          <h3>Пожалуйста, проверьте ящик {account.email} и перейдите по ссылке, которую Вам прислали на Вашу почту.</h3>
          <h3>Внимание, если письмо не пришло в течение 5 минут, проверьте папку "Спам"</h3>
          <div><i className="reg-end-ico"></i></div>
        </div>
      </>
    )
  }

  const renderNoReg = () => {
    return (
      <>
        <h3>Пожалуйста, зарегистрируйтесь.</h3>
        <div className="reg-end">
          <Link className='btn btn--blue' to="/reg-start">Регистрация</Link>
        </div>
      </>
    )
  }

  const renderMailSending = () => {
    return (
      <>
        <h3>Поздравляем!<br />Вы успешно создали аккаунт.</h3>
        <Link className='btn btn--blue' to="/cabinet">В кабинет</Link>
      </>
    )
  }

  const renderPopup = () => {

    if (account.email && account.verificationCheck === '1') {
      return renderMailSending()
    }
    else if (account.email) {
      return renderMailSend()
    }
    else {
      return renderNoReg()
    }
  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        {renderPopup()}

      </Popup>
      <Section />
    </>
  )
}



const mapStateToProps = (state) => {

  return {
    account: state.account,
  }
}


export default connect(mapStateToProps, { ActionFn })(RegEnd);