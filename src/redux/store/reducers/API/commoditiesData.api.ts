import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IQueryDataParams } from './IQueryDataParams';

export interface ICommoditiesDataTo {
	x: Date;
	y: number;
}

export interface ICommoditiesDataFrom {
	date: string;
	value: string | number;
}

export interface ICommoditiesDataModelTo {
	data: ICommoditiesDataTo[];
	name: string;
	interval: string;
	unit: string;
	minDomain: number;
	maxDomain: number;
}

export interface ICommoditiesDataModelFrom {
	data: ICommoditiesDataFrom[];
	name: string;
	interval: string;
	unit: string;
}

export const commoditiesApi = createApi({
	reducerPath: 'commoditiesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://www.alphavantage.co/' }),
	endpoints: (builder) => ({
		getCommoditiesData: builder.query<ICommoditiesDataModelTo, IQueryDataParams>({
			query: (query: IQueryDataParams) => ({
				url: `query?function=${query.function}&interval=daily&apikey=2BOI0MO69QC39OUH`,
			}),
			transformResponse: (
				response: ICommoditiesDataModelFrom,
				meta: any,
				args: IQueryDataParams,
			) => {
				let copy: ICommoditiesDataTo[] = [];

				for (let i = 0; i < response.data.length && i<443; i++) {
					let obj: ICommoditiesDataTo = {
						x: new Date(response.data[i].date),
						y: Number(response.data[i].value),
					};

					copy.push(obj);
				}

				copy=copy.filter((el) => {
					console.log(el.y === el.y)
					return el.y===el.y;
				})

				console.log(copy)

				let minMaxArray = [...copy];

				minMaxArray.sort((a, b) => a.y - b.y);

			

				let min = minMaxArray[0].y;

				let max = minMaxArray[minMaxArray.length - 1].y;

				let returnValue: ICommoditiesDataModelTo = {
					data: copy,
					name: response.name,
					interval: response.interval,
					unit: response.unit,
					minDomain: Number(min),
					maxDomain: Number(max),
				};

				console.log('return ', returnValue);
				return returnValue;
			},
		}),
	}),
});

export const { useGetCommoditiesDataQuery } = commoditiesApi;
