export interface IQueryDataParams {
	function?:string,
	symbol: string | undefined;
	outputSize: 'compact' | 'full';
	apiKey:
		| 'W7QFK4TPN9B30U06'
		| 'UYWA0OMDMCKUSCJ3'
		| '88WOO3GUK7BE4DU3'
		| 'QASSUGBXA2SRIW6Q'
		| 'YG6HDNFAQSGMZA5E';
	interval: number | undefined;
}
