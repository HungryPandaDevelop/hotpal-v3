
const PersonalInfo = ({ user }) => {
  const {
    work,
    zodiac,
    tripPoint,
    orientation
  } = user;
  return (
    <>
      <h3></h3>
      <div className="personal-info">
        <ul className="ln">
          <li>
            <div className="personal-info-name"><i className="portfel-ico"></i><b>Работа:</b></div>
            <div className="personal-info-el">{work ? work : 'Не выбрано'}</div>
          </li>
          <li>
            <div className="personal-info-name"><i className="zodiak-ico"></i><b>Зодиак:</b></div>
            <div className="personal-info-el">{zodiac ? zodiac : 'Не выбрано'}</div>
          </li>
          <li>
            <div className="personal-info-name"><i className="celi-ico"></i><b>Цель поездки:</b></div>
            <div className="personal-info-el">{tripPoint ? tripPoint : 'Не выбрано'}</div>
          </li>
          <li>
            <div className="personal-info-name"><i className="orientacia-ico"></i><b>Ориентация:</b></div>
            <div className="personal-info-el">{orientation ? orientation : 'Не выбрано'}</div>
          </li>
        </ul>
      </div></>
  )
}

export default PersonalInfo