
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IStockMainInfo {
	price?: number | undefined;
	change?: number | undefined;
	changePercent?: number | undefined;
	up?: boolean | undefined;
}

const initialState: IStockMainInfo = {
	price: undefined,
	change: undefined,
	changePercent: undefined,
	up: undefined,
};

const stockMainInfoSlice = createSlice({
	name: 'stockMainInfoSlice',
	initialState,
	reducers: {
		getStockMainInfo(state, action: PayloadAction<IStockMainInfo>) {
			state.price = action.payload.price;
			state.change = action.payload.change;
			state.changePercent = action.payload.changePercent;
			state.up = action.payload.up;
		},
	},
});

export default stockMainInfoSlice.reducer;
export const { getStockMainInfo } = stockMainInfoSlice.actions;
