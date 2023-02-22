import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  
};

// createSlice is a function u pass it a params
// which is an object and a object has a couple of 
//key values on it that tells us wat the reducer 
//is goin to do
export const userSlice = createSlice({
  //name is wat u want to name the slice
  //and also name spaces actions for us
  //also creates actions and action types 
    name: 'user',
    initialState: INITIAL_STATE,
    // reducers is an object not a switch statement
    // a reducer is a function that recieves a state and an action 
    // and returns an object(old)


    //toolkit: define the name of the reducer function  that represents the action that updates this slice
    // of the user reducer state
    reducers: {
      //instead of writing this setCurrentUser: () => {} is an anonymous function
      // just use the function name space below
      //u can define variables on your object wit this new technique
      // state is the current state of your user reducer slice
      // the action is every action that passes through the store
      // setCurrentUser is the action that we create 
      //and we are going to respond in this reducer wenevee
      // setCurrentUser is being dispatched
      setCurrentUser(state, action) {
       // looks like mutiating state but redux uses the 
       //Imma library to return a new state
      //  writing mutations
          state.currentUser = action.payload;
      }
    }
})

//one of the properties of the object returned from
// createSlice that has all  of the action that you 
// write inside of your reducers
export const {setCurrentUser} = userSlice.actions

export const userReducer = userSlice.reducer

//NOTE: replaces reducers, actions and action types