import RenderInput from 'components/input/RenderInput';


import { reduxForm } from 'redux-form';

import { useState } from 'react';
import { inputs } from './inputs';
// import Tabs from 'components/forms/formSearch/Tabs';

const HotelsSearchPanelMap = (props) => {




  const {
    waitAnsw,
    submitSuccess,
    initialValues,
    loading,
    listingsCoords
  } = props;



  const onSubmit = (e) => {
    e.preventDefault();

    submitSuccess();

  };

  const [showMobile, setShowMobile] = useState(false);
  const [getCoords, setGetCoords] = useState(initialValues.geoHotels);

  // const mutateValue = {...fields.geoHotels, cityName: 'testing'};

  return (
    <div className={`border-search-hotels ${showMobile ? 'active' : ''}`}>
      {/* <Tabs active="hotels-map" /> */}
      <div className="show-filter-mobile-container">
        <div className={`show-filter-mobile ${showMobile ? 'active' : ''}`} onClick={() => { setShowMobile(!showMobile) }}>
        </div>
      </div>
      <div className={`border-container border-null-left border-container-search`}>

        <div className="main-grid">
          <div className="col-6 col-xs-12">
            <RenderInput
              type="single"
              fields={{ ...inputs.yaString, setGetCoords: setGetCoords }}
            />
            <RenderInput
              type="single"
              fields={inputs.dateRange}
            />
            <div className="btn-container">
              <button className="btn--blue btn" onClick={onSubmit} >
                {waitAnsw ? (<>Loading...</>) : (
                  <><i></i><span>Начать поиск</span></>
                )}
              </button>
            </div>

          </div>
          <div className="col-6">
            <RenderInput
              type="single"
              fields={{ ...inputs.geoHotels, loading: loading, listingsCoords: listingsCoords, getCoords: getCoords }}
            />

          </div>
        </div>
      </div>
    </div>
  )
}


export default reduxForm({
  form: 'hotelsSearch',
  enableReinitialize: true,
})(HotelsSearchPanelMap);