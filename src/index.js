import ReactDom from 'react-dom'
import App from './App'
import './styles/tokens.css'
import './index.css'
import './styles/motion.css'
import './i18n/i18n'
import { ThemeProvider } from './context/ThemeContext'

ReactDom.render(
  <ThemeProvider>
    <App/>
  </ThemeProvider>,
  document.querySelector('#root')
)