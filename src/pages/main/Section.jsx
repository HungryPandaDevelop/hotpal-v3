import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import img1 from 'default/frontend/images/partners/1.svg'
import img2 from 'default/frontend/images/partners/2.svg'
import img3 from 'default/frontend/images/partners/3.svg'
import img4 from 'default/frontend/images/partners/4.svg'

import img1w from 'default/frontend/images/partners/1_white.svg'
import img2w from 'default/frontend/images/partners/2_white.svg'
import img3w from 'default/frontend/images/partners/3_white.svg'
import img4w from 'default/frontend/images/partners/4_white.svg'



const Section = ({ account }) => {
  // const navigate = useNavigate();

  useEffect(() => {
    if (account.uid) {
      // navigate('/users-catalog');
    }
  }, [account]);

  return (
    <>
      <section className="main-home">
        <div className="main-home-img img-cover" >

        </div>
        <div className="main-home-content main-full">
          <div className="main-home-info">
            <h1>Знакомства в отелях</h1>
            {!account.uid && (
              <div className="btn-container">
                <Link className="element-btn btn btn--black" to="/reg-start">Создать аккаунт</Link>
                <Link className="element-btn btn btn--white btn-in-mobile" to="/auth-start">Войти</Link>
              </div>
            )}

          </div>
        </div>
      </section>
      <section className="home-simple-text">
        <div className="main-full">
          <h2>Как это работает?</h2>
          <div className="text">
            Около 35% в мире людей одиноки. Среди множества локаций знакомство в отеле является одним из лучших. Вы расслаблены, настроены на отдых и  новые приключения.
            Создавая Hotpal, мы решили облегчить вам поиск партнера и сделать ваш отпуск или деловую поездку увлекательной и незабываемой!
          </div>
        </div>
      </section>
      <section className="partners-home">
        <div className="partners-container main-full partners-white">
          <div className="partners-item"> <img src={img1} alt="" /></div>
          <div className="partners-item"> <img src={img2} alt="" /></div>
          <div className="partners-item"> <img src={img3} alt="" /></div>
          <div className="partners-item"> <img src={img4} alt="" /></div>
        </div>
        <div className="partners-container main-full partners-black">
          <div className="partners-item"> <img src={img1w} alt="" /></div>
          <div className="partners-item"> <img src={img2w} alt="" /></div>
          <div className="partners-item"> <img src={img3w} alt="" /></div>
          <div className="partners-item"> <img src={img4w} alt="" /></div>
        </div>
        <div className="btn-container">
          <Link className='btn btn--white' to='/hotels-catalog'>Выберите свой отель</Link>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account
  }
}

export default connect(mapStateToProps)(Section);