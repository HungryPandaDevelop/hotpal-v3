
import { connect } from 'react-redux';
import { useState, useEffect } from "react"

import Popup from 'components/Popup';

import Section from "pages/main/Section";

import RenderForm from 'components/forms/RenderForm';

// import { changePasswordNoAuth } from 'services/changePassword';

import { settingsPassword } from 'base/forms/authFields';

import { useSearchParams, useNavigate } from 'react-router-dom';

import { getUserSingle } from 'servicesMysql/getUserSingle';
import ActionFn from 'store/actions';

import { updateUser } from 'servicesMysql/changeUsers';


const ChangeForgotPassword = ({ formData, ActionFn }) => {

  const navigate = useNavigate();

  let [searchParams] = useSearchParams()
  const [user, setUser] = useState(null);
  const [errPassword, setErrPassword] = useState(false);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    getUserSingle(searchParams.get('uid')).then((response) => {
      setUser(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (errPassword) {
      const id = setTimeout(() => {
        setErrPassword(null);
      }, 1000);
      return () => clearTimeout(id);
    }
  }, [errPassword]);


  const submitSuccess = async () => {
    const { checkPassword, changePassword, checkChangePassword } = formData.values;


    if (checkPassword !== user.password) {
      setErrPassword('Старый пароль не верный');
    } else if (changePassword !== checkChangePassword) {
      setErrPassword('Пароли не совпадают');
    } else {
      setErrPassword(null);
      // console.log('test', { ...user, 'password': changePassword })
      updateUser({ ...user, 'password': changePassword }).then(() => {

        ActionFn('SET_INFO_ACCOUNT', { ...user, 'password': changePassword });
        navigate('/cabinet');

      });
    }





  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <RenderForm
          fields={settingsPassword}
          btnSubmitText={loading ? 'Loading..' : "Поменять пароль"}
          submitSuccess={submitSuccess}
        />
        {errPassword ? 'Пароль не правильный' : ''}
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

export default connect(mapStateToProps, { ActionFn })(ChangeForgotPassword);
