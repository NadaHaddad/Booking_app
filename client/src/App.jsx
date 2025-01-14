import { useState } from 'react'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage'
import axios from "axios"
import { UserContextProvider } from './UserContext'
import PlacesFormPage from './pages/PlacesFormPage'
import ProfilePage from './pages/ProfilePage'
import PlacePage from './pages/PlacePage'
import PlacesPage from './pages/PlacesPage'
import BookingPage from './pages/BookingPage'
import BookingsPage from './pages/BookingsPage'
axios.defaults.baseURL="http://localhost:4000"
axios.defaults.withCredentials = true;


function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/place/:id" element={<PlacePage/>}/>
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
      </Route>
      
    </Routes>
    </UserContextProvider>
  )
}

export default App
