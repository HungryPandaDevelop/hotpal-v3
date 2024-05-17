import { userImg } from 'pages/users/catalog/UsersItem/userImg';

const RemderImg = ({ user }) => {
  return (
    <div className="like-img img-use-bg" style={userImg(user)}> </div>
  )
}

export default RemderImg
