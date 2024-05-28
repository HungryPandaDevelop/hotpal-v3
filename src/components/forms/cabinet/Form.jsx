
import { reduxForm } from 'redux-form';

import { useState } from 'react';

import RenderInput from 'components/input/RenderInput';

import { fields } from './fields';

import { calculateAge } from 'pages/users/hooks/calculateAge';

import Travel from 'pages/cabinet/Travel';

const TemplateForm = (props) => {
  const {
    waitAnsw,
    submitSuccess,
    user,
    dirty,
    invalid,
  } = props;



  const [checkErrorSubmit, setCheckErrorSubmit] = useState(false);


  const onSubmit = (e) => {
    let idTimeCheck;
    e.preventDefault();

    if (invalid) {

      setCheckErrorSubmit(true);

      clearTimeout(idTimeCheck);

      idTimeCheck = setTimeout(() => {
        setCheckErrorSubmit(false);
      }, 3000);

    } else {

      submitSuccess();

    }
  };





  return (
    <form >
      <div className="border-container border-container-cabinet border-null-left">

        <div className="main-grid">
          <div className="col-xs-12 slider-cabinet-mobile">
            <RenderInput
              type="single"
              fields={fields.imgsAccount}
              onSubmit={onSubmit}
            />
          </div>
          <div className="col-8 col-sm-6 col-xs-12">

            <div className="user-top-info--view">
              <h2>
                {user.name}
                {user.dateBerth && ', ' + calculateAge(user.dateBerth)}
                {user.verificationCheck ? (<div className="verification-ico"></div>) : <div className="verification-hint">Вы не верифицированы</div>}
              </h2>

              <div className='input-box'>
                <RenderInput
                  type="single"
                  fields={fields.dateBerth}
                  checkErrorSubmit={checkErrorSubmit}
                />


              </div>
              <RenderInput
                type="single"
                fields={fields.gender}
              />

            </div>
            <RenderInput
              type="single"
              fields={fields.goals}
            />
            <div className="travel-user">
              <div className='travel-current'>
                <RenderInput
                  type="single"
                  fields={fields.hotelFind}
                />
                <RenderInput
                  type="single"
                  fields={fields.hotelDate}
                />
              </div>
              <div className="travel-story">
                <h3>Будущие путешествия</h3>
                <Travel />
              </div>
            </div>
          </div>
          <div className="slider-cabinet-desktop col-4 col-sm-6">
            <RenderInput
              type="single"
              fields={fields.imgsAccount}
              onSubmit={onSubmit}
            />
          </div>

          <div className="col-12 hidden-xs">
            <div className="border-delimetr border-account"></div>
          </div>

          <RenderInput
            type="single"
            fields={fields.interests}
          />

          <div className="col-4  col-sm-6 col-xs-12">
            <div className="personal-info">
              <ul className="ln">
                <li>
                  <div className="personal-info-name"><i className="portfel-ico"></i><b>Работа:</b></div>
                  <div className="personal-info-value">
                    <RenderInput
                      type="single"
                      fields={fields.work}
                      checkErrorSubmit={checkErrorSubmit}

                    />
                  </div>
                </li>
                <li>
                  <div className="personal-info-name"><i className="zodiak-ico"></i><b>Зодиак:</b></div>
                  <div className="personal-info-value">
                    <RenderInput
                      type="single"
                      fields={fields.zodiac}
                      checkErrorSubmit={checkErrorSubmit}
                    />
                  </div>
                </li>
                <li>
                  <div className="personal-info-name"><i className="celi-ico"></i><b>Цель поездки:</b></div>
                  <div className="personal-info-value">
                    <RenderInput
                      type="single"
                      fields={fields.tripPoint}
                      checkErrorSubmit={checkErrorSubmit}

                    />
                  </div>
                </li>
                <li>
                  <div className="personal-info-name"><i className="orientacia-ico"></i><b>Ориентация:</b></div>
                  <div className="personal-info-value">
                    <RenderInput
                      type="single"
                      fields={fields.orientation}
                      checkErrorSubmit={checkErrorSubmit}

                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 user-description">
            <RenderInput
              type="single"
              fields={fields.description}
              checkErrorSubmit={checkErrorSubmit}

            />
            <div className={`btn-save-outer ${dirty ? 'active' : ''}`}>
              <div className="main-full">
                <span>Вы внесли изменения, сохранитесь</span>
                <button className="btn btn--blue" onClick={(e) => { onSubmit(e); }} >
                  {waitAnsw ? (<>Loading...</>) : (
                    <>Сохранить</>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </form >
  )
}



export default reduxForm({
  form: 'formCabinet',
  enableReinitialize: true,
})(TemplateForm);


