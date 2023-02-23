export interface IQueryDataParams {
	function?:
		| 'TIME_SERIES_INTRADAY'
		| 'TIME_SERIES_DAILY_ADJUSTED'
		| 'TIME_SERIES_WEEKLY'
		| 'TIME_SERIES_MONTHLY'
		| 'GLOBAL_QUOTE';
	symbol: string | undefined;
	outputSize: 'compact' | 'full';
	apiKey:
		| 'W7QFK4TPN9B30U06'
		| 'UYWA0OMDMCKUSCJ3'
		| '88WOO3GUK7BE4DU3'
		| 'QASSUGBXA2SRIW6Q'
		| 'YG6HDNFAQSGMZA5E';
	interval?: '1min' | '5min' | '15min' | '30min' | '60min';
}
