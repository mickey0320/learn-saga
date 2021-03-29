import { take, put, call, takeEvery, all } from "../redux-saga/effects";
import { ASYNC_ADD, ASYNC_MINUS } from "./action-types";
import { add, minus } from "./actions";

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

function* taskMinus() {
  yield call(delay, 1000);
  yield put(minus());
}

function* watchCount() {
  // yield takeEvery(ASYNC_ADD, taskAdd);
  // yield takeEvery(ASYNC_MINUS, taskMinus);
  yield take(ASYNC_ADD);
  yield taskAdd();
}

function* watchCount1() {
  yield take(ASYNC_MINUS);
  yield taskMinus();
  // yield takeEvery(ASYNC_ADD, taskAdd);
  // yield takeEvery(ASYNC_MINUS, taskMinus);
}

function* rootSaga() {
  // yield watchCount();
  yield all([watchCount(), watchCount1()]);
  console.log("done");
}

export default rootSaga;
