import { calculateAge } from 'pages/users/hooks/calculateAge';

import RenderForm from 'components/forms/cabinet/Form';

import { updateUser } from 'servicesMysql/changeUsers';

import { connect } from 'react-redux';

import Tabs from 'pages/cabinet/parts/Tabs';

import ActionFn from 'store/actions';



const Cabinet = ({
  formData,
  account,
  ActionFn
}) => {

  const submitSuccess = async () => {

    await updateUser({ uid: account.uid, ...formData.values, age: calculateAge(formData.values.dateBerth) });

    ActionFn('SET_INFO_ACCOUNT', { ...account, ...formData.values });

  };


  return (
    <>
      <div className="stub"></div>
      <div className="main-full cabinet-page">
        <Tabs active={0} />
        <RenderForm
          initialValues={account}
          user={account}
          submitSuccess={submitSuccess}
          newValue={formData}

        />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account,
    formData: state.form.formCabinet,
  }
}

export default connect(mapStateToProps, { ActionFn })(Cabinet);

