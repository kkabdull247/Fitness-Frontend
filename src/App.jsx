import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from "./pages/Register";
import Login from './pages/Login';
import Home from './pages/Home'
import UserLayout from './layouts/UserLayout';
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard'
import Payment from './pages/Payment'
import StartWorkoutForm from './pages/StartWorkoutForm'
import Workout from './pages/Workout'
import TrackFitnessForm from './pages/TrackFitnessForm'
import EditTrackFitnessForm from './pages/EditTrackFitnessForm'
import AddMealForm from './pages/AddMealForm'
import EditMealForm from './pages/EditMealForm'
import Nutrition from './pages/Nutrition'
import Progress from './pages/Progress'


function App() {

  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/Login' element={<Login />}></Route>


          <Route element={<UserLayout />} >
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/payment' element={<Payment />}></Route>
              <Route path='/StartWorkoutForm' element={<StartWorkoutForm />}></Route>
              <Route path='/Workout' element={<Workout />}></Route>
              <Route path='/TrackFitnessForm' element={<TrackFitnessForm />}></Route>
              <Route path='/EditTrackFitnessForm/:id' element={<EditTrackFitnessForm />}></Route>
              <Route path='/AddMealForm' element={<AddMealForm />}></Route>
              <Route path='/EditMealForm/:id' element={<EditMealForm />}></Route>
              <Route path='/Nutrition' element={<Nutrition />}></Route>
              <Route path='/Progress' element={<Progress />}></Route>

            </Route>

          </Route>

          {/* <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path='/admin' element={<AdminLayout />} >
              <Route path='contacts' element={<Contacts />}></Route>
              <Route path='users' element={<Users />}></Route>
              <Route path='users/add' element={<AddNewUser />}></Route>
              <Route path='users/edit/:id' element={<EditUser />}></Route>
              <Route path='contacts/edit/:id' element={<EditContact />} ></Route>
              <Route path='services' element={<AddServices />}></Route>
            </Route>
          </Route> */}


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
