import { Route, Routes } from 'react-router'
import './App.css'
import AuthProvider from './contexts/authContext'
import { NavbarLayout } from './pages/layouts/NavbarLayout'
import { Homepage }  from './pages/Home'
import { AuthPage } from './pages/Auth/Auth'
import AddRoadBookPage from './pages/roadbooks/addRoadBook'
import RoadbooksLayout from './pages/layouts/RoadBooksLayout'
import { RoadbookSearchListPage } from './pages/roadbooks/roadBookSearchList'
import { RoadBookDetailledPage } from './pages/roadbooks/roadBookDetailled'
import { Loader } from 'google-maps'


const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const loader = new Loader(GOOGLE_API_KEY);
const google = await loader.load();
export const directionsService = new google.maps.DirectionsService();
export const geocoder = new google.maps.Geocoder();


const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<NavbarLayout />} >
          <Route element={<RoadbooksLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/search/:destination" element={<RoadbookSearchListPage />} />
          </Route>
            <Route path="/roadbooks/:roadbookId" element={<RoadBookDetailledPage />} />
          <Route path='/addRoute' element={<AddRoadBookPage />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
