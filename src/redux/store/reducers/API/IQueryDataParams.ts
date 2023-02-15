export interface IQueryDataParams {
	function?:
		| 'TIME_SERIES_INTRADAY'
		| 'TIME_SERIES_DAILY'
		| 'TIME_SERIES_WEEKLY'
		| 'TIME_SERIES_MONTHLY'
		| 'GLOBAL_QUOTE';
	symbol: string;
	outputSize: 'compact' | 'full';
	apiKey: 'W7QFK4TPN9B30U06' | 'UYWA0OMDMCKUSCJ3';
	interval?: '1min' | '5min' | '15min' | '30min' | '60min';
}
