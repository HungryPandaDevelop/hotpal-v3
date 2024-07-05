import Popup from 'components/Popup';
import Section from 'pages/main/Section';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ActionFn from 'store/actions';

import { timestampCustomDayTime } from 'services/timestampCustom';
import { connect } from 'react-redux';

import { addUsers, authUsers } from 'servicesMysql/changeUsers';
import { getByMailMysql } from 'pages/mysql/getByMailMysql';

import { v4 as uuidv4 } from 'uuid';

import { calculateAge } from 'pages/users/hooks/calculateAge';

const CheckVk = ({ ActionFn }) => {
  const navigate = useNavigate();

  const [currentName, setCurrentName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Получаем параметры из URL
    const urlSearchParams = new URLSearchParams(window.location.search);
    const payload = urlSearchParams.get('payload');
    const dateBerth = urlSearchParams.get('state');
    console.log('in vk auth', payload)



    if (payload) {

      // Декодируем JSON из payload
      const decodedPayload = JSON.parse(decodeURIComponent(payload));

      // Извлекаем user.id
      const userId = decodedPayload.user.id;
      const userName = decodedPayload.user.first_name;
      const userImg = decodedPayload.user.avatar;

      const age = calculateAge(dateBerth);

      const email = `${userId}@vk.auth`;
      setCurrentName(userName);

      getByMailMysql(email).then((res) => {
        console.log('email', res)
        if (res === 'no') {

          const generateId = uuidv4();

          const newUserData = {
            uid: generateId,
            name: userName,
            email: email,
            password: userId,
            entranceDate: timestampCustomDayTime(),
            registerationDate: timestampCustomDayTime(),
            verificationCheck: '1',
            imgsAccount: JSON.stringify([{ id: 'vk', 'url': userImg }]),
            age: age,
            dateBerth: dateBerth
          };

          addUsers(newUserData).then((res) => {

            if (!res) { return false };
            setStatus('Зарегистрированны');
            ActionFn('SET_INFO_ACCOUNT', newUserData);

          });
        } else {


          authUsers({
            name: userName,
            email: email,
            password: userId,
            entranceDate: timestampCustomDayTime()
          }).then(res => {

            if (res === 'no') {
              console.log('Ошибка пароля или пользователя');

            } else if (res) {

              setStatus('Авторизорованны');
              ActionFn('SET_INFO_ACCOUNT', res);

            }
          });

        }
      });



    } else {
      navigate('/', { replace: true });
      // вернуть назад
    }

  }, []);

  return (
    <>
      <Popup
        statusPopup={true}
        linkBack={true}
      >
        <h3>Добро пожаловать, {currentName}</h3>
        <h4>Вы успешно {status}</h4>
        <Link className='btn btn--blue' to="/cabinet">В кабинет</Link>
      </Popup>
      <Section />
    </>
  )
}



export default connect(null, { ActionFn })(CheckVk);



