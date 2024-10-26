// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import "./AssigneeList.css"
// import { setAssigneePersonList } from '../../redux/slice/userSlice'
// export default function AssigneeList() {
//     const{assigneeList,assigneePersonList}=useSelector((state)=>state.user)
   
//     const dispatch=useDispatch()
//     // let assigneePersonList=[]
//     const[aL,setAl]=useState([])
//     const handleAllPersonsToAssign=(email)=>
//     {
//         console.log(email)
//         setAl((prev)=>[...prev,email])
//         // dispatch(setAssigneePersonList((prev)=>[...prev,email]))
//         // assigneePersonList.push(email)
//     }
//     console.log(aL)
//   return (
//     <div className='task-modal-div-assigneeList'>
//         {assigneeList.map((curAssignee,index)=>{
//             return(
                
//                 <div className='task-modal-div-individualAssignee' key={index}>
//                     <span>{curAssignee.userName.substring(0,2)}</span>
//                     <span>{curAssignee.email}</span>
//                     <button type="button" onClick={()=>handleAllPersonsToAssign(curAssignee.email)}>Assign</button>
//                 </div>
                
//             )
//         })}
//     </div>
//   )
// }
