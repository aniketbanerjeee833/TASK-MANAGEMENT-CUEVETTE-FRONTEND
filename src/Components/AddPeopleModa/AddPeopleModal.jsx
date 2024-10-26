import React, { useState } from 'react'
import "./AddPeopleModal.css"
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddPeopleConfirmationModalOpen, setIsAddPeopleModalOpen, setIsAddPeopleSuccessfull } from '../../redux/slice/taskSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
export default function AddPeopleModal() {
    const dispatch=useDispatch()
    const{isAddpeopleSuccessfull}=useSelector((state)=>state.task)
    const[addPeopleLoading,setAddPeopleLoading]=useState(false)
    const[email,setEmail]=useState("")
    const handleDeleteModalClose=()=>
    {
        dispatch(setIsAddPeopleModalOpen(false))
    }
    const handleAddPeopleConfirmationModal=async()=>
    {
        dispatch(setIsAddPeopleSuccessfull(""))
        const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
        setAddPeopleLoading(true)
        try {
          const response = await axios.put("https://task-management-cuevette-backend.onrender.com/api/v1/task/addAlltasks", {email},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response);
          if(response.data.success==true){

            dispatch(setIsAddPeopleModalOpen(false))
            dispatch(setIsAddPeopleSuccessfull(response.data.message))
            dispatch(setIsAddPeopleConfirmationModalOpen(true))
            setAddPeopleLoading(false)

          }else{
            toast.error(response?.data?.message)
            setAddPeopleLoading(false)
          }
        
          
          
      
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
            dispatch(setIsAddPeopleConfirmationModalOpen(false))
        }
      };
       
      console.log(isAddpeopleSuccessfull)
    

  return (
    <section className='add-people-modal-section'>
    <div className='add-people-modal-div'>
      <div className='add-people-modal-div-top'>
          <span>Add People To Board</span>
      </div>
      <div className='add-people-modal-div-middle'>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>

      </div>
      <div className='add-people-modal-div-button'>
       
         <button type="button" className='common-modal-buttons-cancel' onClick={()=>handleDeleteModalClose()}>Cancel</button>
         {addPeopleLoading==false&&<button type="button" className='common-modal-buttons' 
         onClick={()=>handleAddPeopleConfirmationModal()}>Add Email</button>}

{addPeopleLoading==true &&<button type="button" className='common-modal-buttons' 
         onClick={()=>handleAddPeopleConfirmationModal()}>Add Email....</button>}
      </div>
    </div>
  </section>
  )
}
