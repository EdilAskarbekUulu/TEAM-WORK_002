import './App.css';
import Register from './registrationAndAuthorization/Register';
import Header from './components/header/header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/home';

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;
