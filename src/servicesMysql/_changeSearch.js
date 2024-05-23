import axios from 'axios';


export const addSearch = async (props) => {
  console.log(props);
  let transformData = { ...props, rangeBerth: JSON.stringify(props.rangeBerth), goals: JSON.stringify(props.goals), }
  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/create_search.php", {
      params: transformData
    });
    console.log('Ответ search', response);
    return true;
  }
  catch (err) {
    console.error('Ошибка при отправке данных:', err);

    // Возвращаем false или можем прокинуть ошибку вызывающему коду
    return false;
  }

};

