import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { accountReducer } from 'store/reducers/accountReducer';
// import {chatReducer} from 'store/reducers/chatReducer';
import { globalReducer } from 'store/reducers/globalReducer';


const rootReducer = combineReducers({
  form: formReducer,
  account: accountReducer,
  globalState: globalReducer,
});

export default rootReducer;
