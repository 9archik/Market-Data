export interface IStockQuote {
	[key: string]: { [key: string]: string };
}

export interface IStockQuoteList {
	bestMatches: IStockQuote[];
}
