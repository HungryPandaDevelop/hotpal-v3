import { saveListing } from 'services/saveListing';

const RenderUserBtn = ({ like, status, textBtn }) => {

  const onSetStatus = () => {
    let newData;
    console.log('newData', newData)
    if (like.status === 'agree') {
      newData = { ...like, status: 'see' }
    }
    else {
      newData = { ...like, status: 'agree' }
    }
    saveListing(newData, like.id, 'likes')

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
