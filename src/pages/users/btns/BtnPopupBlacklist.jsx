import { Link } from "react-router-dom"

const BtnPopupLikes = () => {
  return (
    <>
      <h3 className="popup-topic">
        Выбранный вами
        пользователь был успешно
        заблокирован.
      </h3>
      <div className="popup-text">
        Если вы захотите вновь разблокировать кого-то,
        то вы можете это сделать в <Link to="/cabinet/dislikes">черном списке</Link> в ваших Настройках.
      </div>
    </>
  )
}

export default BtnPopupLikes
