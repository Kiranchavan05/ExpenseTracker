import { createSlice } from "@reduxjs/toolkit";

const initailExpenseState={
    data: {}
}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initailExpenseState,
    reducers :{
        receivedData(state, action){
            
            state.data=action.payload

        }
    }
})

export const expenseActions=expenseSlice.actions

export default expenseSlice.reducer;