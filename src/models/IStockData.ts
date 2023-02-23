export interface IStockDataIndex {
	[key: string]: {
		[key: string]: {
			[key: string]: '1. open' | '2. high' | '3. low' | '4. close' | '5. volume';
		} 
	};
};

export interface IStockData
{
   [key: string]: IStockDataIndex
} 
