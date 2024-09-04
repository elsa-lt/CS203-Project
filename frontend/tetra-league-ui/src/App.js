// App.js
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './App.css';

const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />
         </Routes>
      </>
   );
};
 
export default App;