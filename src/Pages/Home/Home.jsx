import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Home.css"
import codesandbox from "../../assets/codesandbox.png"
import { FaChevronDown } from "react-icons/fa"
import Cards from '../../Components/Cards/Cards'
import { getAllMyTasks, getAllMyTasksForThisMonth, 
     getAllMyTasksToday,  getAllTasksFailed, getAllTasksRequest,
      getAllTasksSuccess, getAnalyticsTask, setIsAddPeopleModalOpen, setIsAnalyticsOpen,
       setIsBoardOpen, setIsSettingsOpen, setThisDay1, setThisMonth1, setThisWeek1, updateDueDate,setTimeSelectDropdown, 
       setTasks} from '../../redux/slice/taskSlice'
// import TaskModal from '../../Components/TaskModal/TaskModal'
import Analytics from '../../Components/Analytics/Analytics'
import { format } from 'date-fns';
import axios from 'axios'
import SettingsComponent from '../../Components/SettingsComponents/SettingsComponent'
import { logoutFailed, logoutSuccess } from '../../redux/slice/userSlice'
import { toast } from 'react-toastify'
import DeleteModal from '../../Components/DeleteModal/DeleteModal'
import AddPeopleModal from '../../Components/AddPeopleModa/AddPeopleModal'
import { useNavigate } from 'react-router-dom'
import AddPeopleConfirmationModal from '../../Components/AddPeopleConfirmationModal/AddPeopleConfirmationModal'
import TaskModal1 from '../../Components/TaskModal1/TaskModal1'
import EditTask from '../../Components/EditTask/EditTask'
import { getOrdinalNum } from '../../utils/formatter'
import { IoSettingsOutline } from "react-icons/io5"
import { GoDatabase } from "react-icons/go"
import { IoIosLogOut } from "react-icons/io"
import { GoPeople } from "react-icons/go"
import { CiViewBoard } from "react-icons/ci"
import layout from "../../assets/layout.png"

export default function Home() {

    const dispatch = useDispatch()
    const navigate=useNavigate()

    const [formattedDate, setFormattedDate] = useState('');
    const { user, isAuthenticated } = useSelector((state) => state.user)
    const { taskModalOpen, isBoardOpen, isAnalyticsOpen, isSettingsOpen,tasks,isDeleteModalOpen,isAddPeopleConfirmationModalOpen,
        isAddPeopleModalOpen ,isEditModalOpen,thisWeek1,thisMonth1,thisDay1,timeSelectDropdown} = useSelector((state) => state.task)
  
        const [today, setToday] = useState("")
        const [thisWeek, setThisWeek] = useState("")
        const [thisMonth, setThisMonth] = useState("")

    const handleAnalyticsOpen=()=>
    {
        dispatch(getAnalyticsTask())
        dispatch(setIsBoardOpen(false))
        dispatch(setIsAnalyticsOpen(true))
        dispatch(setIsSettingsOpen(false))
        dispatch(getAllMyTasks())
        // if(today=="today"){
        //     handleToday()
        //  }
    }

    
 const handleToday = async() => {
   
   
        setToday("today")
        setThisMonth("")
        setThisWeek("")
        dispatch(setThisWeek1(false))
    
        dispatch(setThisMonth1 (false))
        dispatch(setThisDay1(true))
    
        const day=new Date().getDate();
        // console.log(currentDate.getDate(),currentDate.getMonth())
      
    
        const month = new Date().getMonth() + 1; // Current month (1-12)
        const year = new Date().getFullYear();
    
        const date = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`
        console.log(date)
        // dispatch(getAllMyTasksToday(date))
    
        
    console.log(date)
    dispatch(getAllMyTasksToday(date))
    dispatch(setTimeSelectDropdown(false))
    
    }
     const handleThisWeek = () => {
            
    
        setToday("")
        setThisMonth("")
        setThisWeek("thisWeek")
        dispatch(getAllMyTasks())
        dispatch(setTimeSelectDropdown(false))
    
        
        dispatch(setThisMonth1(false))
        dispatch(setThisDay1(false))
        dispatch(setThisWeek1(true))
        
    
    }
    const handleThisMonth = () => {
       
        dispatch(setThisMonth1(true))
        dispatch(setThisDay1(false))
        dispatch(setThisWeek1(false))
        setToday("")
        setThisMonth("thisMonth")
        setThisWeek("")
    
        const month = new Date().getMonth() + 1; // Current month (1-12)
        const year = new Date().getFullYear();
        console.log(month,year)
        dispatch(getAllMyTasksForThisMonth(month,year))
        dispatch(setTimeSelectDropdown(false))
    }
    const handleBoardOpen=()=>
        {
            dispatch(setThisWeek1(true))
            dispatch(setIsBoardOpen(true))
            dispatch(setIsAnalyticsOpen(false))
            dispatch(setIsSettingsOpen(false))
            // setToday("")
            // setThisMonth("")
            // setThisWeek("thisWeek")
            // dispatch(getAllMyTasks())
            if( thisWeek1){
                handleThisWeek()
             }

             if( thisMonth1){
                handleThisMonth()
             }

             if(thisDay1){
                handleToday()
             }
        }
        const handleSettingsOpen=()=>
            {
                dispatch(setIsBoardOpen(false))
                dispatch(setIsAnalyticsOpen(false))
                dispatch(setIsSettingsOpen(true))
                dispatch(getAllMyTasks())
            }
     
            const handleAddPeopleModal=()=>
            {

                dispatch(setIsAddPeopleModalOpen(true))
            }
            // const [isModalOpen, setIsModalOpen] = useState(false);
            // const closeModal = () => setIsModalOpen(false);
            // const openModal = () => setIsModalOpen(true);
            const handleClick=(e)=>
            {
                console.log("hello")
             
                dispatch(setTimeSelectDropdown(false))
                // closeModal()
            }
            const handleTimeSelectDropDown = (e) => {
                e.stopPropagation()
            //   openModal()
                // dispatch(setTimeSelectDropdown(!timeSelectDropdown))
                dispatch(setTimeSelectDropdown(!timeSelectDropdown))
            }
    useEffect(() => {
       
       
            dispatch(getAllMyTasks())
        
           
        
      
    //  if(today=="today"){
    //     handleToday()
    //  }

    }, [user])

    useEffect(()=>{
        
          dispatch(updateDueDate())
        
        
        },[])

  
    useEffect(() => {
        // Function to update the date
        const updateDate = () => {
            const today = new Date();
            const dayWithSuffix = getOrdinalNum(today.getDate()); // Get day with ordinal suffix
            const formatted = `${dayWithSuffix} ${format(today, "MMM")}, ${format(today, "yyyy")}`;
            setFormattedDate(formatted);
        };

        // Call the updateDate function once when the component mounts
        updateDate();

        // Set an interval to check every minute if it's midnight
        const intervalId = setInterval(() => {
            const now = new Date();
            if (now.getHours() === 0 && now.getMinutes() === 0) {
                // Update the date when the time is exactly 12:00 AM
                updateDate();
            }
        }, 60000); // Check every minute (60,000 ms)

        return () => clearInterval(intervalId);
    }, []);

console.log(thisWeek1,thisMonth1,thisDay1)
    const handleLogout=async()=>
    {
        const token=JSON.parse(localStorage.getItem("APP-TOKEN"))
        try {
          const response = await axios.get(
            "https://task-management-cuevette-backend.onrender.co/api/v1/user/logout",
            {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          }
          );
          console.log(response)
          if (response.data.success == true) {
         
            localStorage.removeItem("APP-TOKEN")
            dispatch(logoutSuccess());
            toast.success(response.data.message);
            navigate("/login")
            dispatch(setThisWeek1(false))
            dispatch(setTasks())
            // window.location.href = "/login"
            
          }
         
         
        } catch (error) {
          dispatch(logoutFailed());
          toast.error(error.response.data.message);
     
        }
    }
    return (
        <>
            <section className='home-section grid grid-two-cols' onClick={(e)=>handleClick(e)} >

                <div className='left-home-div' >
                    <div className='project-name'>
                    <img  className="project-name-image" src={codesandbox}/>
                    <span>Pro Manage</span>
                    </div>
                    
                    <div className='left-home-middle-div'>
                    <div className={` ${isBoardOpen ? "left-home-div-common-active" : "left-home-div-common"}`} 
                    onClick={()=>handleBoardOpen()}>
                        {/* <CiViewBoard className='common-icon' /> */}
                        <img src={layout} className='common-icon-board'/>
                        <span>Board</span>
                    </div>
                    <div className={` ${isAnalyticsOpen ? "left-home-div-common-active" : "left-home-div-common"}`} 
                    onClick={()=>handleAnalyticsOpen()} >
                        <GoDatabase  className='common-icon'/>
                        <span >Analytics</span>
                    </div>
                    <div className={` ${isSettingsOpen ? "left-home-div-common-active" : "left-home-div-common"}`} 
                 
                     onClick={()=>handleSettingsOpen()}>
                           <IoSettingsOutline className='common-icon' />
                        <span>Settings</span>
                    </div>
                    </div>
                    <div className='left-home-bottom-div'>
                    <div className='left-home-logout-div' 
                     onClick={()=>handleLogout()}>
                        <IoIosLogOut className='left-home-logout-div-icon' />
                        <span>Logout</span>
                    </div>
                    </div>
                    
                </div>

                 <div className='right-home-div'>
                 {isBoardOpen &&<div className='right-home-board-div'>

                    
                    <div className='right-home-div-heading'>
                        <span className='right-home-div-heading-welcome'>Welcome! {user?.userName}</span>
                        <span className='right-home-div-heading-date'>{formattedDate}</span>
                    </div>

                    <div className='right-home-second-div'>

                        <div className='right-home-second-div-left'>
                        <span className='right-home-second-div-heading-board'>Board</span>
                            <span onClick={()=>handleAddPeopleModal()}>
                            <GoPeople />
                                Add People
                            </span>
                        </div>
                        <div className='right-home-second-div-dates'>

                            {thisWeek1 && <span>This Week</span>}
                            {!thisWeek1 && thisMonth1&& <span>This Month</span>}
                            { thisDay1 &&<span>Today</span>}
                            <FaChevronDown className='right-home-second-div-dates-dropDown-icon' onClick={(e)=>handleTimeSelectDropDown(e)} />
                            {timeSelectDropdown &&<div className='right-home-second-div-dates-dropdown'>
                                <span onClick={() => handleToday()}>Today</span>
                                <span onClick={() => handleThisWeek()}>This Week</span>
                                <span onClick={() => handleThisMonth()}>This Month</span>
                            </div>}

                        </div>


                    </div>
                    <div className='right-home-second-div-hero'>
                        <Cards />
                    </div>
                    </div>}
                    {isAnalyticsOpen&&<div className='right-home-analytics-div'>
                    {isAnalyticsOpen&&<Analytics/>}
                    </div>}
                    {isSettingsOpen&&<div className='right-home-settings-div'>
                    {isSettingsOpen&&<SettingsComponent/>}
                    </div>}
                </div>
       
            </section>

            {taskModalOpen && <TaskModal1 />}
            {isDeleteModalOpen&&<DeleteModal/>}
            {isAddPeopleModalOpen&&<AddPeopleModal/>}
            {isAddPeopleConfirmationModalOpen&&<AddPeopleConfirmationModal/>}
            {isEditModalOpen&&<EditTask/>}

        </>
    )
}
