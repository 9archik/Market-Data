import { VictoryCandlestickStyleInterface } from 'victory';
import { StyleAxis } from '../../components/Stocks/interfaces';

export const styleCandle: VictoryCandlestickStyleInterface = {
	data: { stroke: "#00000050", strokeWidth: 2 },
};

export const styleAxis: StyleAxis = {
	ticks: {
		size: 3,
	},
	tickLabels: {
		fontSize: 14,
		fontFamily: 'Open Sans',
		fontWeight: 700,
	},
	grid: {
		stroke: '#ffffff70',
		strokeDasharray: '0',
	},
};
