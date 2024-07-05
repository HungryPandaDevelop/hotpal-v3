import axios from 'axios';
import { timestampCustomDayTime } from 'services/timestampCustom';

export const authUsers = async (props) => {

  try {

    const response = await axios.get("https://hotpal.ru/api/base/vendor/auth_user.php", {
      params: props
    });
    // console.log('Ответ php auth', response);
    return response.data;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    return false;
  }

};

export const addUsers = async (props) => {

  try {

    const response = await axios.get("https://hotpal.ru/api/base/vendor/create_user.php", {
      params: props
    });
    // console.log('Ответ php', response);
    return response.data;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    return false;
  }

};




export const updateUser = async (props) => {


  try {

    let jsonGoals;
    let jsonInterests;
    let jsonImgsAccount;

    // let newValue = { ...props, goals: jsonGoals, interests: jsonInterests, imgsAccount: jsonImgsAccount, age: calculateAge(props.dateBerth) }
    let newValue = { ...props, entranceDate: timestampCustomDayTime() }

    if (props.goals) {
      if (typeof props.goals === 'object') {
        jsonGoals = JSON.stringify(props.goals);
      } else {
        jsonGoals = props.goals;
      }
      newValue.goals = jsonGoals;
    }

    if (props.interests) {
      if (typeof props.interests === 'object') {
        jsonInterests = JSON.stringify(props.interests);
      } else {
        jsonInterests = props.interests;
      }
      newValue.interests = jsonInterests;
    }



    if (props.imgsAccount) {
      if (typeof props.imgsAccount === 'object') {
        jsonImgsAccount = JSON.stringify(props.imgsAccount);
      } else {
        jsonImgsAccount = props.imgsAccount;
      }
      newValue.imgsAccount = jsonImgsAccount;
    }



    // console.log("newValue", newValue)
    const response = await axios.get("https://hotpal.ru/api/base/vendor/update_userss.php", {
      params: newValue
    });
    // console.log('response user:', response);
    return true;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    // Возвращаем false или можем прокинуть ошибку вызывающему коду
    return false;
  }

};




export const deleteUsers = async (uid) => {
  // console.log('send', uid)
  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/delete_user.php", {
      params: {
        uid: uid,
      }
    });
    console.log('Все ок:', response);
    return true;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    // Возвращаем false или можем прокинуть ошибку вызывающему коду
    return false;
  }

};

