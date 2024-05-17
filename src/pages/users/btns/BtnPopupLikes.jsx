import { Link } from "react-router-dom"

const BtnPopupLikes = () => {
  return (
    <>
      <h3 className="popup-topic">
        Поздравляем!<br />
        Ваша симпатия
        отправлена.
      </h3>
      <div className="popup-text">
        Вы можете увидеть её в  <Link to="/cabinet/likes">личных симпатиях</Link>.
        Если ваш собеседник примет ваше предложение,
        то вы получите уведомление.
      </div>
    </>
  )
}

export default BtnPopupLikes
