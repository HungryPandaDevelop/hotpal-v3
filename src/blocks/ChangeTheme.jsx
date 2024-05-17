import { useState } from 'react';

import { connect } from 'react-redux';
import ActionFn from 'store/actions';

const ChangeTheme = ({ showDark, ActionFn }) => {
  // const [showDark, setShowDark] = useState(false);
  // console.log('showDark', showDark)
  const changeStyleSite = () => {

    if (showDark) {
      document.getElementsByTagName('body')[0].classList.remove("dark-theme");
    }
    else {
      document.getElementsByTagName('body')[0].classList.add("dark-theme");
    }
    ActionFn('DARK', { showDark: !showDark })
    // setShowDark(!showDark)
  }


  return (
    <div className={`change-style ${showDark ? 'active' : ''}`} onClick={changeStyleSite}></div>
  )
}

const mapStateToProps = (state) => {

  return {
    showDark: state.globalState.showDark,
  }
}

export default connect(mapStateToProps,
  {
    ActionFn
  })(ChangeTheme);