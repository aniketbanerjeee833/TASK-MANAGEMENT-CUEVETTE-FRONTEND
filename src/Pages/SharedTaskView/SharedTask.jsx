import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./SharedTask.css"
import codesandbox from "../../assets/codesandbox.png"
import { shareFormatDueDate } from '../../utils/formatter';
export default function SharedTask() {

  const a = useParams()
  const taskId = a.taskId;
  const [singleTask, setSingleTask] = useState([])
  const [checkLists, setCheckLists] = useState([])
  const [dueDate, getDueDate] = useState("")
  const [formattedDueDate, setFormattedDueDate] = useState("")
  const getSingleTask = async () => {


    try {
      const response = await axios.get(`https://task-management-cuevette-backend.onrender.co/api/v1/task/sharedTask/${taskId}`,

      );

      console.log(response)
      setSingleTask(response?.data?.sharedTask)
      setCheckLists(response.data.sharedTask.checkList)
      getDueDate(response.data.sharedTask.dueDate)
    } catch (error) {


      console.log(error);
    }
  }

  console.log(dueDate)
  // const formatDueDate=(dueDate)=>
  //  {
  //     console.log(dueDate)
  //     const [day, month, year] = dueDate.split('-');

  //     // Create a new Date object (months are 0-indexed, so subtract 1 from month)
  //     const date = new Date(year, month - 1, day);

  //     // Create an options object for formatting
  //     const options = { month: 'short', day: 'numeric', year: 'numeric' };

  //     // Format the date to "October 20, 2024"
  //     const formattedDate = date.toLocaleDateString('en-US', options);
  //     const getDayWithSuffix = (day) => {
  //         if (day > 3 && day < 21) return day + 'th'; // 11th to 13th are all 'th'
  //         switch (day % 10) {
  //           case 1: return day + 'st';
  //           case 2: return day + 'nd';
  //           case 3: return day + 'rd';
  //           default: return day + 'th';
  //         }
  //       };

  //       // Get the day with suffix
  //       const dayWithSuffix = getDayWithSuffix(date.getDate());

  //       // Combine to get the final output
  //       const finalOutput = `${date.toLocaleString('default', { month: 'short' })} ${dayWithSuffix}`;
  //       console.log(finalOutput)
  //       setFormattedDueDate(finalOutput)


  // }

  useEffect(() => {
    getSingleTask();
    //  formatDueDate(dueDate)
  }, [])

  console.log(singleTask, checkLists, formattedDueDate)
  return (
    <section className='shared-task-section'>
      <div className='shared-task-div'>
      {/* <div className='shared-task-div-project-name'>
                    <span>Pro Manage</span>
            </div> */}
           <div className='shared-task-div-project-name'>
                    <img  className="project-name-image" src={codesandbox}/>
                    <span>Pro Manage</span>
                    </div>
        <div className='shared-task-div-top'>
          {singleTask.priority == "high-priority" && <div className='common-task-cards-high-priority-div'></div>}
          {singleTask.priority == "medium-priority" && <div className='common-task-cards-medium-priority-div'></div>}
          {singleTask.priority == "low-priority" && <div className='common-task-cards-low-priority-div'></div>}
          {singleTask.priority == "high-priority" && <span>HIGH PRIORITY</span>}
          {singleTask.priority == "medium-priority" && <span>MEDIUM PRIORITY</span>}
          {singleTask.priority == "LOW-priority" && <span>LOW PRIORITY</span>}
        </div>
        <div className='shared-task-div-top-heading'>
          <span>{singleTask.title}</span>
        </div>

        <div className='shared-task-div-checkList'>
          <div className='shared-task-div-checklist-heading'>
            <span>Checklist ({checkLists.filter((cur)=>cur.status==true).length}/{singleTask?.checkList?.length})</span>
          </div>
          <div className='shared-task-div-checklist-content-all-divs'>
          {checkLists?.map((curCheckList) => {
            return (
              <div className='shared-task-div-checklist-content ' key={curCheckList._id}>

                <input type="checkbox" className="checkbox1" checked={curCheckList.status} 

                />
                <span>{curCheckList.content}</span>

              </div>
            )
          })}
          </div>
        </div>
        <div className='shared-task-div-button'>
          <span>Due Date &nbsp;</span>
          {singleTask.dueDate!==""&&
          <div className='shared-task-div-button-due-date-present'>{shareFormatDueDate(dueDate)}</div>}

        </div>
      </div>
    </section>
  )
}
