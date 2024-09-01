import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AuthProvider from './Contexts/AuthProvider'
import Auth from './Layouts/VerifyAuth'
import TaskProvider from './Contexts/TaskProvider'
import { PrivateRoute } from './Routes/PrivateRoutes'
import UserText from './Components/UserText'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import Dashboard from './Layouts/Dashboard'
import TasksListPage from './Pages/TasksListPage'
import CreateTaskPage from './Pages/CreateTaskPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import NotFoundPage from './Pages/NotFoundPage'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <TaskProvider>
            <main>
              <Routes>
                <Route path='/' element={<Auth/>}>
                  <Route index element={<HomePage/>}/>
                  <Route path='/login' element={<LoginPage/>}/> 
                  <Route path='/register' element={<RegisterPage/>}/>
                </Route>

                <Route path='/dashboard/*' element={
                  <PrivateRoute>
                    <Routes>
                      <Route element={<Dashboard/>}>
                        <Route index element={<TasksListPage/>}/>
                        <Route path='create' element={<CreateTaskPage/>}/>
                        <Route path='edit/:id' element={<CreateTaskPage/>}/>
                        <Route path='profile' element={<ProfilePage/>}/>
                        <Route path='*' element={<NotFoundPage/>}/>
                      </Route>
                    </Routes>
                  </PrivateRoute>
                }/>
                <Route path='/user' element={<UserText/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
              </Routes>
            </main>
          </TaskProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App