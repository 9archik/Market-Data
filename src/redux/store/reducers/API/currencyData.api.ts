import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ICurrencyData {
	[key: string]: string;
}

export interface IConvertCurrency {
	from: string;
	to: string;
}

export interface ICurrencyChartParams {
	exchangeRate: number;
	from: string;
	to: string;
	type: 'line' | 'candlestick';
	interval: 'WEEKLY' | 'MONTHLY' | 'DAILY';
}

export interface IChartDataCurrency {
	open?: number;
	close?: number;
	low?: number;
	high?: number;
	y?: number;
	x: Date;
}

export interface ICurrencyChart {
	data: IChartDataCurrency[];
	maxDomain: number;
	minDomain: number;
}

export const currencyDataApi = createApi({
	reducerPath: 'currencyDataApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getConvertData: builder.query<number, IConvertCurrency>({
			query: (convertQuery: IConvertCurrency) => ({
				url: `query?function=CURRENCY_EXCHANGE_RATE&from_currency=${convertQuery.from}&to_currency=${convertQuery.to}&apikey=2BOI0MO69QC39OUH`,
			}),
			transformResponse: (response: any) =>
				response['Realtime Currency Exchange Rate']['5. Exchange Rate'],
		}),
		getCurrencyChartData: builder.query<ICurrencyChart, ICurrencyChartParams>({
			query: (currencyChartQuery: ICurrencyChartParams) => ({
				url: `query?function=FX_${currencyChartQuery.interval}&from_symbol=${currencyChartQuery.from}&to_symbol=${currencyChartQuery.to}&apikey=2BOI0MO69QC39OUH`,
			}),
			transformResponse: (response: any, meta: any, args: ICurrencyChartParams) => {
				let copy: ICurrencyChart = { data: [], maxDomain: 100, minDomain: 0 };

				let intervalStr: string =
					args.interval.charAt(0).toUpperCase() + args.interval.slice(1).toLowerCase();

				const highArr: number[] = [];
				const lowArr: number[] = [];

				for (const key in response[`Time Series FX (${intervalStr})`]) {
					let date = new Date(key);
					let open = response[`Time Series FX (${intervalStr})`][key]['1. open'];
					let high = response[`Time Series FX (${intervalStr})`][key]['2. high'];
					let low = response[`Time Series FX (${intervalStr})`][key]['3. low'];
					let close = response[`Time Series FX (${intervalStr})`][key]['4. close'];

					highArr.push(Number(high));
					lowArr.push(Number(high) );

					if (args.type === 'candlestick') {
						let obj: IChartDataCurrency = {
							open: Number(open),
							high: Number(high),
							low: Number(low),
							close: Number(close) ,
							x: date,
						};
						copy.data.push();
					} else {
						let obj: IChartDataCurrency = {
							y: Number(close) ,
							x: date,
						};
						copy.data.push(obj);
					}
				}

				highArr.sort((a, b) => b - a);
				lowArr.sort((a, b) => a - b);

				copy.maxDomain = highArr[0];
				copy.minDomain = lowArr[0];

				return copy;
			},
		}),
	}),
});

export const { useGetConvertDataQuery, useGetCurrencyChartDataQuery } = currencyDataApi;
