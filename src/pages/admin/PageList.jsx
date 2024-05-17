import { Link } from "react-router-dom";
import { getListing } from 'services/getListings';
import { useState, useEffect } from 'react'
import { deleteListing } from 'services/getListings';

const PageList = () => {


  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);


  const onDelete = (id) => {
    deleteListing('travel', id).then(res => {
      setListings(listings.filter(el => el.id !== id))
    })
  };


  const [enterPassword, setEnterPasswordPassword] = useState(false);


  const apiKey = process.env.REACT_APP_API_KEY;

  const enterPass = () => {
    let pass = sessionStorage.getItem('password');
    if (!pass) {
      pass = prompt('Введите пароль:');
    }

    if (pass === apiKey) {
      setEnterPasswordPassword(true);
      sessionStorage.setItem('password', pass);
    }
  }


  useEffect(() => {
    // sessionStorage.removeItem('password')
    enterPass();


    getListing('pages',).then((res) => {
      setListings(res);
      setLoading(false);
    });


  }, []);


  const renderListArea = () => {
    return (<>

      <Link to="/page-list-new" className="btn btn--blue">Новая страница</Link>
      <ul className="ln">
        {listings.map((el, index) => (
          <li key={index}>
            <h3>{el.title}</h3>
            {/* <Link to={`/page/${el.id}`} className="btn btn--blue">смотреть</Link> */}
            <Link to={{ pathname: `/page-list/${el.id}`, state: { password: true } }}>Редактировать</Link>
            {/* <div className="btn btn--blue-border" onClick={() => { onDelete(el.id) }}>Удалить</div> */}
          </li>
        ))}
      </ul ></>);
  }
  const renderNoListArea = () => {
    return (<>
      <h2>Введите пароль, для редактирования записей</h2>
      <div onClick={enterPass} className='btn btn--blue'>Ввести пароль</div>
    </>)
  }
  if (loading) { return 'Loading...' }



  return (

    <div>
      <div className="stub"></div>
      <div className="main-full">
        {enterPassword ? renderListArea() : renderNoListArea()}
      </div>
    </div>
  )
}

export default PageList