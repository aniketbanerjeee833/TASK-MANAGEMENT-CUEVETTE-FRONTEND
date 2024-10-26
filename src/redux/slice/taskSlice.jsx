import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    tasksLoading: false,
    taskModalOpen: false,
    isBoardOpen: true,
    isAnalyticsOpen: false,
    isSettingsOpen: false,
    analyticsTask: [],
    isThreeDotsOpen:false,
    isDeleteModalOpen:false,
    isAddPeopleModalOpen:false,
    isAddPeopleConfirmationModalOpen:false,
    isAddPeopleSuccessfull:"",
    singleTaskId:"",
    isEditModalOpen:false,
    taskIdToDelete:"",
    deleteLoading:false

  },
  reducers: {
    setTaskIdToDelete(state,action){
      state.taskIdToDelete = action.payload
    },
    setIsEditModalOpen(state,action){
      state.isEditModalOpen = action.payload
    },
    setSingleTaskId(state,action){
      state.singleTaskId = action.payload
    },
    setIsAddPeopleSuccessfull(state,action){
      state.isAddPeopleSuccessfull = action.payload
    },
    setIsAddPeopleConfirmationModalOpen(state,action){
      state.isAddPeopleConfirmationModalOpen = action.payload
    },
    setIsAddPeopleModalOpen(state,action){
      state.isAddPeopleModalOpen = action.payload
    },
    setIsDeleteModalOpen(state,action){
      state.isDeleteModalOpen = action.payload
    },
    setThreeDotsOpen(state,action){
      state.isThreeDotsOpen = action.payload
    },
    setIsBoardOpen(state, action) {
      state.isBoardOpen = action.payload
    },
    setIsAnalyticsOpen(state, action) {
      state.isAnalyticsOpen = action.payload
    },
    setIsSettingsOpen(state, action) {
      state.isSettingsOpen = action.payload
    },
    setTaskModalOpen(state, action) {
      state.taskModalOpen = action.payload
    },
    getAllTasksRequest(state, action) {
      state.tasks = [];

      state.tasksLoading = true;
    },
    getAllTasksSuccess(state, action) {
      state.tasks = action.payload;

      state.tasksLoading = false;
    },
    getAllTasksFailed(state, action) {
      state.tasks = state.tasks;

      state.tasksLoading = false;
    },
    getAllAnalyticsTask(state, action) {
      state.analyticsTask = action.payload
    },

    deleteTaskRequest(state, action) {
     

      state.deleteLoading = true;
    },
    deleteTaskSuccess(state, action) {


      state.deleteLoading = false;
    },
    deleteTaskFailed(state, action) {
     

      state.deleteLoading = false;
    },


  }
})
export const getAllMyTasks = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  dispatch(taskSlice.actions.getAllTasksRequest());
  try {
    const response = await axios.get("https://task-management-cuevette-backend.onrender.com/api/v1/task/allMyTasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
   

    dispatch(taskSlice.actions.getAllTasksSuccess(response?.data?.tasks));


  } catch (error) {
    dispatch(taskSlice.actions.getAllTasksFailed(error.response?.data?.message));
  }
};

export const getAnalyticsTask = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))

  try {
    const response = await axios.get("https://task-management-cuevette-backend.onrender.com/api/v1/task/analyticsTask", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response);
    dispatch(taskSlice.actions.getAllAnalyticsTask(response?.data));



  } catch (error) {
console.log(error)
  }
};

export const updateCheckListStatus = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  dispatch(taskSlice.actions.getAllTasksRequest());
  try {
    const response = await axios.put(`https://task-management-cuevette-backend.onrender.com/api/v1/task/allMyTasks${taskId}/${checkListId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response);

    dispatch(taskSlice.actions.getAllTasksSuccess(response?.data?.tasks));


  } catch (error) {
    dispatch(taskSlice.actions.getAllTasksFailed(error.response?.data?.message));
  }
};

export const updateDueDate = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  console.log(token)
  try {
    const response = await axios.patch("https://task-management-cuevette-backend.onrender.com/api/v1/task/updateDueDate", {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // console.log(response.data);

  } catch (error) {
    console.log(error)
  }
};

export const updateTaskStatus = (taskId,status) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  // console.log(taskId,status)
  try {
    const response = await axios.patch(`https://task-management-cuevette-backend.onrender.com/api/v1/task/updateTask/${taskId}`, {status}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch(getAllMyTasks())
  } catch (error) {
    console.log(error)
  }
};


export const getAllMyTasksForThisMonth = (month,year) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  // console.log(month,year,token)
  dispatch(taskSlice.actions.getAllTasksRequest());
  try {
    const response = await axios.get(`https://task-management-cuevette-backend.onrender.com/api/v1/task/allMyTasksThisMonth/${month}/${year}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response);

    dispatch(taskSlice.actions.getAllTasksSuccess(response?.data?.tasks));


  } catch (error) {
    console.log(error)
    dispatch(taskSlice.actions.getAllTasksFailed(error.response?.data?.message));
  }
};

export const getAllMyTasksToday = (date) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  // console.log(date,token)
  dispatch(taskSlice.actions.getAllTasksRequest());
  try {


    const response = await axios.get(`https://task-management-cuevette-backend.onrender.com/api/v1/task/allMyTasksToday/${date}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response)
      
    dispatch(taskSlice.actions.getAllTasksSuccess(response?.data?.tasks));


  } catch (error) {
    console.log(error)
    dispatch(taskSlice.actions.getAllTasksFailed(error.response?.data?.message));
  }
}

export const deleteMyTasks = (taskId) => async (dispatch) => {
  console.log(taskId)
  const token = JSON.parse(localStorage.getItem("APP-TOKEN"))
  dispatch(taskSlice.actions.deleteTaskRequest());
  try {
    const response = await axios.delete(`https://task-management-cuevette-backend.onrender.com/api/v1/task/deletetask/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(taskSlice.actions.deleteTaskSuccess());
    console.log(response);
   
      toast.success(response.data.message)

      dispatch(taskSlice.actions.setIsDeleteModalOpen(false))
      dispatch(getAllMyTasks())
    
   

  } catch (error) {
    toast.error(error?.response?.data?.message)
   console.log(error)
   dispatch(taskSlice.actions.setIsDeleteModalOpen(true))
   dispatch(taskSlice.actions.deleteTaskFailed());
  }
}

export const { setTaskIdToDelete,setTaskModalOpen,setThreeDotsOpen,setIsDeleteModalOpen,setIsAddPeopleModalOpen,setIsAddPeopleConfirmationModalOpen,setIsAddPeopleSuccessfull,
  setIsBoardOpen, setIsSettingsOpen, setIsAnalyticsOpen,getAllTasksRequest,getAllTasksSuccess,getAllTasksFailed,
  setSingleTaskId,setIsEditModalOpen
} = taskSlice.actions

export default taskSlice.reducer