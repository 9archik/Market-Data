import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStockData } from '../../../../models/IStockData';
import { IStockToolsQuote } from '../../../../models/IStockToolsQuote';
import { IQueryDataParams } from './IQueryDataParams';

export const stockDataApi = createApi({
	reducerPath: 'stockDataApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getStockIntraDayData: builder.query<IStockData, IQueryDataParams>({
			query: (params: IQueryDataParams) => ({
				url: `query?function=TIME_SERIES_INTRADAY&symbol=${params.symbol}&outputsize=compact&apikey=${params.apiKey}&interval=${params.interval}`,
			}),
		}),
		getStockData: builder.query<IStockData, IQueryDataParams>({
			query: (params: IQueryDataParams) => ({
				url: `query?function=${params.function}&symbol=${params.symbol}&outputsize=${params.outputSize}&apikey=${params.apiKey}`,
			}),
		}),
		getStockQuoteData: builder.query<IStockToolsQuote, IQueryDataParams>({
			query: (params: IQueryDataParams) => ({
				url: `query?function=GLOBAL_QUOTE&symbol=${params.symbol}&outputsize=${params.outputSize}&apikey=${params.apiKey}`,
			}),
		}),
	}),
});

export const { useGetStockDataQuery, useGetStockIntraDayDataQuery, useGetStockQuoteDataQuery } =
	stockDataApi;
