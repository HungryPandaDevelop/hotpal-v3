
let globalState = {
  likes: [],
  rooms: [],
  panelState: false,
  panelName: '',
  panelId: '',
  showDark: false,
  currentRoomPanel: false,
  currentUserInRoomPanel: false
};

export const globalReducer = (state = globalState, action) => {

  switch (action.type) {
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