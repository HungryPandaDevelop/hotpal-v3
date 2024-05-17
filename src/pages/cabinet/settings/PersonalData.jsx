import RenderForm from 'components/forms/RenderForm';
import { settingsPrivateData } from 'base/forms/settingsFields';
// import { saveListing } from 'services/saveListing';
// import { deleteListing } from 'services/getListings';

import { getAuth } from 'firebase/auth';
import { deleteAccount } from 'services/deleteAccount';
// import { useNavigate } from 'react-router-dom';


import { updateUser } from 'servicesMysql/changeUsers';

const PersonalData = ({ formData, account, ActionFn }) => {

  // 

  const submitSuccess = () => {


    // let sendData = { ...account, ...formData.values };


    updateUser({ uid: account.uid, ...formData.values });

  }

  const auth = getAuth();

  deleteAccount(auth, ActionFn)

  return (
    <>
      <RenderForm
        fields={settingsPrivateData}
        btnSubmitText="Сохранить"
        initialValues={account}
        submitSuccess={submitSuccess}
      >
        <span className="link-delete-account" onClick={deleteAccount}>Удалить Аккант</span>
      </RenderForm>


    </>
  )
}

export default PersonalData
