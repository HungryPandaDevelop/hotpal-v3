import axios from 'axios';


export const getUserSingle = async (uid) => {
  // console.log('uid', uid)
  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/get_single.php", {
      params: {
        uid: uid,
      }
    });
    console.log()
    return response.data;
  } catch (err) {
    console.error('Ошибка при выполнении запроса:', err);
    throw err;
  }

};

