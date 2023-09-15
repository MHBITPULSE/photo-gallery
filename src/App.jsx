
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddPhoto from './Admin/AddPhoto'
import Login from './components/Login/Login'
import PhotoDetails from './components/photos/photo/PhotoDetails'


function App() {


  let routes = null;

  routes = (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<AddPhoto />} />
      <Route path='/login' element={<Login />} />
      <Route path='/category/:category' element={<Home />} />
      <Route path='/photo/:photoId' element={<PhotoDetails />} />
    </Routes>
  )
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
