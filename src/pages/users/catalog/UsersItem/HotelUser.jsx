
const UserImg = ({ user }) => {

  const img = user.imgsAccount[0];

  return (
    <div className="hotels-users">
      <div className="hotels-users-logo">
        {/* {img ? <img src={user.imgsAccount[0]} alt="" /> : ''} */}
      </div>
    </div>
  )
}

export default UserImg
