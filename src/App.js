import './App.css';
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom"
import LoginForm from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
