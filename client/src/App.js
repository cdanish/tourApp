import './App.css';
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './component/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/feature/authSlice';
import AddEditTour from './pages/AddEditTour';
import SingleTours from './pages/singleToure';
import DashBoard from './pages/DashBoard';
import PrivateRoute from './component/PrivateRoute';

function App() {
  const dipatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dipatch(setUser(user));
  }, []);
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/addtour' 
          element={<PrivateRoute><AddEditTour /></PrivateRoute>} 
          
          />


          <Route path='/editTour/:id' element={<AddEditTour />} />
          <Route path='/singleTour/:id' element={<PrivateRoute><SingleTours /></PrivateRoute>} />

          <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>

          } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
