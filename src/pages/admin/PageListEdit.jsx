import { Link, useNavigate } from "react-router-dom";
import { getSingleListing } from "services/getSingleListing"
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { pagesFields } from 'base/forms/pagesFields';
import RenderForm from 'components/forms/RenderForm';
import { saveListing } from 'services/saveListing';

import { connect } from 'react-redux';



const PageList = ({ formData, account }) => {


  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);


  const params = useParams();



  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!sessionStorage.getItem('password') === apiKey) {
      navigate('/page-list')
    }

    getSingleListing('pages', params.pageId).then((res) => {

      setListings(res);
      setLoading(false);
    })


  }, []);

  const submitSuccess = () => {
    saveListing(formData.values, params.pageId, 'pages').then(res => {
      navigate('/page-list')
    });

  };

  if (loading) { return 'Loading...' }



  return (

    <div>
      <div className="stub"></div>
      <div className="main-full">
        <h1>edit {listings.title}</h1>
        <Link to='/page-list' className="btn btn--blue">К списку страниц</Link>
        <RenderForm
          btnSaveText="Сохранить изменения"
          fields={pagesFields}
          initialValues={{ title: listings.title, content: listings.content }}
          btnSubmitText="Сохранить"
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

