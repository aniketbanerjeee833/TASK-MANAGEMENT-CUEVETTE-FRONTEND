import React from 'react'
import "./DeleteModal.css"
import { deleteMyTasks, getAllMyTasks, setIsDeleteModalOpen } from '../../redux/slice/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function DeleteModal() {
  const{taskIdToDelete,deleteLoading}=useSelector((state)=>state.task)
  console.log(taskIdToDelete,deleteLoading)
    const dispatch=useDispatch()
    const handleDeleteModalClose=()=>
    {
        dispatch(setIsDeleteModalOpen(false))   
    }
    const handleDelete=()=>
    {
      dispatch(deleteMyTasks(taskIdToDelete))
    
    }
  return (
    <section className='delete-modal-section'>
      <div className='delete-modal-div'>
        <div className='delete-modal-div-top'>
            <span>Are You sure You want to delete?</span>
        </div>
        <div className='delete-modal-div-button'>
           {deleteLoading==false&&<button type="button" className='common-modal-buttons' onClick={()=>handleDelete()}>Yes,Delete</button>}
           {deleteLoading==true&&<button type="button" disabled className='common-modal-buttons' onClick={()=>handleDelete()}>Yes,Delete.....</button>}
           <button type="button" className='common-modal-buttons-cancel' onClick={()=>handleDeleteModalClose()}>Cancel</button>
        </div>
      </div>
    </section>
  )
}
