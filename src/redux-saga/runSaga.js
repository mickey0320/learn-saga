import { PUT, TAKE } from "./effectTypes"

function runSaga(dispatch, channel, saga) {
  const it = saga()
  function next(value) {
    const { value: effect, done } = it.next(value)
    if (!done) {
      switch (effect.type) {
        case TAKE:
          channel.take(effect.actionType, next)
          break
        case PUT:
          dispatch(effect.action)
          break
        default:
          break
      }
    }
  }
  next()
}

export default runSaga
