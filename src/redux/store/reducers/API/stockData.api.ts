import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStockData } from '../../../../models/IStockData';
import { IStockQuote } from '../../../../models/IStockQuote';
import { IQueryDataParams } from './IQueryDataParams';

export const stockDataApi = createApi({
	reducerPath: 'stockDataApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getStockIntraDayData: builder.query<any, IQueryDataParams>({
			query: (params: IQueryDataParams) => ({
				url: `query?function=TIME_SERIES_INTRADAY&symbol=${params.symbol}&outputsize=compact&apikey=${params.apiKey}&interval=${params.interval}min`,
			}),
		}),
		getStockData: builder.query<any, IQueryDataParams>({
			query: (params: IQueryDataParams) => ({
				url: `query?function=${params.function}&symbol=${params.symbol}&outputsize=${params.outputSize}&apikey=${params.apiKey}`,
			}),
		}),
		getStockQuoteData: builder.query<
			IStockQuote,
			Pick<IQueryDataParams, 'symbol' | 'outputSize' | 'apiKey'>
		>({
			query: (params: Pick<IQueryDataParams, 'symbol' | 'outputSize' | 'apiKey'>) => ({
				url: `query?function=GLOBAL_QUOTE&symbol=${params.symbol}&outputsize=${params.outputSize}&apikey=${params.apiKey}`,
			}),
		}),
	}),
});

export const { useGetStockDataQuery, useGetStockIntraDayDataQuery, useGetStockQuoteDataQuery } =
	stockDataApi;
