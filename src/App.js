
import './App.css';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
