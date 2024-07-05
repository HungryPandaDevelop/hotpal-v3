import { connect } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionFn from 'store/actions';
import RenderForm from 'components/forms/RenderForm';
import Popup from 'components/Popup';
import Section from "pages/main/Section"
import { Link } from 'react-router-dom';
import { regMail } from 'base/forms/authFields';

import { authUsers } from 'servicesMysql/changeUsers';



const AuthMail = ({ formData, ActionFn }) => {

  const navigate = useNavigate();
  const [errEnter, setErrEnter] = useState(false);

  const submitSuccess = async () => {


    const response = await authUsers(formData.values);

    if (response === 'no') {
      console.log('Ошибка пароля или пользователя');
      setErrEnter(true);

      let idTimeEnter;

      clearInterval(idTimeEnter);

      idTimeEnter = setTimeout(() => {
        setErrEnter(false);
      }, 1500)
    } else if (response) {
      console.log('res', response);
      ActionFn('SET_INFO_ACCOUNT', response);
      // localStorage.setItem('account', JSON.stringify(response))
      navigate('/cabinet');
    }


  }


  return (
    <>
      <Popup
        statusPopup={true}
        linkBack={true}
      >
        <h3>Авторизация</h3>
        {errEnter && <div className="error-hint">Ошибка пароля или пользователя</div>}
        <RenderForm
          fields={regMail}
          btnSubmitText="Войти"
          submitSuccess={submitSuccess}

        />
        <div className="simle-link">
          <Link className="link" to="/forgot-pass">Восстановить пороль</Link>
        </div>
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

export default connect(mapStateToProps, { ActionFn })(AuthMail);
