import React, { useEffect, useState } from 'react'
import "../TaskModal1/TaskModal1.css"
import { useDispatch, useSelector } from 'react-redux';
import { getAllMyTasks, setTaskModalOpen, setThisWeek1 } from '../../redux/slice/taskSlice';
import { FaChevronDown } from "react-icons/fa"
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Import the format function
import { addYears, subYears } from "date-fns"
import axios from 'axios';
import { MdDelete } from "react-icons/md"
import { FaPlus } from "react-icons/fa6"
import {  getAllPossibleAssigneeList, setOpenAssigneeList } from '../../redux/slice/userSlice';
export default function TaskModal1() {
    const dispatch = useDispatch()
    const { taskModalOpen } = useSelector((state) => state.task)
    const { assigneeList,isOpenAssigneeList } = useSelector((state) => state.user)
    const [title, setTitle] = useState("")
    const [showCalendar, setShowCalendar] = useState(false)
    // const [selectedDate, setSelectedDate] =  useState("01-01-2000");
    const [selectedDate, setSelectedDate] =  useState("");
    const [checkList, setcheckList] = useState([]);
    const [priority, setPriority] = useState("")
    const [createTaskErrors, setCreateTaskErrors] = useState("")
    const [titleErrors, setTitleErrors] = useState("")
    const[createTaskLoading,setCreateTaskLoading]=useState(false)
    const[dateToShow,setDateToShow]=useState("")
    const handleTaskModalClose = () => {
        dispatch(setTaskModalOpen(false))
    }
    const handleHighPriority = (string) => {
        setPriority(string)
    }

    const handleMediumPriority = (string) => {
        setPriority(string)
    }
    const handleLowPriority = (string) => {
        setPriority(string)
    }
    const[assigned,setAssigned]=useState([])

    const handleAllPersonsToAssign=(email)=>
    {
        console.log(email)
      setAssigned(email)

     
    }
    const handleClearDate = (e) => {
        e.preventDefault()
        setSelectedDate(null);
        // setShowCalendar(false)
      };
    
      // Handler for setting today's date
      const handleTodayDate = (e) => {
        e.preventDefault()
        const todayFormatted = format(new Date(), "dd-MM-yyyy");
        const dateToShowFormat = format(new Date(), "dd/MM/yyyy")
        setDateToShow(dateToShowFormat)
        setSelectedDate(todayFormatted);

      };
    // function validUrl(str){
   
    //               }  
    const handleAssigneeList = () => {
        console.log("heelo")
        dispatch(setOpenAssigneeList(!isOpenAssigneeList))
         dispatch(getAllPossibleAssigneeList())
    }
  
   
    const isPlainText = (content) => {
        // Regular expression to check for URLs
        const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    
        // Return true if the content does not contain URLs, false otherwise
        return !urlPattern.test(content);
    };

    const checkExtensions=(content)=>{
        const pattern = /\b\w+\.(mp4|avi|mkv|mov|wmv|flv|webm|ogg)\b/gi
        return pattern.test(content);
    }
    const checkTitle = (title) => {
        // Regular expression to check for URLs
       if(title.length>50 ){
        return false
       }else{
        return true
       }
    };


    const addChecklist = () => {
        setcheckList([...checkList, { id: Date.now(), content: '', status: false }]);
    };

    const handleChecklistChange = (id, newText) => {
        setcheckList(checkList.map(item =>
            item.id === id ? { ...item, content: newText } : item
        ));
    };

    const toggleChecklistCompletion = (id) => {
        setcheckList(checkList.map(item =>
            item.id === id ? { ...item, status: !item.status } : item
        ));
    };

    const deleteChecklist = (id) => {
        setcheckList(checkList.filter(item => item.id !== id));
    };

 
    
    const [numberOfCheckListTickedCount, setNumberOfCheckListTickedCount] = useState(0);
    const handleCheckListMarked=()=>
    {
        //let numberOfChecKlistTicked;
       return checkList.filter((cur)=>cur.status==true).length
        // console.log(numberOfChecKlistTicked)
        // setNumberOfCheckListTickedCount(numberOfChecKlistTicked.length);
        
    }
  
    
    console.log(checkList, priority, title,numberOfCheckListTickedCount)
    console.log(selectedDate,assigned)
    
    const handleSubmit = async (e) => {

        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("APP-TOKEN"))

        const invalidChecklist = checkList.find(item =>
            !isPlainText(item.content) || item.content.trim() === ''
        );

        const invalidChecklist1 = checkList.find(item =>
            checkExtensions(item.content) || item.content.trim() === ''
        );
        const invalidTitle = !isPlainText(title)
        //console.log(invalidTitle)

        const titleLength=checkTitle(title)
        const checktitle=checkExtensions(title)
        console.log(checktitle,titleLength,invalidChecklist,invalidChecklist1,titleLength)

        if (invalidChecklist || invalidChecklist1|| invalidTitle || checktitle || titleLength==false) {

            setCreateTaskErrors("Checklist items must be plain text, non-empty, and cannot contain URLs.")
            setTitleErrors("title must be plain text, non-empty, and cannot contain URLs and not extensions like mp4.")

            toast.error(`title should not be more than 50 characters long,
                title must be plain text, non-empty, and cannot contain URLs and not extensions like mp4.
                Checklist items must be plain text, non-empty, and cannot contain URLs and not extensions like mp4.`)
            return 
        } 
    
         else{

         
            try {
                setCreateTaskLoading(true)
                const response = await axios.post(`https://task-management-cuevette-backend.onrender.co/api/v1/task/create`, { checkList, priority, title,assigned,selectedDate },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response)
                if (response?.data?.success === true) {
                    toast.success(response.data.message);
                    dispatch(setTaskModalOpen(false))
                    dispatch(getAllMyTasks())
                    setCreateTaskLoading(false)
                    dispatch(setThisWeek1(true))
                  

                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
                setCreateTaskLoading(false)

            }

        }
        
    }


    return (

        <div className='task-modal-section'>
            <form className='task-modal-div' onSubmit={(e) => handleSubmit(e)} >

                <div className='task-modal-div-title'>
                    <div className='task-modal-div-title-top'>

                    <label>Title</label>
                    <span className='common-must-fill-star'>*</span>
                    </div>
                   
                    <input type="text" id="title" placeholder='Enter Title' value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='task-modal-div-priority'>
                    <div className='task-modal-div-priority-left'>
                    <span>Select Priority</span>
                    
                  
                    <span className='common-must-fill-star-priority'>*</span>
                    </div>
                   
                    <div className='task-modal-div-priority-right'>

                    <button type="button" className={`${priority=="high-priority"?"task-modal-div-priority-right-button-select":
                    "task-modal-div-priority-right-button"}`}
                     onClick={() => handleHighPriority("high-priority")}>
                       
                        <div className='task-modal-div-priority-right-high-priority'></div>
                        HIGH PRIORITY
                        </button>

                    <button type="button" className={`${priority=="medium-priority"?"task-modal-div-priority-right-button-select":
                    "task-modal-div-priority-right-button"}`}
                    onClick={() => handleMediumPriority("medium-priority")}>
                    <div className='task-modal-div-priority-right-medium-priority'></div>
                        MEDIUM PRIORITY</button>

                    <button type="button" className={`${priority=="low-priority"?"task-modal-div-priority-right-button-select":
                    "task-modal-div-priority-right-button"}`}
                    onClick={() => handleLowPriority("low-priority")}>
                    <div className='task-modal-div-priority-right-low-priority'></div>
                        LOW PRIORITY

                    </button>
                    </div>
            
                </div>
                <div className='task-modal-div-assignTo'>
                    <span>Assign To</span>
                 
                    <div className='assignTo-div'>
                        {assigned.length>0? assigned:"Add a assignee"}
                        <FaChevronDown className='task-modal-div-assignTo-down-arrow' onClick={() => handleAssigneeList()} />
                    </div>
                    {/* <input type="text" id="assignTo" placeholder='Add a assignee' /> */}
                  
                </div>
             
                {/* {isOpenAssigneeList&&assigneeList.length>0&&
        <AssigneeList/>

//         } */}
                {isOpenAssigneeList && <div className='task-modal-div-assigneeList'>
            
                    {assigneeList.length>0 && assigneeList?.map((curAssignee, index) => {
                        console.log(curAssignee.userName)
                        return (
                            
                            <div className='task-modal-div-individualAssignee' key={index}>
                                <div className='task-modal-div-individualAssignee-username'>
                                <span >{curAssignee?.userName?.substring(0, 2)}</span>
                                </div>
                               
                                <span className='task-modal-div-individualAssignee-email'>{curAssignee?.email}</span>
                                <button type="button" onClick={() => handleAllPersonsToAssign(curAssignee?.email)}>Assign</button>
                            </div>
                            

                        )
                    })}
                </div>}

                <div className='task-modal-div-checkList-top-checkList-div'>
                    <span className='task-modal-div-checkList-top-checkList-div-heading'>
                        Checklist ({handleCheckListMarked()}/{checkList.length})</span>
                    <span className='common-must-fill-star-checkList-div'>*</span>

                </div>

                <div className='task-modal-div-checkList-middle'>

                    {checkList.map((checklist) => (
                        <div className='task-modal-div-checkList-middle-individual-checkList' key={checklist.id}>
                            <input
                            className='task-modal-div-checkList-middle-individual-checkList-checkbox'
                                type="checkbox"
                                checked={checklist.completed}
                                onChange={() => toggleChecklistCompletion(checklist.id)}
                            />
                             
                            <input
                                type="text" className='task-modal-div-checkList-middle-individual-checkList-text'
                                value={checklist.text}
                                onChange={(e) => handleChecklistChange(checklist.id, e.target.value)}
                                placeholder="Checklist item"
                                required
                                
                            />
                            <MdDelete className='task-modal-div-checkList-middle-individual-checkList-icon' 
                             onClick={() => deleteChecklist(checklist.id)} />
                          
                        </div>
                    ))}
                    <button type="button" onClick={() => addChecklist()}>
                    <FaPlus className="task-modal-div-checkList-middle-button-icon"/>
                        Add  Item
                    </button>
                    {/* <input type="date"/> */}
                </div>
                {/* <div onClick={()=>handleCheckList()}>Add New</div> */}
       
                {showCalendar && (
        <div className='date-picker'>
          <DatePicker
           selected={selectedDate ? new Date(selectedDate.split("-").reverse().join("-")) : null}
           onChange={(date) => {
             const formattedDate = format(date, "dd-MM-yyyy");
             const formattedDateToShow = format(date, "dd/MM/yyyy");
            setDateToShow(formattedDateToShow)
             setSelectedDate(formattedDate);
           }}
            inline // Shows the calendar inline without an input field
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              changeYear,
              changeMonth,
            }) => (
              <div className="custom-header">
                {/* Custom month and year controls */}
                <button type="button" onClick={decreaseMonth}>&lt;</button>
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(Number(value))}
                >
                  {Array.from({ length: 50 }, (_, i) => i + 2024).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={date.getMonth()}
                  onChange={({ target: { value } }) => changeMonth(Number(value))}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={i}>
                      {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={increaseMonth}>&gt;</button>
              </div>
            )}
            // minDate={subYears(new Date(), 20)} 
            // Limits the minimum selectable date
            minDate={new Date()}
            maxDate={addYears(new Date(), 20)} // Limits the maximum selectable date
          />
          
          {/* Custom buttons for Clear and Today */}
          <div className="calendar-controls">
            <button type="button" onClick={(e)=>handleClearDate(e)}>Clear</button>
            <button type="button" onClick={(e)=>handleTodayDate(e)}>Today</button>
          </div>
          </div>
      )}
                <div className='form-div-bottom-buttons'>

                    <div className='form-div-bottom-buttons-left'>

                    {showCalendar&& selectedDate &&<button type="button" onClick={() => setShowCalendar(!showCalendar)}>
                {/* {selectedDate ? `${selectedDate}` : "Select Due Date"}  */}
                     {dateToShow}
                    </button>}
                        
                    {!showCalendar&& selectedDate&& <button type="button" onClick={() => setShowCalendar(!showCalendar)}>
                
                    {dateToShow}
                    </button>}

                    {!showCalendar&& !selectedDate&& <button type="button" onClick={() => setShowCalendar(!showCalendar)}>
                
                Select Due Date
                </button>} 

                {showCalendar&& !selectedDate&& <button type="button" onClick={() => setShowCalendar(!showCalendar)}>
                
                Select Due Date
                </button>} 
                            
                    {/* {!showCalendar&&selectedDate &&<button type="button" onClick={() => setShowCalendar(!showCalendar)}>
                
                {selectedDate}
                    </button>} */}
                        
       
                    </div>

                    <div className='form-div-buttons-right'>
                        <button type="button" className='form-div-buttons-right-close'
                         onClick={() => handleTaskModalClose()}>Cancel</button>
                        {createTaskLoading==false&&<button type="submit" className='form-div-buttons-right-save'
                        >Save</button>}

                    {createTaskLoading==true&&<button type="submit" className='form-div-buttons-right-save' disabled
                        >Save..........</button>}

                    </div>

                </div>
            </form>
        </div>
    )
}
