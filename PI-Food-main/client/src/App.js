import './App.css';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/homePage/HomePage.jsx'
import Detail from './components/detailPage/DetailPage.jsx';
import Forms from './components/fromPage/FormPage';
import { Route,Routes } from 'react-router-dom';


function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/from' element={<Forms/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
