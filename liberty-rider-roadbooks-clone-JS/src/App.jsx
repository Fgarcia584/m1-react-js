import { Route, Routes } from 'react-router'
import './App.css'
import AuthProvider from './contexts/authContext'
import { NavbarLayout } from './pages/layouts/NavbarLayout'
import { Homepage }  from './pages/Home'
import { AuthPage } from './pages/Auth/Auth'
import AddRoadBookPage from './pages/roadbooks/addRoadBook'
import RoadbooksLayout from './pages/layouts/RoadBooksLayout'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<NavbarLayout />} >
          <Route element={<RoadbooksLayout />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route path='/addRoute' element={<AddRoadBookPage />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
