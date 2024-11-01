import { createSlice } from "@reduxjs/toolkit"

import axios from "axios";
import { toast } from "react-toastify";

const userSlice=createSlice({
    name: "user",
    initialState: {
        user: null,
        loading:false,
        isAuthenticated:true,
        assigneeList:[],
        isOpenAssigneeList:false,
        updateLoading:false
        // assigneePersonList:[]
       
        // error:null,
        // isQuizAnalysis:false,
        // quizForAnalytics:[],
        // totalImpressions:null,
        // totalQuestionsCreatedByUser:null,
       

       

    },

    reducers:{
    //   setAssigneePersonList(state,action) {
    //     state.assigneePersonList=action.payload
    // },
    setUser(state,action){
      state.user=action.payload
    },
      setOpenAssigneeList(state,action) {
        state.isOpenAssigneeList=action.payload
    },
        setIsAuthenticated(state,action) {
            state.isAuthenticated=action.payload
        },
        fetchUserRequest(state, action) {
         
       
            state.user = {};
          },
          fetchUserSuccess(state, action) {
          
           state.isAuthenticated=true
            state.user = action.payload;
          },
          fetchUserFailed(state, action) {
         
            state.isAuthenticated=state.isAuthenticated
            state.user = {};
          },
          logoutSuccess(state, action) {
            state.isAuthenticated = false;
            state.user = {};
          },
          logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
          },
          updateUserRequest(state, action) {
         
            state.updateLoading=true
            state.isAuthenticated=state.isAuthenticated
           
          },
          updateUserSuccess(state, action) {
          state.updateLoading=false
           state.isAuthenticated=false
           
          },
          updateUserFailed(state, action) {
            state.updateLoading=false
            state.isAuthenticated=state.isAuthenticated
          
          },
          assigneeListRequest(state, action) {
         
        
            state.assigneeList=[]
           
          },
          assigneeListSuccess(state, action) {
          
           state.assigneeList=action.payload
           
          },
          assigneeListFailed(state, action) {
         
            state.assigneeList=state.assigneeList
          
          },

       
    }
   
})

export const fetchUser = () => async (dispatch) => {
    const token=JSON.parse(localStorage.getItem("APP-TOKEN"))
      dispatch(userSlice.actions.fetchUserRequest());
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user/me",
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
     
        dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
       
      } catch (error) {
        dispatch(userSlice.actions.fetchUserFailed());
       
        console.log(error);
      }
    }
  
   
    export const getAllPossibleAssigneeList = () => async (dispatch) => {
      const token=JSON.parse(localStorage.getItem("APP-TOKEN"))
        dispatch(userSlice.actions.assigneeListFailed());
        try {
          const response = await axios.get("http://localhost:5000/api/v1/user/exceptMe",
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );
       
          console.log(response)
          dispatch(userSlice.actions.assigneeListSuccess(response.data?.allUsersExceptMe));
         
        } catch (error) {
          dispatch(userSlice.actions.assigneeListFailed());
         
          console.log(error);
        }
      }
export const { setUser,setIsAuthenticated,updateUserFailed,updateUserRequest,updateUserSuccess,logoutSuccess,logoutFailed,setOpenAssigneeList,setAssigneePersonList,
} = userSlice.actions

export default userSlice.reducer