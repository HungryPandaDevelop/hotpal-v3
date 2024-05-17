import { renderGoals } from 'pages/users/hooks/renderGoals';


const GoalsUsers = ({ user, account }) => {

  const { goals } = user;
  // console.log('goals', goals)

  if (goals === undefined || goals === null || goals === 'null') { return false; }

  if (goals.length === 0) { return false; }

  if (user.setting_goals) {
    if (user.setting_goals !== account.orientation) {
      return false;
    }
  }

  let goalsJson = [];

  if (typeof goals === 'object') {
    goalsJson = goals
  } else if (goals !== 'Array') {
    goalsJson = JSON.parse(goals);
  }



  return (
    <div className="goals-users">
      {goalsJson.map((item, index) => (
        <div key={index}>
          <div className="goals-users-tag">{renderGoals(item)}</div>
        </div>))
      }
    </div>
  )
}

export default GoalsUsers
