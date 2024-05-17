import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from "moment";

import RenderForm from 'components/forms/travel/Form';


import { addCardsDefault } from 'services/addListing';
import { getListing } from 'services/getListings';
import { deleteListing } from 'services/getListings';


const RoomsSearchPanel = ({
  formData,
  hotel,
  uid
}) => {


  const [stateTravelForm, setTravelStateForm] = useState(true);
  const [myTravel, setMyTravel] = useState(null);

  useEffect(() => {
    console.log('hotel.id', hotel);
    getListing('travel', 'travel', hotel.id).then((res) => {
      const foundTravel = res.find(el => el.userRef === uid && el.idHotel === hotel.id);
      if (foundTravel) {
        setTravelStateForm(false);
        setMyTravel(foundTravel);
      }
    });
  }, [hotel, uid]);

  const onDelete = (id) => {
    deleteListing('travel', id).then(res => {
      setTravelStateForm(true)
    })

  };

  const submitSuccess = () => {
    // console.log(formData.values, uid, hotel.id, hotel.images[0])

    const travelObj = {
      'dateTravel': formData.values.dateTravelRange,
      'address': hotel.address,
      'userRef': uid,
      'idHotel': hotel.id,
      'nameHotel': hotel.name,
      'imgHotel': hotel.images[0]
    }

    addCardsDefault(travelObj, 'travel').then(res => {
      setMyTravel(travelObj)
      setTravelStateForm(false)
    });
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
                onClick={() => { onDelete(myTravel.id) }}
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

