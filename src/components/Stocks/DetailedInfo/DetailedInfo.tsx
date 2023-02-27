import { useParams } from 'react-router-dom';
import {
	detailedStockDataApi,
	IDetailStockDataModel,
} from '../../../redux/store/reducers/API/detailedStockData.api';
import { useState } from 'react';
import { useEffect } from 'react';

export interface IDetailStockData {
	name?: string;
	value?: string;
}

const listhuist: IDetailStockData[] = [
	{ name: '52 Week high', value: undefined },
	{ name: '52 Week low', value: undefined },
	{ name: '50 Day Moving Av.', value: undefined },
	{ name: 'Beta', value: undefined },
	{ name: 'Market cap.', value: undefined },
	{ name: 'CIK', value: undefined },
	{ name: 'Divident Per Shape', value: undefined },
	{ name: 'Analyst Target Price', value: undefined },
	{ name: 'Profit margin', value: undefined },
];
const DetailedInfo = () => {
	const { name } = useParams();
	const { data, isFetching, isError } = detailedStockDataApi.useGetDetailedStockDataQuery(name);
	const [list, setList] = useState<IDetailStockData[] | null>(null);

	useEffect(() => {
		if (data) {
			let copy: IDetailStockData[] = [
				{ name: '52 Week high', value: data['52WeekHigh'] },
				{ name: '52 Week low', value: data['52WeekLow'] },
				{ name: '50 Day Moving Av.', value: data['50DayMovingAverage'] },
				{ name: 'Beta', value: data.beta },
				{ name: 'Market cap.', value: data.MarketCapitalization },
				{ name: 'CIK', value: data.CIK },
				{ name: 'Divident Per Shape', value: data.DividendPerShare },
				{ name: 'Analyst Target Price', value: data.AnalystTargetPrice },
				{ name: 'Profit margin', value: data.ProfitMargin },
			];
			setList(copy);
		}
	}, [data]);

    if(isError)
    {
        return <>Error</>
    }

    if(isFetching)
    {
        return <>Loading...</>
    }

	return (
		<ul className="grid mt-10 grid-cols-3 gap-x-[12rem]">
			{list &&
				list.map((el) => {
					return (
						<li className="flex border-b-2 pb-4 border-b-[#535353] justify-between text-2xl ">
							<span >{el.name}</span> <span className="font-bold">{el.value}</span>
						</li>
					);
				})}
		</ul>
	);
};

export default DetailedInfo;
