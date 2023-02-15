import { VictoryCandlestickStyleInterface } from 'victory';
import { StyleAxis } from '../../components/Stocks/interfaces';

export const styleCandle: VictoryCandlestickStyleInterface = {
	data: { stroke: '#30303056', strokeWidth: 1 },
};

export const styleAxis: StyleAxis = {
	ticks: {
		size: 3,
	},
	tickLabels: {
		fontSize: 18,
		fontFamily: 'Open Sans',
		fontWeight: 700,
	},
	grid: {
		stroke: 'lightgrey',
		strokeDasharray: '0',
	},
};
