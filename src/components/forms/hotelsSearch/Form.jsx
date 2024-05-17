import RenderInput from 'components/input/RenderInput';

import { reduxForm } from 'redux-form';

import { useState } from 'react';

import { input } from './input';

// import Tabs from 'components/forms/formSearch/Tabs';

const HotelsSearchPanelMap = (props) => {




  const {

    waitAnsw,
    submitSuccess,


  } = props;



  const onSubmit = (e) => {
    e.preventDefault();

    submitSuccess();

  };

  const [showMobile, setShowMobile] = useState(false);


  return (
    <div className={`border-search-hotels ${showMobile ? 'active' : ''}`}>
      {/* <Tabs active="hotels" /> */}
      <div className="show-filter-mobile-container">
        <div className={`show-filter-mobile ${showMobile ? 'active' : ''}`} onClick={() => { setShowMobile(!showMobile) }}>
        </div>
      </div>
      <div className={`border-container border-null-left border-container-search hotels-search-panel`}>

        <div className="main-grid">
          <div className="col-6 col-xs-12">
            <RenderInput
              type="single"
              fields={input.hotelFind}
            />
          </div>
          <div className="col-6 col-xs-12">
            <RenderInput
              type="single"
              fields={input.dateRange}
            />
          </div>
          <div className="btn-container">
            <button className="btn--blue btn" onClick={onSubmit} >
              {waitAnsw ? (<>Loading...</>) : (
                <><i></i><span>Начать поиск</span></>
              )}
            </button>
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