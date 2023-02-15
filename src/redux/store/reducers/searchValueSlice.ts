import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState:string = '';

const searchValueSlice = createSlice({
    name: 'searchValue',
    initialState,
    reducers: {
        setInputValue(state:string, action:PayloadAction<string>)
        {
            return action.payload;
        },
    },
    
})

export default searchValueSlice.reducer;

export const {setInputValue} = searchValueSlice.actions;