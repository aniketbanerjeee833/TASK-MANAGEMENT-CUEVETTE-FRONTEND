import React, { useState } from 'react'
import "./SettingsComponent.css"
import { useDispatch, useSelector } from 'react-redux'
import { FaEye } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { updateUserFailed, updateUserRequest, updateUserSuccess } from '../../redux/slice/userSlice'
import { setIsSettingsOpen } from '../../redux/slice/taskSlice'
import { IoPersonOutline } from "react-icons/io5"
import { MdOutlineMail } from "react-icons/md"
import { CiLock } from "react-icons/ci"
export default function SettingsComponent() {
    const dispatch=useDispatch()
    const [passwordVisibility, setPasswordVisibility] = useState(true)
    const [passwordVisibility1, setPasswordVisibility1] = useState(true)
    const{user,updateLoading}=useSelector((state)=>state.user)
    // console.log(user)

    const[email,setEmail]=useState(user.email)
    const[userName,setUserName]=useState(user.userName)
    const[oldPassword,setOldPassword]=useState("")
    const[newPassword,setNewPassword]=useState("")

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    }
  
    // function isValidPassword(newPassword) {
    //   // Password should be max 10 characters, should not contain "www" or "http"
    //   const passwordRegex = /^(?!.*(www|http)).{1,10}$/;
    //   return passwordRegex.test(newPassword);
    // }

    const navigate=useNavigate()
    const handlePasswordVisibility = (e) => {
        setPasswordVisibility(!passwordVisibility)
        var x = document.getElementById("password");
    
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
     
      }

      const handlePasswordVisibility1 = (e) => {
        setPasswordVisibility1(!passwordVisibility1)
        var x = document.getElementById("password1");
      
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      
      }

      console.log(email,userName,updateLoading)
      const handleSubmit=async(e)=>
    {
        e.preventDefault();
        const token=JSON.parse(localStorage.getItem("APP-TOKEN"))
        dispatch(updateUserRequest());


        const a = isValidEmail(email)
        
        // const b = isValidPassword(newPassword)
        // console.log(a,b)
        if (!a  ) {
  
  
          toast.error(`please enter valid email address eg:example@domain.com ,`)
          dispatch(updateUserFailed());
          return
  
        }
        try {
          const response = await axios.put("https://task-management-cuevette-backend.onrender.co/api/v1/user/updateUser",
            { oldPassword,newPassword,email,userName},
             {
                headers:{
                    Authorization:`Bearer ${token}`
                  }
             }

          );
          localStorage.removeItem("APP-TOKEN")
          dispatch(updateUserSuccess());
          toast.success(response.data.message)
          navigate("/login")
          dispatch(setIsSettingsOpen(false))
         
        } catch (error) {
          dispatch(updateUserFailed());
          toast.error(error?.response?.data?.message);
          console.log(error);
        }
    }
    return (
    <>
            <div className='right-home-settings-div-top'>
                <span>Settings</span>
            </div>
            <form className='right-home-settings-div-bottom' onSubmit={(e) => handleSubmit(e)}>
                <div className='right-home-settings-div-bottom-common-div '>

                    <div className='second-div'>
                    <IoPersonOutline  className='common-settings-icon'/>
                        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}
                        placeholder='Name'
                        />

                    </div>

                </div>

                <div className='right-home-settings-div-bottom-common-div '>

                    <div className='second-div'>
                    <MdOutlineMail className='common-settings-icon' />
                        <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)}
                            placeholder='Update Email' />

                    </div>


                </div>

                <div className='right-home-settings-div-bottom-common-div '>

                    <div className='second-div'>
                    <CiLock className='common-settings-icon'/>
                        <input type="password" value={oldPassword} placeholder='Old password' id="password"
                        onChange={(e)=>setOldPassword(e.target.value)}
                             />
                        <FaEye  className={`${passwordVisibility == true ? "eye-icon-active" : "eye-icon "}`}

                  onClick={(e) => handlePasswordVisibility(e)}
                        />
                    </div>

                </div>


                <div className='right-home-settings-div-bottom-common-div'>


                    <div className='second-div'>
                    <CiLock  className='common-settings-icon'/>
                        <input type="password"  placeholder='New Password'value={newPassword} id="password1"
                         onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        <FaEye  className={`${passwordVisibility1 == true ? "eye-icon-active" : "eye-icon "}`}
                  onClick={(e) => handlePasswordVisibility1(e)}
                         />
                    </div>

                </div>
                <div className='right-home-settings-div-bottom-common-div'>

                    {updateLoading==false&&<button type="submit">Update</button>}
                    {updateLoading==true&&<button type="submit" disabled>Update.....</button>}
                </div>
                </form>
            </>
            )
}
