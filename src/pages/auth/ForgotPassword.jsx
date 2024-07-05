import { useState } from 'react';
import { getPass } from 'base/forms/authFields';
import { connect } from 'react-redux';
import Popup from 'components/Popup';
import Section from 'pages/main/Section';
import { getByMailMysql } from 'pages/mysql/getByMailMysql';
// import { getListing } from 'services/getListings';

import RenderForm from 'components/forms/RenderForm';
import { toast } from 'react-toastify';
import axios from 'axios';

import { updateUser } from 'servicesMysql/changeUsers';
import { v4 as uuidv4 } from 'uuid';

const ForgotPassword = ({ formData }) => {

  const generateId = uuidv4();

  const [loading, setLoading] = useState(false);
  const [passSend, setPassSend] = useState(false);
  const [mailSend, setMailSend] = useState('');

  const [errUser, setErrUser] = useState(null);

  const renderMailSend = () => {
    console.log('formData', formData)
    return (
      <>
        <h3>Письмо на восстановление пароля успешно отправлено.</h3>
        <h4>Мы отправили вам на почту письмо с подтверждением смены пароля</h4>
        <div className="reg-end">
          <h3>Пожалуйста, проверьте ящик {mailSend}  и перейдите по ссылке, которую и Вам прислали на Вашу почту.</h3>
          <div><i className="reg-end-ico"></i></div>
        </div>
      </>
    )
  }

  const renderMailForm = () => {
    return (<>
      <h3>Заполните анкету</h3>
      <RenderForm
        fields={getPass}
        btnSubmitText={loading ? 'Loading..' : "Восстановить пароль"}
        submitSuccess={submitSuccess}

      /></>)
  }

  const submitSuccess = () => {

    const email = formData.values.email;
    console.log(email)
    getByMailMysql(email).then((res) => {



      setLoading(false);

      console.log('res email', res)

      if (res.uid) {

        updateUser({ ...res, 'key': generateId });


        axios.get("https://hotpal.ru/api/mail-send-pass.php", {
          params: {
            mail: res.email,
            name: res.name,
            uid: res.uid,
            key: generateId,
            host: window.location.host
          }
        });
        setMailSend(res.email);
        setPassSend(true)
      } else {
        // toast.error('Таких пользователей нет');
        console.log('таких нет')
        setErrUser('E-mail не найден. Вам необходимо пройти регистрацию.')
        let idTimeUser;

        clearTimeout(idTimeUser);

        idTimeUser = setTimeout(() => {
          setErrUser(null)
        }, 2000);
      }
    });




  }


  return (
    <>
      <Popup
        statusPopup={true}
        linkBack={true}
      >

        {passSend ? renderMailSend() : renderMailForm()}
        {errUser && errUser}
      </Popup>
      <Section />
    </>
  )
}


const mapStateToProps = (state) => {

  return {
    formData: state.form.singleInput,
  }
}

export default connect(mapStateToProps)(ForgotPassword);
