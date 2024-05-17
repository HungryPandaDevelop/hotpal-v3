import Popup from 'components/Popup';
import Section from "pages/main/Section";


import { connect } from 'react-redux';
import ActionFn from 'store/actions'

import RenderForm from 'components/forms/RenderForm';
import { inputs } from 'components/forms/google/inputs';
import { timestampCustomDayTime } from 'services/timestampCustom';
import { calculateAge } from 'pages/users/hooks/calculateAge';

import { useLocation, useNavigate } from 'react-router-dom';

import { addUsers } from 'servicesMysql/changeUsers';

const RegGEnd = ({ formData, ActionFn }) => {

  const navigate = useNavigate();



  let regValues;

  const location = useLocation();


  const submitSuccess = () => {

    const { gender, dateBerth, imgsAccount } = formData.values;

    let imgsAccountCheck = imgsAccount ? imgsAccount : [];

    imgsAccountCheck = JSON.stringify(imgsAccountCheck);



    regValues = {
      name: location.state?.name,
      email: location.state?.email,
      uid: location.state?.id,
      dateBerth: dateBerth,
      age: calculateAge(dateBerth),
      imgsAccount: imgsAccountCheck,
      gender: gender,
      entranceDate: timestampCustomDayTime(),
      registerationDate: timestampCustomDayTime()
    }




    addUsers(regValues).then(() => {

      console.log('Регистрация успешна');
      ActionFn('SET_INFO_ACCOUNT', regValues);
      localStorage.setItem('account', JSON.stringify(regValues))

      navigate('/cabinet');
    });
  }

  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>Регистрация</h3>


        <RenderForm
          submitSuccess={submitSuccess}
          fields={inputs}
          btnSubmitText="Регистрация"
        />


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

export default connect(mapStateToProps, { ActionFn })(RegGEnd);