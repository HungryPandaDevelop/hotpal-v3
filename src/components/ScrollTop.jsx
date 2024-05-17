import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Перемотка страницы вверх при смене маршрута
  }, [pathname]);

  return null; // Этот компонент не рендерит ничего
}

export default ScrollTop;