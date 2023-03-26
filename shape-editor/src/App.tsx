import './App.css'
import Test from './Test'
import { Provider } from 'react-redux'
import { FC } from 'react'
import store from './store/store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <Test></Test>
    </Provider>
  )
}

export default App
