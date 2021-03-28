import runSaga from "./runSaga"
import Channel from "./channel"

function createSagaMiddleware() {
  const channel = new Channel()
  let boundRunSaga
  const sagaMiddleware = ({ dispatch, getState }) => {
    boundRunSaga = runSaga.bind(null, dispatch, channel)
    return (next) => {
      return (action) => {
        next(action)
        channel.put(action)
      }
    }
  }

  sagaMiddleware.run = function (saga) {
    boundRunSaga(saga)
  }

  return sagaMiddleware
}

export default createSagaMiddleware
