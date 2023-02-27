import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIntervalType } from '../../../components/Stocks/Checkboxs/Checkboxs';
import { IQueryDataParams } from './API/IQueryDataParams';
import stockQueryParams from './stockQueryParamsSlice';

const initialState: IQueryDataParams = {
	function: 'TIME_SERIES_DAILY_ADJUSTED',
	symbol: '',
	outputSize: 'compact',
	apiKey: '88WOO3GUK7BE4DU3',
	interval: undefined,
};
const stockQueryParamsSlice = createSlice({
	name: 'stockQueryParams',
	initialState,
	reducers: {
		setStockQueryParamsInterval(state: IQueryDataParams, action: PayloadAction<IIntervalType[]>) {
			for (let i = 0; i < action.payload.length; i++) {
				if (action.payload[i].checked) {
					state.interval = action.payload[i].interval;

					state.function = `TIME_SERIES_${action.payload[i].typeInterval}`;

					break;
				}
			}
		},

		setStockQueryParamsName(state: IQueryDataParams, action: PayloadAction<string | undefined>) {
			if (action.payload) 
			state.symbol = action.payload;
		},
	},
});

export default stockQueryParamsSlice.reducer;
export const { setStockQueryParamsInterval, setStockQueryParamsName } =
	stockQueryParamsSlice.actions;
