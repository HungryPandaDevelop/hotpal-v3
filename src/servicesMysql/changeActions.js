import axios from 'axios';


export const changeActions = async (props) => {
  // console.log('props', props);

  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/actions.php", {
      params: props
    });
    // console.log('Ответ php', response);

    return true;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    // Возвращаем false или можем прокинуть ошибку вызывающему коду
    return false;
  }

};

