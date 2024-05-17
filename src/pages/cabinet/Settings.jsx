



import { useState } from 'react';

import SettingTabs from 'pages/cabinet/settings/SettingTabs';

import ActionFn from 'store/actions';
// import { getSingleListing } from 'services/getSingleListing';


import { connect } from 'react-redux';

import PasswordsTabs from 'pages/cabinet/settings/Passwords';
import PersonalDataTabs from 'pages/cabinet/settings/PersonalData';
import PrivacyTabs from 'pages/cabinet/settings/Privacy';


import Tabs from 'pages/cabinet/parts/Tabs';

const Cabinet = ({ account, formData, ActionFn }) => {

  const [currentTab, setCurrentTab] = useState(0);



  const renderTabs = (num) => {
    switch (num) {
      case 0:
        return (
          <PasswordsTabs
            formData={formData}
          />
        )
      case 1:
        return (
          <PersonalDataTabs
            formData={formData}
            uid={account.uid}
            account={account}
            ActionFn={ActionFn}
          />
        )
      case 2:
        return (
          <PrivacyTabs
            formData={formData}
            uid={account.uid}
            account={account}
          />
        )
      default:
    }
  }

  if (account.loaded) { return 'Loading...' }

  return (
    <>
      <div className="stub"></div>
      <div className="main-full">
        <Tabs
          active={1}

        />
        <SettingTabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />

        <div className="border-container border-null-top account-main" >
          {renderTabs(currentTab)}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account,
    formData: state.form.singleInput,
  }
}

export default connect(mapStateToProps, { ActionFn })(Cabinet);

