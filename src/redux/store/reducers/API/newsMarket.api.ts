import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface INews {
	title: string;
	url: string;
	banner_image: string;
	summary: string;
	time_published?: string;
}

export interface INewsList {
	feed: INews[];
}

export interface INewsQueryParams {
	tickers: string;
	topics: string;
	sort: string;
}
export const newsMarketApi = createApi({
	reducerPath: 'newsMarketApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getCompanyNews: builder.query<INewsList, string | undefined>({
			query: (symbol: string | undefined) => ({
				url: `query?function=NEWS_SENTIMENT&tickers=${
					symbol !== undefined ? symbol : ''
				}&apikey=88A9A2ZQOCRAWD1K`,
			}),
		}),
		getNews: builder.query<INewsList, INewsQueryParams>({
			query: (symbol: INewsQueryParams) => ({
				url: `query?function=NEWS_SENTIMENT&tickers=${symbol.tickers}&topics=${symbol.topics}&sort=${symbol.sort}&limit=200&apikey=2BOI0MO69QC39OUH`,
			}),
		}),
	}),
});

export const { useGetCompanyNewsQuery, useGetNewsQuery } = newsMarketApi;
