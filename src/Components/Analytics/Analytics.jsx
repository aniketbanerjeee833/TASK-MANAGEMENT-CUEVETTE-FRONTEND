import React from 'react'
import { useSelector } from 'react-redux'
import "./Analytics.css"
export default function Analytics() {
  const { analyticsTask } = useSelector((state) => state.task)

  return (
    <>
      <div className='right-home-analytics-div-top'>
        <span>Analytics</span>
      </div>

      <div className='right-home-analytics-div-bottom'>

        <div className='right-home-analytics-div-bottom-left'>


          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>Backlog Task  </span>
            </div>
            <span>{analyticsTask.sumBacklogTask<10? "0" + analyticsTask.sumBacklogTask :analyticsTask.sumBacklogTask}</span>
          </div>



          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>To Do </span>
            </div>
            <span>{analyticsTask.sumToDoTask<10? "0" + analyticsTask.sumToDoTask :analyticsTask.sumToDoTask}</span>
           
          </div>



          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>In Progress </span>
            </div>
            <span>{analyticsTask.sumInProgressTask<10? "0" + analyticsTask.sumInProgressTask :analyticsTask.sumInProgressTask}</span>
           
          </div>





          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>Completed Task </span>
            </div>
            <span>{analyticsTask.sumDoneTask<10? "0" + analyticsTask.sumDoneTask :analyticsTask.sumDoneTask}</span>
        
          </div>

        </div>


        <div className='right-home-analytics-div-bottom-right'>

          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>High Priority Task </span>
            </div>
            <span>{analyticsTask.sumHighPriorityTask<10? "0" + analyticsTask.sumHighPriorityTask :analyticsTask.sumHighPriorityTask}</span>
        
          </div>



          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>Medium Priority Task </span>
            </div>
            <span>{analyticsTask.sumMediumPriorityTask<10? "0" + analyticsTask.sumMediumPriorityTask :analyticsTask.sumMediumPriorityTask}</span>
        
          </div>




          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>Low Priority Task </span>
            </div>
            <span>{analyticsTask.sumLowPriorityTask<10? "0" + analyticsTask.sumLowPriorityTask :analyticsTask.sumLowPriorityTask}</span>
       
          </div>




          <div className='right-home-analytics-common-div-bottom'>

            <div className='right-home-analytics-common-div-bottom-right'>
              <div className='right-home-analytics-common-div-bottom-priority'></div>
              <span>Due Date Task </span>
            </div>
            <span>{analyticsTask.sumDueDateTask<10? "0" + analyticsTask.sumDueDateTask :analyticsTask.sumDueDateTask}</span>
         
          </div>

        </div>
      </div>
    </>
  )
}
