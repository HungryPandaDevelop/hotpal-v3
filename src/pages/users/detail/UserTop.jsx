import { calculateAge } from 'pages/users/hooks/calculateAge';

const UserTop = ({ user }) => {
  return (
    <div className="user-top-info--view">
      <h2>{user.name} {user.verificationCheck ? (<div className="verification-ico"></div>) : ''} {user.dateBerth && ',' + calculateAge(user.dateBerth)}</h2>

      <div className="user-info-gender">
        {user.gender && user.gender === 'man' ? (
          <div><span>Пол:</span><b>M</b>
            <div className="man-ico"></div>
          </div>) : (
          <div><span>Пол:</span><b>Ж</b>
            <div className="woman-ico"></div>
          </div>
        )}

      </div>
    </div>
  )
}

export default UserTop