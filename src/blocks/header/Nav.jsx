import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <ul>
      <li>
        <Link to="/users-catalog">Все Пользователи</Link>
      </li>
      <li>
        <Link to="/hotels-catalog">Все Отели</Link>
      </li>
      <li>
        <Link to="/hotels-catalog-map">Все Города</Link>
      </li>
      {/* <li>
        <Link to="/support">Поддержка</Link>
      </li>
      <li>
        <Link to="/safety">Безопасность</Link>
      </li> */}
      {/* <li>
        <Link to="/about">О Нас</Link>
      </li> */}
    </ul>
  )
};

export default Nav;
