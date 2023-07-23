import './App.css';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/homePage/HomePage.jsx'
import Detail from './components/detailPage/DetailPage.jsx';
import Forms from './components/fromPage/FormPage';
import { Route,Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';


function App() {




  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/from' element={<Forms/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
