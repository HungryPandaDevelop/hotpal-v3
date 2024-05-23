

import { onUsersSearch } from 'pages/users/hooks/onUsersSearch';

import Form from 'components/forms/usersSearch/InHotels';

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


  const submitSuccess = () => {

    setSearchListing(onUsersSearch(listings, formData.values));

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
    <div className={`main-full search-users-panel`}>
      <Tabs active="users" />

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

