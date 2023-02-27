import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStockToolsList } from '../../../../models/IStockTools';

export interface IDetailStockDataModel {
	[key: string]: string | undefined;
	beta?: string;
	CIK?: string;
	MarketCapitalization?: string;
	DividendPerShare?: string;
	AnalystTargetPrice?: string;
	ProfitMargin?: string;
}
export const detailedStockDataApi = createApi({
	reducerPath: 'detailedStockData',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getDetailedStockData: builder.query<IDetailStockDataModel, string | undefined>({
			query: (symbol: string | undefined) => ({
				url: `query?function=OVERVIEW&symbol=${
					symbol !== undefined ? symbol : ''
				}&apikey=ANEJOEPKOOE8UHZS`,
			}),
		}),
	}),
});

export const { useGetDetailedStockDataQuery } = detailedStockDataApi;
