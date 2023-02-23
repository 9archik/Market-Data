import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface chartSize {
	width: number;
	height: number;
}
const initialState: chartSize = {
	width: 1440,
	height: 720,
};
const chartSizeSlice = createSlice({
	name: 'chartSize',
	initialState,
	reducers: {
		setChartSize(state: chartSize, action: PayloadAction<chartSize>) {
			state.width = action.payload.width;
			state.height = action.payload.height;
		},
	},
});

export default chartSizeSlice.reducer;
export const { setChartSize } = chartSizeSlice.actions;
