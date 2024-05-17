import { calculateAge } from 'pages/users/hooks/calculateAge';

const NameUsers = ({ user }) => {


  return (
    <div className="name-users">
      <h3>
        <span>{user?.name}</span>
        {user.dateBerth ? (<span>, {calculateAge(user.dateBerth)}</span>) : ('')}
      </h3>
    </div>
  )
}

export default NameUsers
