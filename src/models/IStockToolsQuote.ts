export interface IStockToolsQuote {
	[key: string]: { [key: string]: string };
}

export interface IStockToolsQuoteList {
	bestMatches: IStockToolsQuote[];
}
