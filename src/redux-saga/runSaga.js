import { PUT, TAKE, CALL, FORK, CPS, ALL } from "./effectTypes";

function runSaga(dispatch, channel, saga, doneFn) {
  const it = typeof saga === "function" ? saga() : saga;
  function next(value, isError) {
    if (isError) {
      it.throw("error");
      return;
    }
    const { value: effect, done } = it.next(value);
    if (done) {
      doneFn?.(effect);
      return;
    }
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
          const payload = effect.payload;
          payload.fn(...payload.args).then(next);
          break;
        case CPS:
          const { fn, args } = effect.payload;
          fn(...args, (err, res) => {
            if (err) {
              next(err, true);
            } else {
              next(res);
            }
          });
          break;
        case ALL:
          const effects = effect.effects;
          let count = 0;
          const ret = {};
          for (let item of effects) {
            runSaga(dispatch, channel, item, (value) => {
              ret[count++] = value;
              if (count === effects.length) {
                next(ret);
              }
            });
          }
          break;
        default:
          break;
      }
    }
  }
  next();
}

export default runSaga;
