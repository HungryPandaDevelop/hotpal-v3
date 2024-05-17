import RenderForm from 'components/forms/RenderForm';
import { settingsPassword } from 'base/forms/settingsFields';
// import { changePassword } from 'services/changePassword';
const Passwords = () => {

  const submitSuccess = ({ formData }) => {

    // changePassword(formData.values);

  }

  return (
    <RenderForm
      fields={settingsPassword}
      btnSubmitText="Поменять пароль"
      submitSuccess={submitSuccess}

    />
  )
}

export default Passwords
