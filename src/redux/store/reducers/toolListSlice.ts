import { IStockToolsList } from './../../../models/IStockTools';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState: string[] | undefined | null = [];

const toolList = createSlice({
	name: 'ToolList',
	initialState,
	reducers: {
		setToolList(state, action: PayloadAction<IStockToolsList | undefined| null>) {
			if (action.payload?.bestMatches) {
				let arr: string[] = [];
				action.payload.bestMatches.forEach((el) => {
			        arr.push(el["1. symbol"]);
				});
				return arr;
			}

			return [];
	     
		},
	},
});

export default toolList.reducer;

export const {setToolList} = toolList.actions;
