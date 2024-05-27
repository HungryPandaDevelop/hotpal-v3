
let globalState = {
  likes: [],
  rooms: [],
  panelState: false,
  panelName: '',
  panelId: '',
  showDark: false
};

export const globalReducer = (state = globalState, action) => {

  switch (action.type) {
    // case 'SET_LIKES':
    //   return { ...state, ...action.payload, }
    // case 'SET_ROOMS':
    //   return { ...state, ...action.payload, }
    // case 'SET_CURRENT_ROOM':
    //   return { ...state, ...action.payload, }
    // case 'SET_CURRENT_USER_ROOM':
    //   return { ...state, ...action.payload, }
    case 'STATE_PANEL':
      return { ...state, ...action.payload, }
    case 'DARK':
      return { ...state, ...action.payload, }
    case 'SET_GLOBAL':
      return { ...state, ...action.payload, }
    default:
      return state
  }
}