import { connect } from 'react-redux';

import ActionFn from 'store/actions';
import RenderForm from 'components/forms/RenderForm';
import Popup from 'components/Popup';
import Section from "pages/main/Section"

import { regMail } from 'base/forms/authFields';

import { authUsers } from 'servicesMysql/changeUsers';



const AuthMail = ({ formData, ActionFn }) => {



  const submitSuccess = async () => {


    const response = await authUsers(formData.values);

    if (response === 'no') {
      console.log('Ошибка пароля или пользователя');

    } else if (response) {
      console.log('res', response);
      ActionFn('SET_INFO_ACCOUNT', response);
      // localStorage.setItem('account', JSON.stringify(response))
    }


  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>Авторизация</h3>

        <RenderForm
          fields={regMail}
          btnSubmitText="Регистрация"
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
