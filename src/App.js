import { Provider } from "react-redux"
import store from "./store"

import Count from "./Count"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Count />
      </div>
    </Provider>
  )
}

export default App
