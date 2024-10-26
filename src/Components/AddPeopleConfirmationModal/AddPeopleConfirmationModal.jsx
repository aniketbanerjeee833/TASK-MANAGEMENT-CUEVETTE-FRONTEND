import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./AddPeopleConfirmationModal.css"
import { setIsAddPeopleConfirmationModalOpen, setIsAddPeopleModalOpen } from '../../redux/slice/taskSlice'

export default function AddPeopleConfirmationModal() {
    const{isAddPeopleSuccessfull}=useSelector((state)=>state.task)
    console.log(isAddPeopleSuccessfull)
    
    const dispatch=useDispatch()
    const handleAddPeopleConfirmationModalClose=()=>
    {
        dispatch(setIsAddPeopleModalOpen(false))
        dispatch(setIsAddPeopleConfirmationModalOpen(false))
    }
  return (
    <section className='add-people-confirmation-modal-section'>
    <div className='add-people-confirmation-modal-div'>
      <div className='add-people-confirmation-modal-div-top'>
          <span>{isAddPeopleSuccessfull}</span>
      </div>

      <div className='add-people-confirmation-modal-div-button'>
       
         <button type="button" className='common-modal-buttons' onClick={()=>handleAddPeopleConfirmationModalClose()}>Okay got it</button>
   
      </div>
    </div>
  </section>
  )
}
