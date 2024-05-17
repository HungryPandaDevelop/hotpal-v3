// import axios from 'axios';


// export const addMysql = async (props) => {

//   try {
//     let jsonImgsAccount = '';
//     if (typeof imgsAccount === 'object') {
//       jsonImgsAccount = JSON.stringify(props.imgsAccount);
//     };

//     const newValue = { ...props, imgsAccount: jsonImgsAccount }

//     // console.log('send',  uid, name, email, dateBerth, gender, timestamp, registration, verificationId, age, jsonImgsAccount, verificationCheck)

//     const response = await axios.get("https://hotpal.ru/api/base/vendor/create_user.php", {
//       params: newValue
//     });
//     console.log('Ответ php', response);
//     return true;
//   }
//   catch (err) {
//     console.error('Ошибка при отправке данных:', err);

//     // Возвращаем false или можем прокинуть ошибку вызывающему коду
//     return false;
//   }

// };

