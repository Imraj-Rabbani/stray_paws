import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'


function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='pages' >
          <Routes>
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
