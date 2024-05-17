
import { Link } from 'react-router-dom';


const PolitksCheck = ({ checkStatus, changeCheckStatus }) => {



  return (
    <div className="checkbox-custom">
      <div className='checkbox-custom-line'>
        <span className={checkStatus ? 'active' : ''} onClick={changeCheckStatus}></span>Нажимая "Создать", вы принимаете наши <Link to="/yslovia" > Условия. </Link>
      </div>
      <div>
        Чтобы узнать, как мы обрабатываем ваши данные, ознакомьтесь с нашей
        <Link to="/konf" > Политикой конфиденциальности</Link> и <Link to="/politic" > Политикой в отношении файлов Cookie.</Link>
      </div>

    </div>
  )
}

export default PolitksCheck
