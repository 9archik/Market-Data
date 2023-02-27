import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICandlestickInfo {
	open: number;
	high: number;
	low: number;
	close: number;
	x: Date;
}

export interface ILineInfo {
	y: number;
	x: number;
}

export interface IChartInfo {
	data: ICandlestickInfo[] | ILineInfo[];
	type: 'candlestick' | 'line';
	maxDomain: number;
	minDomain: number;
	interval: string;
}

const initialState: IChartInfo = {
	data: [],
	type: 'candlestick',
	minDomain: 0,
	maxDomain: 100,
	interval: 'Daily',
};



const chartInfoSlice = createSlice({
	name: 'chartInfo',
	initialState,
	reducers: {
		setChartInfo(state: IChartInfo, action: PayloadAction<any>) {
			if (state.type === 'candlestick') {
			
				if (
					action.payload &&
					(action.payload[`Time Series (${state.interval})`] ||
						action.payload[`${state.interval} Time Series`])
				) {
					let arrData =
						state.interval !== 'Weekly' && state.interval !== 'Monthly'
							? action.payload[`Time Series (${state.interval})`]
							: action.payload[`${state.interval} Time Series`];
					let arr: ICandlestickInfo[] = [];

					let highArr: number[] = [];

					let lowArr: number[] = [];

					for (const key in arrData) {
						let value: ICandlestickInfo = {
							open: 0,
							close: 0,
							low: 0,
							high: 0,
							x: new Date(2020, 1),
						};
						value.open = arrData[key]['1. open'];
						value.high = arrData[key]['2. high'];
						value.low = arrData[key]['3. low'];
						value.close = arrData[key]['4. close'];
						let date: Date = new Date(key);
						let year: number = date.getFullYear();
						let day: number = date.getDate();
						let month: number = date.getMonth();
						let hour: number = date.getHours();
						let minutes: number = date.getMinutes();

						value.x = new Date(year, month, day, hour, minutes);

						arr.push(value);

						highArr.push(value.high);
						lowArr.push(value.low);
					}

					highArr.sort((a, b) => a - b);
					lowArr.sort((a, b) => a - b);
					state.data = arr;
					state.maxDomain = highArr[highArr.length - 1];
					state.minDomain = lowArr[0];
                   
					console.log('state', arrData);
				}
			} else {
				if (
					action.payload &&
					(action.payload[`Time Series (${state.interval})`] ||
						action.payload[`${state.interval} Time Series`])
				) {
					let arrData =
						state.interval !== 'Weekly' && state.interval !== 'Monthly'
							? action.payload[`Time Series (${state.interval})`]
							: action.payload[`${state.interval} Time Series`];
					let arr: ILineInfo[] = [];

					let highArr: number[] = [];

					let lowArr: number[] = [];

					for (const key in arrData) {
						let value: ILineInfo = {
							y: 0,
							x: 0,
						};

						value.y = Number(arrData[key]['4. close']);
						let date: Date = new Date(key);

						value.x = date.getTime();

						arr.push(value);

						highArr.push(arrData[key]['2. high']);
						lowArr.push(arrData[key]['4. close']);
					}

					highArr.sort((a, b) => a - b);
					lowArr.sort((a, b) => a - b);
					state.data = arr;
					state.maxDomain = highArr[highArr.length - 1];
					state.minDomain = lowArr[0];
				}
			}
		},
		setType(state: IChartInfo, action: PayloadAction<'candlestick' | 'line'>) {
			state.type = action.payload;
		},
		setIntervalSlice(state: IChartInfo, action: PayloadAction<string>) {
			state.interval = action.payload;
		},
	},
});

export default chartInfoSlice.reducer;
export const { setChartInfo, setType, setIntervalSlice } = chartInfoSlice.actions;
