import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import RenderForm from 'components/forms/travel/Form';

import axios from 'axios';

const RoomsSearchPanel = ({
  formData,
  hotel,
  uid
}) => {


  const [stateTravelForm, setTravelStateForm] = useState(true);
  const [myTravel, setMyTravel] = useState(null);

  useEffect(() => {

    axios.post("http://hotpal.ru:5000/api/hotel/findMy",
      {
        idHotel: hotel.id,
        uid: uid
      }).then(res => {
        console.log('res hotels', res)
        if (res.data.length > 0) {
          setTravelStateForm(false);
          setMyTravel(res.data[0]);
        }
      });

  }, []);

  const onDelete = async (id) => {


    const response = await axios.post("http://hotpal.ru:5000/api/hotel/delete",
      {
        _id: id
      });
    console.log(response);
    setTravelStateForm(true);

  };

  const submitSuccess = async () => {
    // console.log(formData.values, uid, hotel.id, hotel.images[0])

    const travelObj = {
      'dateTravel': formData.values.dateTravelRange,
      'address': hotel.address,
      'userRef': uid,
      'idHotel': hotel.id,
      'nameHotel': hotel.name,
      'imgHotel': hotel.images[0]
    }

    const response = await axios.post("http://hotpal.ru:5000/api/hotel/", travelObj);
    console.log('res hotels', response)
    setTravelStateForm(false);
    setMyTravel(response.data);


  }


  const renderWillThisPlace = () => {
    return (
      <div className="travel-add-panel border-container">
        <div className="main-grid">
          <div className="col-4 col-xs-12">
            <h3>Буду в этом отеле</h3>

          </div>
          <div className="col-4 col-xs-12">
            <div className="input-box">
              <label><b>Выбранные даты</b></label>
              <div className='travel-info-date'>{myTravel.dateTravel}</div>
            </div>

          </div>
          <div className="col-4 col-xs-12">
            <div className="btn-container">
              <div
                className="btn btn--white"
                onClick={() => { onDelete(myTravel._id) }}
              >Изменить даты</div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (

    <>
      {stateTravelForm ? (<RenderForm
        initialValues={{ dateTravelRange: moment().format('DD.MM.YYYY') + ' - ' + moment().add(2, 'days').format('DD.MM.YYYY') }}
        submitSuccess={submitSuccess}
      />) : renderWillThisPlace()}

    </>

  )
}


const mapStateToProps = (state) => {

  return {
    uid: state.account.uid,
    formData: state.form.usersSearch,
  }
}

export default connect(mapStateToProps)(RoomsSearchPanel);

