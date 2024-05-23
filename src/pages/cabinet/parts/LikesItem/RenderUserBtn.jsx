// import { saveListing } from 'services/saveListing';
import axios from 'axios';

const RenderUserBtn = ({ like, status, textBtn }) => {

  const onSetStatus = () => {


    if (like.status === 'agree') {
      like.status = 'see'
    }
    else {
      like.status = 'agree'
    }
    // saveListing(newData, like._id, 'likes')

    axios.post("http://hotpal.ru:5000/api/like/edit", {
      ...like,
    }).then(res => {
      console.log('ok', res)
    });
  }

  return (
    <div
      className={`like-status-btn ${status}-like-btn ${like.status === status ? 'active' : ''}`}
      onClick={() => { onSetStatus(status) }}
      title={textBtn}
    ></div>
  )
}

export default RenderUserBtn
