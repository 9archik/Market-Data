// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IStockData } from '../../../../models/IStockData';


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStockToolsQuoteList } from '../../../../models/IStockToolsQuote';

// Define a service using a base URL and expected endpoints
export const stockToolsApi = createApi({
	reducerPath: 'stockToolsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://alpha-vantage.p.rapidapi.com/',
		prepareHeaders(headers) {
			headers.set('X-RapidAPI-Key', '9e711f9074mshb2cf835b80715e4p1402a8jsn1778c996a807');
			headers.set('X-RapidAPI-Host', 'alpha-vantage.p.rapidapi.com');
		},
		method: 'GET',
	}),
	endpoints: (builder) => ({
		getStockTools: builder.query<IStockToolsQuoteList, string>({
			query: (keyword: string) => ({
				url: `query?keywords=${keyword}&function=SYMBOL_SEARCH&datatype=json`,
			}),
		}),
	}),
});



// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetStockToolsQuery } = stockToolsApi;


