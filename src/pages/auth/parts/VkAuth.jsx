import * as VKID from '@vkid/sdk';
import { connect } from 'react-redux';
const VkAuth = ({ btnText, birth }) => {

  // 1 SQNGs8975Bqb3WXXvVTe
  // 2 cdd89711cdd89711cdd897112bcece28f7ccdd8cdd89711a854a5835481e5726665df3d
  VKID.Config.set({
    // Идентификатор приложения.
    app: 51822566,
    // Адрес для перехода после авторизации
    redirectUrl: 'https://hotpal.ru/check-vk',
    state: birth,
  });
  console.log('new state', birth)
  // localStorage.setItem('account', JSON.stringify({ age: account.age, dateBerth: account.dateBerth, typeIn: typeIn }));

  // console.log(VKID.Config)

  const handleClick = () => {
    // Открытие авторизации.
    VKID.Auth.login();
  }



  return (
    <div className='btn btn-reg btn-vk' onClick={handleClick}><i> </i><span>{btnText}</span></div>
  )
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
  }
};


export default connect(mapStateToProps)(VkAuth);