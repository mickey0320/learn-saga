import { take, put, call, takeEvery } from "../redux-saga/effects";
import { ASYNC_ADD } from "./action-types";
import { add } from "./actions";

function delay(ms, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

function* taskAdd() {
  yield call(delay, 1000, "done");
  yield put(add());
}

function* watchCount() {
  yield takeEvery(ASYNC_ADD, taskAdd);
}

function* rootSaga() {
  yield watchCount();
}

export default rootSaga;
