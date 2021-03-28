import { take, put } from "../redux-saga/effects"
import { ASYNC_ADD } from "./action-types"
import { add } from "./actions"

function* rootSaga() {
  yield take(ASYNC_ADD)
  yield put(add())
}

export default rootSaga
