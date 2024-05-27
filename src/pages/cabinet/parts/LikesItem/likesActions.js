import axios from 'axios';


export const onRead = (like, uid) => {
  if (!like.read && like.interlocutors[0] !== uid) {
    like = { ...like, read: true }

    axios.post("http://hotpal.ru:5000/api/like/edit", {
      ...like,
    }).then(res => {
      console.log('ok', res)
    });
  }
}

export const onDelete = (like) => {

  axios.post("http://hotpal.ru:5000/api/like/delete", {
    ...like,
  }).then(res => {
    console.log('ok', res)
  });

}