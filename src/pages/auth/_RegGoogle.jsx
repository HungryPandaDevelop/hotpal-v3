import { useState } from 'react';

import { connect } from 'react-redux';
import ActionFn from 'store/actions';

import Popup from 'components/Popup';

import RenderForm from 'components/forms/google/Form';

import Section from "pages/main/Section"

import { timestampCustomDayTime } from 'services/timestampCustom';
import { calculateAge } from 'pages/users/hooks/calculateAge';


import GoogleAuth from 'pages/auth/parts/GoogleAuth';

const RegDate = ({ formData, ActionFn }) => {



  const [showErrAge, setShowArrAge] = useState(false);
  const [showErrPhoto, setShowArrPhoto] = useState(false);

  const [showBtn, setShowBtn] = useState(false);
  const [googleValue, setGoogleValue] = useState([]);

  const renderBtn = () => {

    return (<>
      <h3>Регистрация</h3>
      {<GoogleAuth
        googleValue={googleValue}
        btnText="Создать через Gmail"
        checkStatus={true}
        typeIn="reg"
      />}
    </>)
  }


  let imgsAccountSize;
  let regValues;

  const submitSuccess = () => {

    const { gender, dateBerth, imgsAccount } = formData.values;

    let imgsAccountCheck = imgsAccount ? imgsAccount : [];
    imgsAccountSize = imgsAccountCheck.length;
    imgsAccountCheck = JSON.stringify(imgsAccountCheck);


    regValues = {
      dateBerth: dateBerth,
      age: calculateAge(dateBerth),
      imgsAccount: imgsAccountCheck,
      gender: gender,
      entranceDate: timestampCustomDayTime(),
      registerationDate: timestampCustomDayTime()
    }

    console.log('formData.age', regValues)

    if (regValues.age < 18 || imgsAccountSize < 1) {
      setShowArrAge(regValues.age < 18);
      setShowArrPhoto(imgsAccountSize < 1);
      setShowBtn(false);
    } else {
      setShowArrAge(false);
      setShowArrPhoto(false);
      setShowBtn(true);
    }



    setGoogleValue(regValues);

    ActionFn('SET_INFO_ACCOUNT', regValues);

  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        {!showBtn ?
          (
            <>
              <h3>Введите дату</h3>

              <RenderForm
                btnSubmitText="Продолжить регистрацию"
                regValues={regValues}
                submitSuccess={submitSuccess}
                showErrAge={showErrAge}
                showErrPhoto={showErrPhoto}
              />
            </>) : renderBtn()}



      </Popup>
      <Section />
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    formData: state.form.singleInput,
  }
}

export default connect(mapStateToProps, { ActionFn })(RegDate);
