// localStorage.removeItem('account');

let sessionAccount = localStorage.getItem('account') && JSON.parse(localStorage.getItem('account'));
console.log('getItem', sessionAccount)
let accounInfo = sessionAccount ? sessionAccount : {
  uid: '',
  // loaded: true
};

export const accountReducer = (state = accounInfo, action) => {
  switch (action.type) {
    case 'SET_INFO_ACCOUNT':
      console.log('a', action.payload)
      return { ...state, ...action.payload, }
    case 'EXIT_ACCOUNT':
      // console.log('a', accounInfo)
      return { uid: '', loaded: true }
    default:
      return state
  }
}