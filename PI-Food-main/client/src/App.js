import './App.css';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/homePage/HomePage.jsx'
import DetailPage from './components/detailPage/DetailPage.jsx';
import FromPage from './components/fromPage/FromPage.jsx';
import { Route,Routes, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<DetailPage/>}/>
        <Route path='/from' element={<FromPage/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
