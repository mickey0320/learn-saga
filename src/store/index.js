import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "../redux-saga"
import reducer from "./reducer"
import saga from "./saga"
const sagaMiddleware = createSagaMiddleware()

const store = applyMiddleware(sagaMiddleware)(createStore)(reducer)

sagaMiddleware.run(saga)

export default store
