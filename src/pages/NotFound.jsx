import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="stub"></div>
      <div className="content">
        <div className="page-404 main-full">
          <div className="page-404-text">
            Страница не найдена
          </div>
          <div className="btn-container">
            <Link className='btn btn--blue' to="/">Вернуться на главную</Link>
          </div>
        </div></div>
    </>
  )
}

export default NotFound
