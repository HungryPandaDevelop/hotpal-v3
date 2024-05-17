
let rooms = [];

export const chatReducer = (state=rooms, action) => {
  switch(action.type){
    case 'SET_ROOMS':
      return [...action.payload]
    default: 
      return state
  }
}