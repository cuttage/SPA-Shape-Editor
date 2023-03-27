import './App.css'
import Editor from './Editor'
import { Provider } from 'react-redux'
import { FC } from 'react'
import store from './store/store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <Editor />
    </Provider>
  )
}

export default App
