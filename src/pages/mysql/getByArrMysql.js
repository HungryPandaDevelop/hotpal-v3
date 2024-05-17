import axios from 'axios';


export const getByArrMysql = async (arr_uid) => {
  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/get_by_array.php", {
      params: {
        arr_uid: arr_uid,
      }
    });
    console.log('response ARRA', response)
    return response;
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    throw err;
  }

};

