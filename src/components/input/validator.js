import { calculateAge } from 'pages/users/hooks/calculateAge';

const required = (value) => {
  if (value) {
    return undefined;
  }
  return 'Обязательное поле'
}

const minLength = (value) => {
  if (value && value.length < 2) {
    return 'Минимум 2 символа';
  }
  return undefined;
}

const minLengthPass = (value) => {
  if (value && value.length < 6) {
    return 'Минимум 6 символов';
  }
  return undefined;
}

const mailCheck = (value) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (value && regex.test(value)) {
    return undefined;
  }
  return 'Неправильно введена почта';
}
const minAge = (value) => {
  console.log('min age', value, calculateAge(value))
  if (calculateAge(value) < 18) {
    return 'Вам нет 18 лет, регистрация невозможна!';
  }
  return undefined;

}

// const latCheck = (value) => {
//   const regex = /^[A-Za-z]+$/;
//   if (value && regex.test(value)) {
//     return undefined;
//   }
//   return 'Только английские символы';
// }

export const createValidateArr = (validate) => {

  if (!validate) { return false; }

  const validatorsMap = {
    'required': required,
    'minLength': minLength,
    'minLengthPass': minLengthPass,
    'mailCheck': mailCheck,
    'minAge': minAge,
    // 'latCheck': latCheck,
  };

  return validate.reduce((arr, index) => {
    const validator = validatorsMap[index];
    if (validator) {
      arr.push(validator);
    }
    return arr;
  }, []);

}