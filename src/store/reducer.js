import { ADD } from "./action-types"

const defaultInitial = {
  num: 0,
}
const reducer = (state = defaultInitial, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1,
      }
    default:
      return state
  }
}

export default reducer
