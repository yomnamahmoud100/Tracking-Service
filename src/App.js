import './App.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n';
import TrackingService from './components/TrackingService/TrackingService';
import Header from './components/Header/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
   <I18nextProvider i18n={i18n}>
   <Header />
   <TrackingService />
   </I18nextProvider>
   
    </>
  );
}

export default App;
