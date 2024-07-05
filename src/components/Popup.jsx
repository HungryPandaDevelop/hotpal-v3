import { Link } from "react-router-dom"

const Popup = ({
  children,
  statusPopup,
  onShowPopup,
  linkBack
}) => {



  const closePopup = () => {
    onShowPopup(false)
  }

  return (
    <div className={`popup element-show ${(statusPopup) ? 'show' : ''}`} >
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
