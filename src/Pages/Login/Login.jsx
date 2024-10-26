import React, { useEffect, useState } from 'react'
import axios from "axios"

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, setIsAuthenticated, setUser } from '../../redux/slice/userSlice'
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setIsBoardOpen } from '../../redux/slice/taskSlice'
import { MdOutlineMail } from "react-icons/md"
import { IoPersonOutline } from "react-icons/io5"
import { CiLock } from "react-icons/ci"
import { FaEye } from "react-icons/fa"
import group1 from "../../assets/Group.png"
export default function Login() {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const [currState, setCurrentState] = useState("login")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(true)
 
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true)
  const [loginPasswordVisibility, setLoginPasswordVisibility] = useState(true)
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // Password should be max 10 characters, should not contain "www" or "http"
    const passwordRegex = /^(?!.*(www|http)).{1,10}$/;
    return passwordRegex.test(password);
  }
  // Example usage


  const handleNameChange = (event) => {
    setUserName(event.target.value)

  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)

  }

  const handleLoginCurrentState = () => {
    console.log("hello")
    setCurrentState("sign-up")
  }
  const handleRegisterCurrentState = () => {
    setCurrentState("login")
  }
  const handlePasswordVisibility = (e) => {
    setPasswordVisibility(!passwordVisibility)
    var x = document.getElementById("password");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

  }

  const handleConfirmPasswordVisibility = (e) => {
    setConfirmPasswordVisibility(!confirmPasswordVisibility)
    var x = document.getElementById("password1");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

  }

  const handleLoginPasswordVisibility = (e) => {
    setLoginPasswordVisibility(!loginPasswordVisibility)
    var x = document.getElementById("login-password");

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }

  }

  const handleRegister = () => {
    setIsLogin(false)
  }
  const handleLogin = () => {
    setIsLogin(true)
  }

  console.log(currState,password,confirmPassword)
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (isLogin) {


      try {
        setLoginLoading(true)
        setRegisterLoading(false)

        const response = await axios.post(`http://localhost:5000/api/v1/user/login`, { email, password },
          { headers: { "Content-Type": "application/json" }, withCredentials: true, }
        )




        if (response?.data?.success === true) {

          console.log(response)
          localStorage.setItem("APP-TOKEN", JSON.stringify(response?.data?.token))
          dispatch(fetchUser())
          navigateTo("/");
          dispatch(setUser(response.data.user))
          dispatch(setIsAuthenticated(true))
          dispatch(setIsBoardOpen(true))
          setLoginLoading(false)
          toast.success(response?.data?.message);
        }
      }
      catch (error) {
        console.log(error)
        setLoginLoading(false)
        toast.error(error?.response?.data?.message);
        // setLoginEmailError(error?.response?.data?.message.split(",")[0])

        // setLoginPasswordError(error?.response?.data?.message.split(",")[1])
        console.log(error?.response?.data?.message);


      }


    }
    else {

      const a = isValidEmail(email)
      const b = isValidPassword(password)
      console.log(a,b)
      if (!a || !b ) {


        toast.error(`please enter valid email address eg:example@domain.com ,
          please enter valid password ,password should have maximum length of 10 characters  `
        )
        return

      } else if(password!==confirmPassword){
        toast.error(`password and confirm password should match`)
        return
      }
      
      else {




        try {
          setLoginLoading(false)
          setRegisterLoading(true)
          const response = await axios.post(`http://localhost:5000/api/v1/user/register`, { userName, email, password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
          )
          console.log(response)

          if (response?.data?.success === true) {
            setIsLogin(true)
            setCurrentState("login")
            setRegisterLoading(false)
            toast.success(response.data.message);
            //alert(response.data.message)
          }
        } catch (error) {
          toast.success(error?.response?.data?.message);
          console.log(error);
          setRegisterLoading(false)
        }

      }


    }
  }
  console.log(loginLoading)
  useEffect(() => {
    // Check if the token exists in localStorage (you can replace this with your auth logic)
    const token = JSON.parse(localStorage.getItem("APP-TOKEN"))

    // If user is already authenticated, redirect to home page
    if (token) {
      navigate("/"); // Redirect to home or dashboard
    }
  }, [navigate]);
  return (
    <section className='login-section'>
      <div className='login-left'>
      <div className="login-left-circle"></div>
      <img src={group1} className='login-left-image'/>
      <div  className='login-left-image-bottom-text'>
      <span className='login-left-image-bottom-text-first'>Welcome aboard my friend </span>
      <span className='login-left-image-bottom-text-second'>Just a couple of clicks and we start </span>
      </div>
   
      </div>
      <div className='login-right'>
        <div className='login-heading'>
          {currState == "login" && <span>Login</span>}
          {currState == "sign-up" && <span>Register</span>}
        </div>
        <form className='form-div' onSubmit={(e) => handleSubmit(e)}>

          {currState == "sign-up" &&
            (<div className='register-div'>


              <div className='second-div'>
                <IoPersonOutline className='common-settings-icon' />
                <input type="text" value={userName} onChange={handleNameChange} placeholder='Name'
                />

              </div>


              <div className='second-div'>
                <MdOutlineMail className='common-settings-icon' />
                <input type="text" value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

              </div>






              <div className='second-div'>
                <CiLock className='common-settings-icon' />
                <input type="password" value={password} placeholder='password'  id="password"
                  onChange={handlePasswordChange} />
                <FaEye className={`${passwordVisibility == true ? "eye-icon-active" : "eye-icon "}`}

                  onClick={(e) => handlePasswordVisibility(e)}
                />
              </div>


              <div className='second-div'>
                <CiLock className='common-settings-icon' />
                <input type="password" value={confirmPassword} placeholder='Confirm Password'  id="password1"
                  onChange={(e) => setConfirmPassword(e.target.value)} />
                <FaEye className={`${confirmPasswordVisibility == true ? "eye-icon-active" : "eye-icon "}`}

                  onClick={(e) => handleConfirmPasswordVisibility(e)}
                />
              </div>


            </div>)}

          {currState == "login" && (<div className='login-div'>


            <div className='second-div'>
              <MdOutlineMail className='common-settings-icon' />
              <input type="text" value={email} placeholder='Email'
                onChange={(e) => setEmail(e.target.value)} />

            </div>





            <div className='second-div'>
              <CiLock className='common-settings-icon' />
              <input type="password" value={password} placeholder='Password' id="login-password"
                onChange={(e) => setPassword(e.target.value)} />
              <FaEye className={`${loginPasswordVisibility == true ? "eye-icon-active" : "eye-icon "}`}

          onClick={(e) => handleLoginPasswordVisibility(e)}
                  />



            </div>


          </div>)}

          <div className='login-bottom-div'>
            <div className='login-signup-button-div'>

              {currState == "sign-up" && registerLoading==false &&<button type="submit" onClick={() => handleRegister()}
                className={` ${currState === "sign-up" ? "common-submit-button-register" : ""}`} >Register</button>}

          {currState == "sign-up" && registerLoading==true && <button type="submit" onClick={() => handleRegister()}
                className={` ${currState === "sign-up" ? "common-submit-button-register" : ""}`} >Register...</button>}


              {currState == "login" && !loginLoading && <button type="submit" onClick={() => handleLogin()}

                className={` ${currState === "login" ? "common-submit-button-login" : ""}`}>Login</button>}


              {currState == "login" && loginLoading && <button type="button" disabled

                className={`common-login-button ${currState === "login" ? "common-submit-button-login" : ""}`}>Login......</button>}

            </div>

            <div className='login-signup-write'>
              {currState == "login" && <span>Have No account yet?</span>}
              {currState == "sign-up" && <span>Have an account ?</span>}
            </div>

            <div className='common-submit-button-div'>

              {currState == "login" && <button type="button"
                className="common-submit-button " onClick={() => handleLoginCurrentState()}
              >Register</button>}
              {currState == "sign-up" && <button type="button"
                className="common-submit-button " onClick={() => handleRegisterCurrentState()}
              >Login</button>}
            </div>
          </div>
        </form>
      </div>


    </section>
  )
}
