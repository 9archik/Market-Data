export interface IQueryDataParams {
	function?:string,
	symbol?: string;
	outputSize?: 'compact' | 'full';
	apiKey?:string,
	interval?: number | string;
}
