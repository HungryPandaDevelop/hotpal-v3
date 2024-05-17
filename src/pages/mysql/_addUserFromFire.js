// import axios from 'axios';


// export const addUserFromFire = async ({
//   uid,
//   name,
//   email,
//   dateBerth,
//   gender,
//   goals,
//   timestamp,
//   imgsAccount,
//   description,
//   hotelDate,
//   hotelFind,
//   work,
//   zodiac,
//   tripPoint,
//   orientation,
//   interests,
//   phone,
//   setting_invites,
//   setting_likes,
//   setting_messages,
//   setting_founds,
//   setting_goals,
//   verificationCheck,
//   verificationSend,
//   verificationId,


// }) => {

//   console.log('u', uid)

//   try {

//     let jsonGoals;
//     let jsonInterests;
//     let jsonImgsAccount;

//     if (typeof goals === 'object') {
//       jsonGoals = JSON.stringify(goals);
//     } else {
//       jsonGoals = goals;
//     }

//     if (typeof interests === 'object') {
//       jsonInterests = JSON.stringify(interests);
//     } else {
//       jsonInterests = interests;
//     }

//     if (typeof imgsAccount === 'object') {
//       jsonImgsAccount = JSON.stringify(imgsAccount);
//     } else {
//       jsonImgsAccount = imgsAccount;
//     }


//     const response = await axios.get("https://hotpal.ru/api/base/vendor/add_from_fire.php", {
//       params: {
//         uid: uid,
//         email: email,
//         name: name,
//         gender: gender,
//         dateBerth: dateBerth,
//         timestamp: '01.02.2024, 13:41',
//         goals: '',
//         interests: jsonInterests,
//         imgsAccount: jsonImgsAccount,
//         description,
//         phone,
//         hotelDate,
//         hotelFind,
//         work,
//         zodiac,
//         tripPoint,
//         orientation,
//         setting_invites,
//         setting_likes,
//         setting_messages,
//         setting_founds,
//         setting_goals,
//         verificationCheck: 1,
//         verificationSend: 1,
//         verificationId,
//       }
//     });
//     console.log('Все ок:', response);
//     return true;
//   }
//   catch (err) {
//     console.error('Ошибка при отправке данных:', err);

//     // Возвращаем false или можем прокинуть ошибку вызывающему коду
//     return false;
//   }

// };

