import RenderForm from 'components/forms/RenderForm';
import { settingsPrivacy } from 'base/forms/settingsFields';
// import { saveListing } from 'services/saveListing';

import { updateUser } from 'servicesMysql/changeUsers';

const Privacy = ({ formData, account }) => {

  const submitSuccess = () => {

    // let sendData = { ...account, ...formData.values };
    // console.log('sendData', sendData)
    updateUser({ uid: account.uid, ...formData.values });

    // saveListing(formData.values, uid, 'users');

  }

  return (
    <RenderForm
      fields={settingsPrivacy}
      btnSubmitText="Сохранить"
      initialValues={account}
      submitSuccess={submitSuccess}

    />
  )
}

export default Privacy;
