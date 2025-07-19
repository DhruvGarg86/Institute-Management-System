import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// SyncFusion License
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCeUx0Q3xbf1x1ZFREalhQTnVYUiweQnxTdEBjXn5XcHRRR2NbU0FzXkleYw==');
// SyncFusion License

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>  
)
