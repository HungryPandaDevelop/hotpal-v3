import { connect } from 'react-redux';
import ActionFn from 'store/actions';
import { Link } from 'react-router-dom';
// import { getAuth } from 'firebase/auth';

// import { useNavigate } from 'react-router-dom';

const InfoAccount = ({ uid, ActionFn }) => {

  // const auth = getAuth();
  // const navigate = useNavigate();

  const onLogOut = () => {
    // auth.signOut();
    localStorage.removeItem('account');
    ActionFn('EXIT_ACCOUNT', null);
    // navigate('/auth-start');
  };
  return (
    <>
      {/* <h3>uid: {account.uid}</h3> */}

      {uid ? (
        <>
          {/* <Link to="/cabinet/chat" className="btn btn-chat btn--white">Чат</Link> */}
          <Link to="/cabinet" className="btn btn-cabinet btn-in btn--blue">Мой кабинет</Link>
          <div
            className="btn btn--exit"
            onClick={onLogOut}
          >Выйти</div>
        </>) : (<><Link to="/auth-start" className="btn btn-in btn--blue">Войти</Link></>)}

    </>
  )
};


const mapStateToProps = (state) => {

  return {
    uid: state.account.uid
  }
}

export default connect(mapStateToProps,
  {
    ActionFn
  })(InfoAccount);