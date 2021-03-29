import { PUT, TAKE, CALL, FORK } from "./effectTypes";

function runSaga(dispatch, channel, saga) {
  const it = typeof saga === "function" ? saga() : saga;
  function next(value) {
    const { value: effect, done } = it.next(value);
    if (done) return;
    if (typeof effect[Symbol.iterator] === "function") {
      runSaga(dispatch, channel, effect);
      next();
    } else if (typeof effect.then === "function") {
      effect.then(next);
    } else {
      switch (effect.type) {
        case TAKE:
          channel.take(effect.actionType, next);
          break;
        case PUT:
          dispatch(effect.action);
          break;
        case FORK:
          runSaga(dispatch, channel, effect.saga);
          next();
          break;
        case CALL:
          const { fn, args } = effect.payload;
          fn(...args).then(next);
          break;
        default:
          break;
      }
    }
  }
  next();
}

export default runSaga;
