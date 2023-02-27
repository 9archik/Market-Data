import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IQueryDataParams } from './IQueryDataParams';

export const marketInfoApi = createApi({
	reducerPath: 'marketInfoApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getMarketInfo: builder.query<any, Pick<IQueryDataParams, 'symbol' | 'outputSize' | 'apiKey'>>({
			query: (params: IQueryDataParams) => ({
				url: 'query?function=MARKET_STATUS&apikey=5MQOCK0ICB0EMYYV',
			}),
		}),
	}),
});

export const { useGetMarketInfoQuery } = marketInfoApi;
