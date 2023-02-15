import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Mouse {
	x: number;
	y: number;
}

const initialState: Mouse = {
	x: 0,
	y: 0,
};

const mouseSlice = createSlice({
	name: 'mouse',
	initialState,
	reducers: {
		calculateXY(state, action: PayloadAction<Mouse>) {
			state.x = action.payload.x;
			state.y = action.payload.y;
		},
	},
});

export default mouseSlice.reducer;
export const { calculateXY } = mouseSlice.actions;
