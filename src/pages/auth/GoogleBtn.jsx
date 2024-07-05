import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import ActionFn from 'store/actions';


import { getSingleByMail } from 'servicesMysql/getSingleByMail';
import { googleAuth } from 'servicesMysql/googleAuth';


const RegMail = ({ ActionFn, btnText }) => {
  const navigate = useNavigate();


  const apiGoogleKey = '1068069425762-3i1b7c4asfqf3q9bld8cpr5t0lev38u1.apps.googleusercontent.com';




  const BtnTemplate = () => {

    const login = useGoogleLogin({
      onSuccess: async tokenResponse => {


        const userData = await googleAuth(tokenResponse.access_token);

        const { id, name, email } = userData;

        const checkUser = await getSingleByMail(email);

        console.log('checkUser', checkUser)
        if (checkUser === 'no') {
          console.log('Вызвать форму');
          navigate('/reg-g-end', {
            state:
              { id, name, email }
          });
        } else {
          console.log('Авторизация успешна');
          ActionFn('SET_INFO_ACCOUNT', checkUser);
          // localStorage.setItem('account', JSON.stringify(checkUser));
          navigate('/cabinet');
        }

      },
      onError: () => console.log('FAILED'),
    });


    return (<div className="btn btn-reg btn-google" onClick={login}><i></i><span>{btnText}</span></div>)

  }






  return (
    <GoogleOAuthProvider clientId={apiGoogleKey}>
      <BtnTemplate />
    </GoogleOAuthProvider>
  )
}

const mapStateToProps = (state) => {

  return {
    formData: state.form.singleInput,
  }
}

export default connect(mapStateToProps, { ActionFn })(RegMail);
