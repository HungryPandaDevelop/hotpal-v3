
let statusForm = false;

export const resetReducer = (state=statusForm, action) => {
  switch(action.type){
    case 'RESET_FORM':
      return {statusForm: !action.payload}
    default: 
      return state
  }
}