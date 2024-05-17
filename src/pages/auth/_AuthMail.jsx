import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import ActionFn from 'store/actions';
import RenderForm from 'components/forms/RenderForm';
import Popup from 'components/Popup';

import { authFields } from 'base/forms/authFields';

import Section from "pages/main/Section"

import { authUsers } from 'servicesMysql/changeUsers';

const AuthMail = ({ formData, ActionFn }) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const submitSuccess = () => {


    setLoading(true);
    authUsers(formData.values).then((response) => {
      if (response === 'no') {
        console.log('Ошибка пароля или пользователя');
        setLoading(false);
      } else if (response) {
        console.log('res', response);
        ActionFn('SET_INFO_ACCOUNT', response);
        localStorage.setItem('account', JSON.stringify(response));

        navigate('/cabinet');
      }
    });


  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>Заполните анкету</h3>
        <RenderForm
          fields={authFields}
          btnSubmitText={loading ? 'Loading..' : "Авторизация"}
          submitSuccess={submitSuccess}
        />
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
