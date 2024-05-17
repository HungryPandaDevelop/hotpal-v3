import { connect } from 'react-redux';

const NoVerification = ({ account }) => {
  return (
    <>
      <div className="stub"></div>
      <div className="content">
        <div className="popup element-show show">
          <div className="popup-container">
            <h3>Вы не прошли верификацию.</h3>
            <h4>Остался последний шаг. Мы отправили вам на почту письмо с подтверждением вашего email</h4>
            <div className="reg-end">
              <h3>Пожалуйста, проверьте ящик {account.email} и перейдите по ссылке, которую и Вам прислали на Вашу почту.</h3>
              <div><i className="reg-end-ico"></i></div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account,
  }
}


export default connect(mapStateToProps)(NoVerification);
