import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthProvider from './Contexts/AuthProvider'
import TaskProvider from './Contexts/TaskProvider'
import { PrivateRoute } from './Routes/PrivateRoutes'
import UserText from './Components/UserText'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Dashboard from './Layouts/Dashboard'
import TasksListPage from './Pages/TasksListPage'
import CreateTaskPage from './Pages/CreateTaskPage'
import './App.css'
import HomePage from './Pages/HomePage'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <TaskProvider>
            <main className='bg-gray-900'>
              <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/> 
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/dashboard/*' element={
                  <PrivateRoute>
                    <Routes>
                      <Route element={<Dashboard/>}>
                        <Route index element={<TasksListPage/>}/>
                        <Route path='create' element={<CreateTaskPage/>}/>
                      </Route>
                    </Routes>
                  </PrivateRoute>
                }/>
                <Route path='/user' element={<UserText/>}/>
              </Routes>
            </main>
          </TaskProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App