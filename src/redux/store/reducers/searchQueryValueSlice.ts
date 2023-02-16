import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: string = '';

const searchQueryValueSlice = createSlice({
	name: 'searchValue',
	initialState,
	reducers: {
		setSearchQueryValue(state: string, action: PayloadAction<string>) {
			return action.payload;
		},
	},
});

export default searchQueryValueSlice.reducer;

export const { setSearchQueryValue } = searchQueryValueSlice.actions;
