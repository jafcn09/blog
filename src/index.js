import ReactDom from 'react-dom'
import App from './App'
import './index.css'
import './i18n/i18n'
import { ThemeProvider } from './context/ThemeContext'

ReactDom.render(
  <ThemeProvider>
    <App/>
  </ThemeProvider>,
  document.querySelector('#root')
)