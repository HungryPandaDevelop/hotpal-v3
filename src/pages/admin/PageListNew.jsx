import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { pagesFields } from 'base/forms/pagesFields';
import RenderForm from 'components/forms/RenderForm';
import { addCardsDefault } from 'services/addListing';

import { connect } from 'react-redux';


const PageList = ({ formData, account }) => {




  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!sessionStorage.getItem('password') === apiKey) {
      navigate('/page-list')
    }


  }, [])


  const submitSuccess = () => {
    addCardsDefault(formData.values, 'pages').then(res => {
      navigate('/page-list')
    });

  };




  return (

    <div>
      <div className="stub"></div>
      <div className="main-full">
        <h1>Новая страница</h1>
        <Link to='/page-list' className="btn btn--blue">К списку страниц</Link>
        <RenderForm
          btnSaveText="Добавить страницу"
          fields={pagesFields}

          btnSubmiText="Сохранить"
          // initialValues={listings}
          submitSuccess={submitSuccess}

        />
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {

  return {
    formData: state.form.singleInput,
  }
}

export default connect(mapStateToProps)(PageList);

