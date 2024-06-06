import { useState } from 'react';

import { connect } from 'react-redux';


import RenderForm from 'components/forms/RenderForm';

import Popup from 'components/Popup';

import { checkDate } from 'base/forms/authFields';

import Section from "pages/main/Section"

// import { calculateAge } from 'pages/users/hooks/calculateAge';


import VkAuth from 'pages/auth/parts/VkAuth';

const RegDate = ({ formData, ActionFn }) => {



  const [dateAgree, setDateAgree] = useState(false);

  const renderBtn = () => {

    return (<>
      <h3>Регистрация</h3>
      <VkAuth
        btnText="Создать через Vk"
        birth={dateAgree}
      />
    </>)
  }

  const submitSuccess = () => {

    // const regValues = { dateBerth: formData.values.dateBerth, age: calculateAge(formData.values.dateBerth) }
    // ActionFn('SET_INFO_ACCOUNT', regValues);
    setDateAgree(formData.values.dateBerth);
  }


  return (
    <>
      <Popup
        statusPopup={true}
        linkBack={true}
      >
        {!dateAgree ? (
          <>
            <h3>Введите дату</h3>
            <RenderForm
              fields={checkDate}
              btnSubmitText="Подтвердить дату"
              submitSuccess={submitSuccess}

            /></>
        ) : (renderBtn())}
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

export default connect(mapStateToProps)(RegDate);
