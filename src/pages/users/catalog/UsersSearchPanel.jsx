
import { useState } from 'react';

import { onUsersSearch } from '../hooks/onUsersSearch';

import Form from 'components/forms/usersSearch/Form';

// import { addSearch } from 'servicesMysql/changeSearch';

import { connect } from 'react-redux';
import { timestampCustomDayTime } from 'services/timestampCustom';
import Tabs from 'blocks/Tabs';

import { changeActions } from 'servicesMysql/changeActions';
import { timestampCustomDay } from 'services/timestampCustom';

const UsersSearchPanel = ({
  formData,
  listings,
  setSearchListing,
  account,
}) => {

  const startValue = {}

  const [showMobile, setShowMobile] = useState(false);

  const submitSuccess = () => {

    setSearchListing(onUsersSearch(listings, formData.values));

    setShowMobile(false);

    // addSearch({ uid: account.uid, dateSearch: timestampCustomDayTime(), type: 'user-search', ...formData.values });

    changeActions({
      ...account,
      'uid': account.uid,
      'date': timestampCustomDay(),
      'action': 'searchUsers'
    });
  }
  const resetForm = () => {
    setSearchListing(onUsersSearch(listings, startValue));
  }

  return (
    <div className={`main-full search-users-panel ${showMobile ? 'active' : ''}`}>
      <Tabs active="users" />
      {showMobile ?
        <i className="btn-filter-user btn-filter-user--close" onClick={() => { setShowMobile(false) }}></i> :
        <i className="btn-filter-user btn-filter-user--show" onClick={() => { setShowMobile(true) }}></i>
      }


      <Form
        submitSuccess={submitSuccess}
        resetForm={resetForm}
      />

    </div>
  )
}

const mapStateToProps = (state) => {

  return {
    account: state.account,
    formData: state.form.usersSearch,
  }
}

export default connect(mapStateToProps)(UsersSearchPanel);

