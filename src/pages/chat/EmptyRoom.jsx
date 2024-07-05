import { Link } from "react-router-dom"

const EmptyRoom = () => {
  return (
    <div className="empty-room">
      <div className="empty-room-container">
        <h3>
          Для того, чтобы начать общение,
          Выберите себе собеседника
        </h3>
        <div className="btn-container">
          <a href='/users-catalog' className="btn btn--blue">Перейти к поиску</a>
        </div>
      </div>
    </div>
  )
}

export default EmptyRoom
