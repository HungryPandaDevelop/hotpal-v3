
const GoalsUsers = ({ user }) => {

  const { goals } = user;

  let goalsJson = [];


  if (typeof goals === 'object') {
    goalsJson = goals
  } else if (goals !== 'Array' && goals.length > 0) {
    goalsJson = JSON.parse(goals);
  }

  return (
    <div className="tags-container">
      <h3>Цели:</h3>
      {(goalsJson === null || goalsJson === undefined || goalsJson.length === 0) ? 'Cписок целей пуст' : goalsJson.map((goal, index) => (
        <div className="tag" key={index}><span dangerouslySetInnerHTML={{ __html: goal }}></span> </div>
      ))
      }
    </div>
  )
}

export default GoalsUsers