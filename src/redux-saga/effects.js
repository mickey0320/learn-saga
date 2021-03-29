import { PUT, TAKE, FORK, CALL } from "./effectTypes";

export function take(actionType) {
  return {
    type: TAKE,
    actionType,
  };
}

export function put(action) {
  return {
    type: PUT,
    action,
  };
}

export function call(fn, ...args) {
  return {
    type: CALL,
    payload: {
      fn,
      args,
    },
  };
}

export function fork(saga) {
  return {
    type: FORK,
    saga: saga,
  };
}

export function takeEvery(actionType, saga) {
  function* test() {
    while (true) {
      yield take(actionType);
      yield fork(saga);
    }
  }
  return fork(test);
}
