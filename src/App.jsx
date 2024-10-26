
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

import { useDispatch, useSelector } from "react-redux";


import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { useEffect } from "react";
import { fetchUser } from "./redux/slice/userSlice";
import { getAllMyTasks, updateDueDate } from "./redux/slice/taskSlice";
import SharedTask from "./Pages/SharedTaskView/SharedTask";
import ProtectRoute from "./utils/protectRoute";
import ProtectedRoute from "./utils/ProtectedRoute";


export default function App() {
  const dispatch=useDispatch()
 

   const{isAuthenticated,user}=useSelector((state)=>state.user)
   const{tasks}=useSelector((state)=>state.task)
  useEffect(() => {

    dispatch(fetchUser())
  

}, []);






    return (
     <BrowserRouter>
     <Routes>
     <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      {/* <Route path="/" element={<Home/>}/> */}
      {/* <Route path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login/>
              </ProtectRoute>
            }
          /> */}
               <Route path="/login" element={<Login/>}/>      
      <Route path="/singleTask/:taskId" element={<SharedTask/>}/>
     </Routes>
     <ToastContainer position="bottom-right" theme="dark" />
     </BrowserRouter>
    )
  }