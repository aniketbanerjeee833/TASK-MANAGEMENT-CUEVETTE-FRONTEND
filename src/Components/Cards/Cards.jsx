import React, { useEffect, useState } from 'react'
import "./Cards.css"
import { VscCollapseAll } from "react-icons/vsc"
import { FaPlus } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { PiDotsThreeBold } from "react-icons/pi"
import { FaChevronUp } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { getAllMyTasks,
     setIsDeleteModalOpen, setIsEditModalOpen, setSingleTaskId, setTaskIdToDelete, setTaskModalOpen, setThreeDotsOpen, updateTaskStatus } from '../../redux/slice/taskSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { formatDueDate } from '../../utils/formatter'
import Spinner from '../Spinner/Spinner'
export default function Cards() {
    const dispatch=useDispatch()
    const { tasks,isThreeDotsOpen,tasksLoading,thisWeek1,thisMonth1,thisDay1 } = useSelector((state) => state.task)
    const [isChecked1, setIsChecked1] = useState(false);
  
    const [checkListToDoDropDown, setCheckListToDoDropDown] = useState(false)

    const[currentTaskId,setCurrentTaskId]=useState("")
    const[currentTaskDropDownId,setCurrentTaskDropDownId]=useState("")
    const[openedCheckList,setOpenedCheckList]=useState(false)
    //const[selected,setSelected]=useState(null)
    const [multiple, setMultiple] = useState([]);
    const [multipleToDo, setMultipleToDo] = useState([]);
    const [multipleInProgress, setMultipleInProgress] = useState([]);
    const [multipleDone, setMultipleDone] = useState([]);
    const[multipleThreeDotsBookmark,setMultipleThreeDotsBookmark]=useState([])
    const[multipleThreeDotsToDo,setMultipleThreeDotsToDo]=useState([])
    const[multipleThreeDotsDone,setMultipleThreeDotsDone]=useState([])
    const[multipleThreeDotsInProgress,setMultipleThreeDotsInProgress]=useState([])

    const handleCheckListBookmarkDropDown = (taskId) => {

        //console.log(taskId)
        let cpyMutiple = [...multiple];
        const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
    
        //console.log(findIndexOfCurrentId);
        if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
        else cpyMutiple.splice(findIndexOfCurrentId, 1);
    
        setMultiple(cpyMutiple);
      
        //     setOpenedCheckList(!openedCheckList)
     
        //     setCheckListBookmarkDropDown(!checkListBookmarkDropDown)

        //  setCurrentTaskDropDownId(taskId)
         //setSelected(taskId==taskId?null:taskId)
        
    }
    

    const handleCheckListToDoDropDown = (taskId) => {
        let cpyMutiple = [...multipleToDo];
        const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
    
        //console.log(findIndexOfCurrentId);
        if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
        else cpyMutiple.splice(findIndexOfCurrentId, 1);
    
        setMultipleToDo(cpyMutiple);
      
       
   }

   const handleCheckListInProgressDropDown = (taskId) => {
    let cpyMutiple = [...multipleInProgress];
    const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);

    //console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultipleInProgress(cpyMutiple);
  
   
}
const handleCheckListDoneDropDown = (taskId) => {
    let cpyMutiple = [...multipleDone];
    const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);

    //console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultipleDone(cpyMutiple);
  
   
}

    const handleBookmarkCollapseAll=()=>
    {
        //setCheckListBookmarkDropDown(false)
        setMultiple([])
    }
    const handleToDoCollapseAll=()=>
        {
            //setCheckListToDoDropDown(false)
            setMultipleToDo([])
        }
        const handleInProgressCollapseAll=()=>
            {
                //setCheckListInProgressDropDown(false)
                setMultipleInProgress([])
            }
            const handleDoneCollapseAll=()=>
                {
                    //setCheckListDoneDropDown(false)
                    setMultipleDone([])
                }
    
console.log(thisWeek1,thisDay1,thisMonth1)
    const handleTaskOpen=()=>
    {
        dispatch(setTaskModalOpen(true))
    }
   
        const handleTaskStatus=(taskId,status)=>
        {
            console.log(taskId,status)
            dispatch(updateTaskStatus(taskId,status))
            
        }
        const handleThreeDotsOpenBookmark=async(taskId)=>
        {
            //dispatch(setThreeDotsOpen(!isThreeDotsOpen))

            let cpyMutiple = [...multipleThreeDotsBookmark];
            const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
        
            //console.log(findIndexOfCurrentId);
            if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
            else cpyMutiple.splice(findIndexOfCurrentId, 1);
        
            setMultipleThreeDotsBookmark(cpyMutiple);
          
        }
        const handleThreeDotsOpenToDo=async(taskId)=>
            {
                //dispatch(setThreeDotsOpen(!isThreeDotsOpen))
    
                let cpyMutiple = [...multipleThreeDotsToDo];
                const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
            
                //console.log(findIndexOfCurrentId);
                if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
                else cpyMutiple.splice(findIndexOfCurrentId, 1);
            
                setMultipleThreeDotsToDo(cpyMutiple);
              
            }
            const handleThreeDotsOpenInProgress=async(taskId)=>
                {
                    //dispatch(setThreeDotsOpen(!isThreeDotsOpen))
        
                    let cpyMutiple = [...multipleThreeDotsInProgress];
                    const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
                
                    //console.log(findIndexOfCurrentId);
                    if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
                    else cpyMutiple.splice(findIndexOfCurrentId, 1);
                
                    setMultipleThreeDotsInProgress(cpyMutiple);
                  
                }
                const handleThreeDotsOpenDone=async(taskId)=>
                    {
                        //dispatch(setThreeDotsOpen(!isThreeDotsOpen))
            
                        let cpyMutiple = [...multipleThreeDotsDone];
                        const findIndexOfCurrentId = cpyMutiple.indexOf(taskId);
                    
                        //console.log(findIndexOfCurrentId);
                        if (findIndexOfCurrentId === -1) cpyMutiple.push(taskId);
                        else cpyMutiple.splice(findIndexOfCurrentId, 1);
                    
                        setMultipleThreeDotsDone(cpyMutiple);
                      
                    }

        const handleDeleteModal=(taskId)=>{
            
            dispatch(setIsDeleteModalOpen(true))
            dispatch(setTaskIdToDelete(taskId))
            setMultipleThreeDotsBookmark([]);
            setMultipleThreeDotsToDo([]);
            setMultipleThreeDotsInProgress([])
            setMultipleThreeDotsDone([])
        }

        //console.log(tasks,tasksLoading)
        const[copyOfCheckList,setCopyOfCheckList]=useState({})
        const[taskIdToUpdate,setTaskIdToUpdate]=useState("")
        const handleCheckListUpdate=(taskId, checkListId)=>
        {
            //const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
            //console.log(taskId,checkListId)
            setTaskIdToUpdate(taskId)
            // setCheckList(checkList.map(item => 
            //     item.id === id ? { ...item, status: !item.status } : item
            //   ));
            // let curTask=tasks.filter((cur)=>cur._id==taskId)
            // console.log(curTask[0].checkList)
            let curTask = tasks.find((task) => task._id === taskId);
                //console.log(curTask)
            if (curTask) {
                const existingCheckList = copyOfCheckList[taskId] || curTask.checkList
              // Update the checklist for the selected task
              let updatedCheckList = existingCheckList.map((item) =>
                item._id == checkListId ? { ...item, status: !item.status } : item
              );
              console.log(updatedCheckList)
              setCopyOfCheckList((prev) => ({
                ...prev,
                [taskId]: updatedCheckList,
              }));
            // setCopyOfCheckList((prev)=>({}))
             // setCopyOfCheckList(updatedCheckList);
             console.log("copyOfCheckList",copyOfCheckList)
            }
          
        
            
           
            // try {
            //   const response = await axios.patch(`https://task-management-cuevette-backend.onrender.com/api/v1/task/updateTask/${taskId}/${checkListId}`, {status}, {
            //     headers: {
            //       Authorization: `Bearer ${token}`
            //     }
            //   });
            //   console.log(response.data);
           
            // } catch (error) {
            //   console.log(error)
            // }
          };
          console.log("copyOfCheckList",copyOfCheckList)

          const updateCheckListOnBackend = async (taskId, updatedCheckList) => {
            console.log(taskId,updatedCheckList)
            const token = JSON.parse(localStorage.getItem("APP-TOKEN"))

            try {
              const response = await axios.patch(`https://task-management-cuevette-backend.onrender.com/api/v1/task/updateCheckListStatus/${taskId}`,{updatedCheckList} ,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              console.log(response)
              if(response.data.success==true){
                toast.success(response.data.message)
              }
          }catch(error){
            console.log(error)

          }
    
        }

       
          //console.log(taskIdToUpdate)
        
          const handleSaveUpdates = () => {
            // Send all accumulated updates to the backend at once
            for (const taskId in copyOfCheckList) {
               
              updateCheckListOnBackend(taskId, copyOfCheckList[taskId]);

            }
            //setCopyOfCheckList({});
        }

        const handleEditTask=(taskId)=>{
            dispatch(setThreeDotsOpen(false))
            dispatch(setSingleTaskId(taskId))
            dispatch(setIsEditModalOpen(true))
            setMultipleThreeDotsBookmark([]);
            setMultipleThreeDotsToDo([]);
            setMultipleThreeDotsInProgress([])
            setMultipleThreeDotsDone([])

        }
        useEffect(() => {
            const saveInterval = 1000; // Auto-save interval (e.g., 5 seconds)
            //const autoSaveDuration = 60000; // Stop auto-save after this duration (e.g., 1 minute)
            const autoSaveDuration=2000
            // Start interval for saving updates
            const interval = setInterval(() => {
              handleSaveUpdates();
            }, saveInterval);
        
            // Set timeout to stop the interval after the defined duration
            const timeout = setTimeout(() => {
              clearInterval(interval); // Stop the interval after the timeout
              console.log("Auto-save stopped");
            }, autoSaveDuration);
        
            // Cleanup interval and timeout on component unmount
            return () => {
              clearInterval(interval);
              clearTimeout(timeout);
            };
            },[copyOfCheckList])

     

        const handleShareTask=(taskId)=>
        {
            setMultipleThreeDotsBookmark([]);
            setMultipleThreeDotsToDo([]);
            setMultipleThreeDotsInProgress([])
            setMultipleThreeDotsDone([])
            navigator.clipboard.writeText(`https://task-management-cuevette-backend.onrender.com/singleTask/${taskId}`)
            //navigator.clipboard.writeText(`http://localhost:5173/singleStory/${singleStoryId}/${currentIndex}`)
    //navigator.clipboard.writeText(`https://social-media-cuevette-frontend-three.vercel.app/${singleStoryId}/${currentIndex}`)
      //navigator.clipboard.writeText(`https://social-media-cuevette-frontend-three.vercel.app/singleStory/${singleStoryId}/${currentIndex}`)
      toast.success("link Copied to clipboard")
        }
    
    console.log(copyOfCheckList)
    return (
        <>
            <div className='backlog-div'>
               
                <div className='common-top-div'>
                    <span>Backlog</span>
                 
                    <div className='common-top-div-right'>
                    <VscCollapseAll className='common-collapse-icon' onClick={() => handleBookmarkCollapseAll()}
                     />
                  
                    </div>
                  
                
                </div>
                {tasksLoading==true&&<Spinner/>}
                {tasks.map((curTask, index) => {
            const displayedCheckList =copyOfCheckList[curTask._id] || curTask.checkList;
                    return (

                        curTask?.taskStatus == "backlog" &&
                        <div className='common-task-cards' key={index}>

                            <div className='common-task-cards-top-div'>
                                <div className='common-task-cards-top-div-left'>

                              
                                {curTask.priority=="high-priority"&&<div className='common-task-cards-high-priority-div'></div>}
                                {curTask.priority=="medium-priority"&&<div className='common-task-cards-medium-priority-div'></div>}
                                {curTask.priority=="low-priority"&&<div className='common-task-cards-low-priority-div'></div>}

                                {curTask.priority=="high-priority"&&<span className='common-task-cards-high-priority-span'>HIGH PRIORITY</span>}
                                {curTask.priority=="medium-priority"&&<span className='common-task-cards-medium-priority-span'>MODERATE PRIORITY</span>}
                                {curTask.priority=="low-priority"&&<span className='common-task-cards-low-priority-span'>LOW PRIORITY</span>}
                                <div className='common-task-cards-top-div-left-name'>
                                {curTask?.userName?.substring(0,2)}
                                </div>
                                
                                </div>
                                <div className='common-task-cards-top-div-right'>
                                <PiDotsThreeBold className='common-task-cards-top-div-right-icon'
                                 onClick={()=>handleThreeDotsOpenBookmark(curTask._id)} />

                                
                                {multipleThreeDotsBookmark.indexOf(curTask._id) !== -1 &&<div className='common-task-cards-top-div-three-dots-open'>
                                            <span onClick={()=>handleEditTask(curTask._id)}>Edit</span>
                                            <span onClick={()=>handleShareTask(curTask._id)}>Share</span>
                                            <span className='delete-span' onClick={()=>handleDeleteModal(curTask._id)}>Delete</span>
                                        </div>}
                                        </div>
                             
                            </div>
                        
                         

                            {curTask.title.length>10?

                            (<span className='common-task-cards-title-tooltip'   title={curTask.title}>
                                {curTask.title.substring(0,10)+"..."}</span>):(
                                <span className='common-task-cards-title'>{curTask.title}</span>
                            )} 
{/* 
{curTask.title.length > 10 ? (
    <span className="common-task-cards-title-tooltip">
        {curTask.title.substring(0, 10) + "..."}
        <span className="tooltip-text">{curTask.title}</span>
    </span>
) : (
    <span className="common-task-cards-title">{curTask.title}</span>
)} */}

                            <div className='common-task-cards-middle-div' >
                                <span>CheckList ({displayedCheckList.filter((cur)=>cur.status==true).length}/
                                    {displayedCheckList.length})</span>

                                {multiple.indexOf(curTask._id) == -1 ?(<FaChevronDown className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListBookmarkDropDown(curTask._id)} />):(
                                <FaChevronUp  className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListBookmarkDropDown(curTask._id)} /> 
                                )}
                                  
                                
                            </div>
                            {multiple.indexOf(curTask._id) !== -1 && <div className='common-task-cards-middle-div-checklist'>
                                        {displayedCheckList?.map((curCheckList)=>{
                                            return (
         
                                                    <div className='common-task-cards-middle-div-checklist-content ' key={curCheckList._id}>

                                            <input type="checkbox" onChange={()=>handleCheckListUpdate(curTask._id,curCheckList._id)}
                                                 checked={curCheckList.status ||false}/>
                                                
                                               
                                                
                                                <span>{curCheckList.content}</span>
                                                
                                            </div>
                                            
                                            )})
                                         }

                                    </div>}
                            <div className='common-task-cards-bottom-div'>

                                {curTask.dueDate && curTask.dueDate.trim()!= "" 
                                && <div className={`${ curTask.dueDatePassed== "yes" ? "common-task-cards-bottom-dueDate-div-active" : 
                                    "common-task-cards-bottom-dueDate-div-inactive "}`}>
                                    {formatDueDate(curTask.dueDate)}
                                    </div>}

                                    {!curTask.dueDate 
                                && <div className='fake-div'>
                                   
                                    </div>}

                                    {/* {curTask.dueDate==""&&<div className={`${ curTask.dueDatePassed== "yes" ? "common-task-cards-bottom-dueDate-div-active" : 
                                    "common-task-cards-bottom-dueDate-div "}`}>
                                    
                                    </div>} */}
                                <div className='common-task-cards-bottom-div-button'>
                                    <button type="button" onClick={()=>handleTaskStatus( curTask._id,"in-progress")}>PROGRESS</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"to-do")}>TO DO</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"done")}>DONE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}



            </div>
            <div className='to-do-div'>
           
                <div className='to-do-top-div'>
                    <span>To Do</span>

                    <div className='common-top-div-right'>
                    <FaPlus onClick={()=>handleTaskOpen()} className='common-to-do-top-div-right-icon'/>
                    <VscCollapseAll className='common-collapse-icon' onClick={() => handleToDoCollapseAll()}/>
                    </div>
                  
                   
                </div>
                {tasksLoading==true&&<Spinner/>}
                {tasks?.map((curTask, index) => {
            const displayedCheckList =copyOfCheckList[curTask._id] || curTask.checkList;
                    return (

                        curTask?.taskStatus == "to-do" &&
                        <div className='common-task-cards' key={index}>

                            <div className='common-task-cards-top-div'>
                            <div className='common-task-cards-top-div-left'>
                            {curTask.priority=="high-priority"&&<div className='common-task-cards-high-priority-div'></div>}
                                {curTask.priority=="medium-priority"&&<div className='common-task-cards-medium-priority-div'></div>}
                                {curTask.priority=="low-priority"&&<div className='common-task-cards-low-priority-div'></div>}

                                {curTask.priority=="high-priority"&&<span className='common-task-cards-high-priority-span'>HIGH PRIORITY</span>}
                                {curTask.priority=="medium-priority"&&<span className='common-task-cards-medium-priority-span'>MODERATE PRIORITY</span>}
                                {curTask.priority=="low-priority"&&<span className='common-task-cards-low-priority-span'>LOW PRIORITY</span>}
                                <div className='common-task-cards-top-div-left-name'>
                                {curTask?.userName?.substring(0,2)}
                                </div>
                                </div>
                                <div className='common-task-cards-top-div-right'>
                                <PiDotsThreeBold className='common-task-cards-top-div-right-icon'
                                onClick={()=>handleThreeDotsOpenToDo(curTask._id)}/>
                                {multipleThreeDotsToDo.indexOf(curTask._id) !== -1 &&<div className='common-task-cards-top-div-three-dots-open'>
                                            <span onClick={()=>handleEditTask(curTask._id)}>Edit</span>
                                            <span onClick={()=>handleShareTask(curTask._id)}>Share</span>
                                            <span className='delete-span' onClick={()=>handleDeleteModal(curTask._id)}>Delete</span>
                                        </div>}
                              </div>
                            </div>
                         
                          
                                        
                
{curTask.title.length>10?

(<span className='common-task-cards-title-tooltip'   title={curTask.title}>
    {curTask.title.substring(0,10)+"..."}</span>):(
    <span className='common-task-cards-title'>{curTask.title}</span>
)}

                            <div className='common-task-cards-middle-div' >
                            <span>CheckList ({displayedCheckList?.filter((cur)=>cur.status==true).length}/
                            {displayedCheckList?.length})</span>
                            

                            {multipleToDo.indexOf(curTask._id) == -1 ?(<FaChevronDown className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListToDoDropDown (curTask._id)} />):(
                                <FaChevronUp  className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListToDoDropDown (curTask._id)} /> 
                                )}
                                  
                              
                            </div>
                            {multipleToDo.indexOf(curTask._id) !== -1  && <div className='common-task-cards-middle-div-checklist'>
                                        {displayedCheckList?.map((curCheckList)=>{
                                            return (
         
                                                    <div className='common-task-cards-middle-div-checklist-content ' key={curCheckList._id}>

                                                <input type="checkbox" onChange={()=>handleCheckListUpdate(curTask._id,curCheckList._id)}
                                                 checked={curCheckList.status ||false}/>
                                                <span>{curCheckList.content}</span>
                                                
                                            </div>
                                            
                                            )})
                                         }

                                    </div>}
                            
                            <div className='common-task-cards-bottom-div'>

                            {curTask.dueDate && curTask.dueDate.trim()!= "" 
                                && <div className={`${ curTask.dueDatePassed== "yes" ? "common-task-cards-bottom-dueDate-div-active" : 
                                "common-task-cards-bottom-dueDate-div-inactive"}`}>
                            {formatDueDate(curTask.dueDate)}</div>}

                            {!curTask.dueDate 
                                && <div className='fake-div'>
                                   
                                    </div>}

                                <div className='common-task-cards-bottom-div-button'>
                                <button type="button" onClick={()=>handleTaskStatus( curTask._id,"in-progress")}>PROGRESS</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"backlog")}>BACKLOG</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"done")}>DONE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <div className='in-progress-div'>
           
                <div className='common-top-div'>
                    <span>In Progress</span>

                    <div className='common-top-div-right'>
                    <VscCollapseAll className='common-collapse-icon' onClick={() => handleInProgressCollapseAll()}
                     />
                  
                    </div>
                 

                </div>
                {tasksLoading==true&&<Spinner/>}
                {tasks?.map((curTask, index) => {
                     const displayedCheckList =copyOfCheckList[curTask._id] || curTask.checkList;
                    return (

                        curTask?.taskStatus == "in-progress" &&
                        <div className='common-task-cards' key={index}>
                            <div className='common-task-cards-top-div'>
                            <div className='common-task-cards-top-div-left'>
                            {curTask.priority=="high-priority"&&<div className='common-task-cards-high-priority-div'></div>}
                                {curTask.priority=="medium-priority"&&<div className='common-task-cards-medium-priority-div'></div>}
                                {curTask.priority=="low-priority"&&<div className='common-task-cards-low-priority-div'></div>}

                                {curTask.priority=="high-priority"&&<span className='common-task-cards-high-priority-span'>HIGH PRIORITY</span>}
                                {curTask.priority=="medium-priority"&&<span className='common-task-cards-medium-priority-span'>MODERATE PRIORITY</span>}
                                {curTask.priority=="low-priority"&&<span className='common-task-cards-low-priority-span'>LOW PRIORITY</span>}

                                <div className='common-task-cards-top-div-left-name'>
                                {curTask?.userName?.substring(0,2)}
                                </div>
                                </div>
                                <div className='common-task-cards-top-div-right'>
                                <PiDotsThreeBold className='common-task-cards-top-div-right-icon'
                                onClick={()=>handleThreeDotsOpenInProgress(curTask._id)} />
                                {multipleThreeDotsInProgress.indexOf(curTask._id) !== -1 &&
                            <div className='common-task-cards-top-div-three-dots-open'>
                                            <span onClick={()=>handleEditTask(curTask._id)}>Edit</span>
                                            <span onClick={()=>handleShareTask(curTask._id)}>Share</span>
                                            <span className='delete-span' onClick={()=>handleDeleteModal(curTask._id)}>Delete</span>
                                        </div>}
                                        </div>
                            </div>
                            
                  

                {curTask.title.length>10?

                (<span className='common-task-cards-title-tooltip'   title={curTask.title}>
                        {curTask.title.substring(0,10)+"..."}</span>):(
                                <span className='common-task-cards-title'>{curTask.title}</span>
                                )}
                            <div className='common-task-cards-middle-div' >

                           
                            <span>CheckList ({displayedCheckList?.filter((cur)=>cur.status==true).length}/
                            {displayedCheckList?.length})</span>
                               
                            {multipleInProgress.indexOf(curTask._id) == -1 ?(<FaChevronDown className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListInProgressDropDown(curTask._id)} />):(
                                <FaChevronUp  className='common-task-cards-middle-div-icon' 
                                onClick={() => handleCheckListInProgressDropDown(curTask._id)} /> 
                                )}
                              
                            </div>
                            {multipleInProgress.indexOf(curTask._id) !== -1 &&<div className='common-task-cards-middle-div-checklist'>
                                        {displayedCheckList.map((curCheckList)=>{
                                            return (
         
                                                    <div className='common-task-cards-middle-div-checklist-content ' key={curCheckList._id}>
                                                          <input type="checkbox" onChange={()=>handleCheckListUpdate(curTask._id,curCheckList._id)}
                                                 checked={curCheckList.status ||false}/>
                                                
                                                
                                                <span>{curCheckList.content}</span>
                                                
                                            </div>
                                            
                                            )})
                                         }

                                    </div>}
                            <div className='common-task-cards-bottom-div'>

                            
                             
                            {curTask.dueDate && curTask.dueDate.trim()!= "" 
                                && <div className={`${ curTask.dueDatePassed== "yes" ? "common-task-cards-bottom-dueDate-div-active" : 
                                "common-task-cards-bottom-dueDate-div-inactive"}`}>
                            {formatDueDate(curTask.dueDate)}</div>}

                            {!curTask.dueDate 
                                && <div className='fake-div'>
                                   
                                    </div>}
                                <div className='common-task-cards-bottom-div-button'>
                                <button type="button" onClick={()=>handleTaskStatus( curTask._id,"backlog")}>BACKLOG</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"to-do")}>TO DO</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"done")}>DONE</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <div className='done-div'>
         
                <div className='common-top-div'>
                    <span>Done</span>

                    <div className='common-top-div-right'>
                   
                    <VscCollapseAll className='common-collapse-icon' onClick={() => handleDoneCollapseAll()}
                     />
                  
                    </div>
                   
                </div>
                {tasksLoading==true&&<Spinner/>}
                {tasks?.map((curTask, index) => {
                        const displayedCheckList =copyOfCheckList[curTask._id] || curTask.checkList;
                    return (

                        curTask?.taskStatus == "done" &&
                        <div className='common-task-cards' key={index}>
                            <div className='common-task-cards-top-div'>
                            <div className='common-task-cards-top-div-left'>
                            {curTask.priority=="high-priority"&&<div className='common-task-cards-high-priority-div'></div>}
                                {curTask.priority=="medium-priority"&&<div className='common-task-cards-medium-priority-div'></div>}
                                {curTask.priority=="low-priority"&&<div className='common-task-cards-low-priority-div'></div>}

                                {curTask.priority=="high-priority"&&<span className='common-task-cards-high-priority-span'>HIGH PRIORITY</span>}
                                {curTask.priority=="medium-priority"&&<span className='common-task-cards-medium-priority-span'>MODERATE PRIORITY</span>}
                                {curTask.priority=="low-priority"&&<span className='common-task-cards-low-priority-span'>LOW PRIORITY</span>}
                                <div className='common-task-cards-top-div-left-name'>
                                {curTask?.userName?.substring(0,2)}
                                </div>
                              
                                </div>
                                <div className='common-task-cards-top-div-right'>
                                <PiDotsThreeBold onClick={()=>handleThreeDotsOpenDone(curTask._id)}  />
                                {multipleThreeDotsDone.indexOf(curTask._id) !== -1 &&
                            <div className='common-task-cards-top-div-three-dots-open'>
                                            <span onClick={()=>handleEditTask(curTask._id)}>Edit</span>
                                            <span onClick={()=>handleShareTask(curTask._id)}>Share</span>
                                            <span className='delete-span' onClick={()=>handleDeleteModal(curTask._id)}>Delete</span>
                                        </div>}
                                        </div>
                            </div>
                            
                            {curTask.title.length>10?

(<span className='common-task-cards-title-tooltip'   title={curTask.title}>
    {curTask.title.substring(0,10)+"..."}</span>):(
    <span className='common-task-cards-title'>{curTask.title}</span>
)}
                            <div className='common-task-cards-middle-div' >

                            <span>CheckList ({displayedCheckList?.filter((cur)=>cur.status==true).length}/
                            {displayedCheckList?.length})</span>

                            {multipleDone.indexOf(curTask._id) == -1 ?(<FaChevronDown className='common-task-cards-middle-div-icon' 
                                onClick={() =>  handleCheckListDoneDropDown(curTask._id)} />):(
                                <FaChevronUp  className='common-task-cards-middle-div-icon' 
                                onClick={() =>  handleCheckListDoneDropDown(curTask._id)} /> 
                                )}
                              
                            </div>
                            {multipleDone.indexOf(curTask._id) !== -1 && <div className='common-task-cards-middle-div-checklist'>
                                        {displayedCheckList.map((curCheckList)=>{
                                            return (
         
                                                    <div className='common-task-cards-middle-div-checklist-content ' key={curCheckList._id}>

                                        <input type="checkbox" onChange={()=>handleCheckListUpdate(curTask._id,curCheckList._id)}
                                                 checked={curCheckList.status ||false}/>
                                                <span>{curCheckList.content}</span>
                                                
                                            </div>
                                            
                                            )})
                                         }

                                    </div>}
                            <div className='common-task-cards-bottom-div'>

                            {curTask.dueDate &&
                              <div className="common-task-cards-bottom-dueDate-doneDiv-active"
                              >
                           {formatDueDate(curTask.dueDate)}</div>}


                           {!curTask.dueDate 
                                && <div className='fake-div'>
                                   
                                    </div>}

                            {/* <div className={`${ curTask.taskStatus== "done" ?
                                 "common-task-cards-bottom-dueDate-doneDiv-active" : "common-task-cards-bottom-dueDate-doneDiv "}`}>
                            {formatDueDate(curTask.dueDate)}</div>} */}

                                <div className='common-task-cards-bottom-div-button'>
                                <button type="button" onClick={()=>handleTaskStatus( curTask._id,"in-progress")}>PROGRESS</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"to-do")}>TO DO</button>
                                    <button type="button" onClick={()=>handleTaskStatus(curTask._id,"backlog")}>BACKLOG</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </>
    )
}