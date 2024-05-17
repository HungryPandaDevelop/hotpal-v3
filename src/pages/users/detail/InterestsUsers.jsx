
const InterestsUsers = ({ user, special }) => {

  let { interests } = user;

  let interestsJson = [];

  if (typeof interests === 'object') {
    interestsJson = interests
  } else if (interests.length > 0) {
    interestsJson = JSON.parse(interests);
  }



  return (
    <div className={`tags-container ${special}`}>
      <h3>Интересы:</h3>
      {(interestsJson === null || interestsJson === undefined || interestsJson.length === 0) ? 'Cписок интересов пуст' : interestsJson.map((interest, index) => (
        <div className="tag" key={index}>{interest} </div>
      ))
      }
    </div>
  )
}

export default InterestsUsers