import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionFn from 'store/actions';
import RenderForm from 'components/forms/RenderForm';
import { inputs } from 'components/forms/regMail/inputs';

import Popup from 'components/Popup';
import Section from "pages/main/Section"

import { v4 as uuidv4 } from 'uuid';
import { addUsers } from 'servicesMysql/changeUsers';

import { timestampCustomDayTime } from 'services/timestampCustom';
import { calculateAge } from 'pages/users/hooks/calculateAge';
const RegMail = ({ formData, ActionFn }) => {

  const navigate = useNavigate();


  const submitSuccess = async () => {

    const { imgsAccount = [], dateBerth, ...otherValues } = formData.values;

    const stringifiedImgsAccount = JSON.stringify(imgsAccount);
    const generateId = uuidv4();
    // console.log('otherValues', otherValues)

    const newUserData = {
      ...otherValues,
      uid: generateId,
      verificationId: generateId,
      registerationDate: timestampCustomDayTime(),
      dateBerth: dateBerth,
      age: calculateAge(dateBerth),
      imgsAccount: stringifiedImgsAccount,
    };

    const response = await addUsers(newUserData);
    console.log('response', response)
    if (response === 'reg') {
      console.log('Регистрация успешна');

      ActionFn('SET_INFO_ACCOUNT', newUserData);

      navigate('/reg-end', {
        state:
          { verificationId: generateId }
      });

    } else if (response === 'no') {
      console.log('Такой user уже есть');
    }


  }


  return (
    <>
      <Popup
        showStart={true}
        linkBack={true}
      >
        <h3>Заполните анкету</h3>

        <RenderForm
          fields={inputs}
          btnSubmitText="Регистрация"
          submitSuccess={submitSuccess}

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

export default connect(mapStateToProps, { ActionFn })(RegMail);
