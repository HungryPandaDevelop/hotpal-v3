import axios from 'axios';


// export const addLikes = async (props) => {

//   try {
//     const response = await axios.get("https://hotpal.ru/api/base/vendor/create_likes.php", {
//       params: props
//     });

//     console.log('Ответ php', response);
//     return true;
//   }
//   catch (err) {
//     console.error('Ошибка при отправке данных:', err);

//     return false;
//   }

// };

export const deleteLikes = async (id_like) => {

  try {
    const response = await axios.get("https://hotpal.ru/api/base/vendor/delete_likes.php", {
      params: {
        id_like: id_like,
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

