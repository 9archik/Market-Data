import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState:string = '';

const inputDebounceValueSlice = createSlice({
    name: 'inputValue',
    initialState,
    reducers: {
        setInputDebounceValue(state:string, action:PayloadAction<string>)
        {
            return action.payload;
        },
    },
    
})

export default inputDebounceValueSlice.reducer;

export const {setInputDebounceValue} = inputDebounceValueSlice.actions;