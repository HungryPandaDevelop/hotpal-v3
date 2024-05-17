import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuth } from 'services/googleAuth';
import ActionFn from 'store/actions';
import { v4 as uuidv4 } from 'uuid';

const GoogleAuth = ({ btnText, ActionFn, checkStatus, googleValue, typeIn }) => {

  const navigate = useNavigate();
  const generateId = uuidv4();

  const onGoogleClick = () => {

    if (!checkStatus) { return false; }

    googleAuth(generateId, googleValue, typeIn).then(res => {
      if (!res[0]) { return false };

      // localStorage.setItem('account', JSON.stringify({ uid: uid }));
      // setTimeout(() => {

      // console.log('account res', res)

      if (res[0] === 'auth') {
        navigate('/cabinet/', { replace: true });
        ActionFn('SET_INFO_ACCOUNT', { uid: res[1], name: res[2] });
      } if (res === 'back-reg') {
        console.log('back reg')

        navigate('/reg-google', { replace: true });
        ActionFn('SET_INFO_ACCOUNT', { loaded: false, });

      } else {
        navigate('/reg-end', {
          state:
            { vertificationId: generateId }
        });
      }

      // }, 500)


    });
  }

  return (
    <div className="btn btn-reg btn-google" onClick={onGoogleClick}><i></i><span>{btnText}</span></div>
  )
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
};

export default connect(mapStateToProps,
  {
    ActionFn
  })(GoogleAuth);