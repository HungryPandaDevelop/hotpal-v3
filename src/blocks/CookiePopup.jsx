import { useState } from "react";
import { Link } from "react-router-dom";
const CookiePopup = () => {

  const [popupShow, setPopupShow] = useState(localStorage.getItem('cookie'));

  // console.log(localStorage.getItem('cookie'))

  const handleClick = () => {
    setPopupShow('no')

    localStorage.setItem('cookie', 'no');
  }

  if (popupShow === 'no') { return false; }

  return (
    <div className="popup show">
      <div className="popup-container">
        <div className="popup-hint">
          Мы обрабатываем файлы cookie, чтобы улучшить работу сайта. Оставаясь на нашем сайте, вы соглашаетесь с <Link to="/politic">Политикой cookie</Link>. Если вы хотите запретить обработку файлов cookie, отключите cookie в настройках вашего браузера.

        </div>
        <div className="btn-container">
          <div className="btn btn--blue" onClick={handleClick}>
            Согласен
          </div>
        </div>
      </div>

    </div>
  )
}

export default CookiePopup