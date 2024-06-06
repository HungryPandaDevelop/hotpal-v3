import { Link } from "react-router-dom"

const Popup = ({
  children,
  showStart,
  showPopup,
  linkBack
}) => {



  const closePopup = () => {
    showPopup(false)
  }

  return (
    <div className={`popup element-show ${(showStart) ? 'show' : ''}`} >
      <div className="popup-overlay"></div>
      <div className="popup-container">

        {linkBack ? (
          <Link to="/" className="btn-close close-btn--popup" ></Link>
        ) : (
          <i className="btn-close close-btn--popup" onClick={closePopup}></i>
        )}

        {children}
      </div>
    </div>
  )
}

export default Popup
