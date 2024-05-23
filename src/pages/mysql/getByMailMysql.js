import axios from 'axios';


export const getByMailMysql = async (email) => {
  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/get_single_by_mail.php", {
      params: {
        email: email,
      }
    });
    console.log('get mail', response.data)
    return response.data;
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    throw err;
  }

};

